import {
  Flex,
  Text,
  Button,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Input,
  Select,
} from "@chakra-ui/react";

import { MdArrowDropDown } from "react-icons/md";
import React, { ChangeEvent, useEffect, useState } from "react";
import { INITAL_BASE_PAGING } from "@/constants/api";
import { IBasePagingRes } from "@/models/common";
import { IGetPagingReq } from "@/models/user";
import { useCurrentUserSelector } from "@/store/slices/user";
import { IBaseAuthReq } from "@/types/user";
import Paginator from "@/components/Pagination";
import AlertConfirm from "../Account/AccountTable/AlertConfirm";
import TeacherTable from "./TeacherTable";
import {
  EApproveStatus,
  EPositionType,
  IApproveRegisterTeachers,
  IDeleteRegisterTeachers,
  IGetRegisterTeacherPagingReq,
  IRegisterTeacherRes,
} from "@/types/registerTeacher";
import useCustomToast from "@/hooks/useCustomToast";
import { CustomErrorCodes } from "@/constants/auth";
import ModalApprove from "./ModalApprove";
import {
  useApproveTeacherRegistersMutation,
  useDeleteTeacherRegistersMutation,
  useGetTeacherRegistersMutation,
  useSeenTeacherRegistersMutation,
} from "@/store/apis/register-teacher";

export enum ETypeMenu {
  delete = "delete",
  seens = "seens",
  approve = "approve",
}

const ManageTeacher = () => {
  const toast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isApproveModalOpen,
    onClose: closeApproveModal,
    onOpen: openApproveModal,
  } = useDisclosure();
  const [getTeacherRegisters, { isLoading: isGetTeacherRegistersLoading }] =
    useGetTeacherRegistersMutation();
  const [
    deleteTeacherRegisters,
    { isLoading: isDeleteTeacherRegistersLoading },
  ] = useDeleteTeacherRegistersMutation();
  const [seenTeacherRegisters, { isLoading: isSeenTeacherRegistersLoading }] =
    useSeenTeacherRegistersMutation();
  const [
    approveTeacherRegisters,
    { isLoading: isApproveTeacherRegistersLoading },
  ] = useApproveTeacherRegistersMutation();
  const cancelRef = React.useRef<any>();
  const currentUser = useCurrentUserSelector();

  const isLoading =
    isApproveTeacherRegistersLoading ||
    isSeenTeacherRegistersLoading ||
    isDeleteTeacherRegistersLoading;

  const [pagingRequest, setPagingRequest] = useState<
    IGetRegisterTeacherPagingReq & IBaseAuthReq
  >({
    pageIndex: 1,
    pageSize: 10,
    currid: "",
    type: EPositionType.Teacher,
  });
  const [pagingResponse, setPagingResponse] =
    useState<IBasePagingRes<IRegisterTeacherRes>>(INITAL_BASE_PAGING);
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [selectItem, setSelectItem] = useState<IRegisterTeacherRes>();
  const [modalConfirm, setModalConfirm] = useState<{
    title: string;
    messgage: string;
  }>({ messgage: "", title: "" });

  const [type, setType] = useState<ETypeMenu>(ETypeMenu.delete);

  useEffect(() => {
    if (currentUser?.uid) {
      const req = { ...pagingRequest, currid: currentUser?.uid ?? "" };
      setPagingRequest(req);
      getPaging(req);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const deletes = async () => {
    const uids = pagingResponse.items
      .filter((_, index) => selectedRow.indexOf(index) != -1)
      .map((item) => item.id);
    const req: IDeleteRegisterTeachers & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      uids: uids,
    };
    const res = await deleteTeacherRegisters(req).unwrap();
    if (res.success && res.data) {
      toast(res.data.message, "success");
      getPaging(pagingRequest);
      setSelectedRow([]);
    }
  };

  const seens = async (uids: string[]) => {
    const req: IDeleteRegisterTeachers & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      uids: uids,
    };
    const res = await seenTeacherRegisters(req).unwrap();
    if (res.success && res.data) {
      toast(res.data.message, "success");
      getPaging(pagingRequest);
    }
  };

  const approve = async (
    selectItem?: IRegisterTeacherRes,
    callback?: () => void
  ) => {
    const req: IApproveRegisterTeachers & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      id: selectItem?.id ?? "",
    };
    const res = await approveTeacherRegisters(req).unwrap();

    if (res.success && res.data) {
      toast(res.data.message, "success");
      getPaging(pagingRequest);
      setSelectItem(undefined);
    } else {
      let message = "Xét duyệt đăng ký không thành công";
      const { code } = res.error;
      if (code === CustomErrorCodes.EMAIL_ALREADY_EXISTS) {
        message = "Email này đã được sử dụng bởi một tài khoản khác.";
      }
      toast(message, "error");
    }
    if (callback) {
      callback();
    }
  };

  const getPaging = async (req: IGetPagingReq & IBaseAuthReq) => {
    const res = await getTeacherRegisters(req).unwrap();
    if (res.success && res.data) {
      setPagingResponse(res.data);
    }
  };

  const onSelectedAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRow(Array.from(Array(pagingResponse.items.length).keys()));
    } else {
      setSelectedRow([]);
    }
  };

  const onSelectedItem = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let list = selectedRow.filter((item) => item != index);
    if (event.target.checked) {
      list.push(index);
      setSelectedRow(list);
    } else {
      setSelectedRow(list);
    }
  };

  const handleAction = () => {
    if (type == ETypeMenu.delete) {
      deletes();
    }
    if (type == ETypeMenu.seens) {
      const uids = pagingResponse.items
        .filter(
          (item, index) =>
            selectedRow.indexOf(index) != -1 &&
            item.status != EApproveStatus.Register
        )
        .map((item) => item.id);
      seens(uids);
    }
    if (type == ETypeMenu.approve) {
      approve(selectItem);
    }
  };

  return (
    <>
      {isApproveModalOpen && (
        <ModalApprove
          data={selectItem}
          isOpen={isApproveModalOpen}
          onClose={closeApproveModal}
          onSubmit={(item) => {
            approve(item, () => {
              closeApproveModal();
            });
          }}
        />
      )}
      {isOpen && (
        <AlertConfirm
          title={modalConfirm.title}
          message={modalConfirm.messgage}
          isOpen={isOpen}
          cancelRef={cancelRef}
          onClose={onClose}
          onConfirm={handleAction}
        />
      )}

      <Flex flexDir="column" gap="1rem">
        <Flex flexDir="row">
          <Text fontWeight="600" textTransform="uppercase">
            Quản lý giáo viên
          </Text>
        </Flex>

        <Flex alignItems="flex-start" justifyContent="space-between">
          <Flex flexDir="row" gap="1rem" minW={"70%"}>
            <Input
              placeholder="Tên hoặc email, học vị"
              minW={"60%"}
              onChange={(event) => {
                const req = {
                  ...pagingRequest,
                  keyword:
                    event.target.value == "" ? undefined : event.target.value,
                };
                setPagingRequest(req);
                getPaging(req);
              }}
            />
            <Select
              minW={"40%"}
              value={pagingRequest.type}
              onChange={(event) => {
                const req = {
                  ...pagingRequest,
                  type: event.target.value as EPositionType,
                };
                setPagingRequest(req);
                getPaging(req);
              }}
            >
              <option value={EPositionType.Teacher}>Giáo viên Chính</option>
              <option value={EPositionType.Tutors}>Trợ Giảng</option>
              <option value={EPositionType.Other}>Khác</option>
            </Select>
          </Flex>
          <Box>
            <Menu>
              <MenuButton
                isLoading={isLoading}
                isDisabled={selectedRow.length === 0}
                as={Button}
                leftIcon={<MdArrowDropDown size="1.25rem" />}
              >
                Thao tác
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setModalConfirm({
                      title: "Xoá tài khoản",
                      messgage: "Bạn muốn xoá tài khoản đã chọn",
                    });
                    onOpen();
                    setType(ETypeMenu.delete);
                  }}
                >
                  Xoá
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setModalConfirm({
                      title: "Cập nhật trạng thái đã xem",
                      messgage:
                        "Bạn muốn Cập nhật trạng thái đã xem trong danh sách đã chọn",
                    });
                    onOpen();
                    setType(ETypeMenu.seens);
                  }}
                >
                  Đã xem
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>

        <Box pb="1rem">
          <TeacherTable
            selected={selectedRow}
            pagingResponse={pagingResponse}
            onSelectedAll={onSelectedAll}
            onSelectedItem={onSelectedItem}
            onViewDetail={(item, index) => {
              openApproveModal();
              setSelectItem(item);
              if (item?.status === EApproveStatus.UnSeen) {
                seens([item?.id ?? ""]);
              }
            }}
            onApprove={(item, index) => {
              setModalConfirm({
                title: "Xét duyệt",
                messgage: "Bạn muốn duyệt đăng ký cho tài khoản này không",
              });
              onOpen();
              setSelectItem(item);
              setType(ETypeMenu.approve);
            }}
          />
          <Box pt="1rem">
            {pagingResponse.total > 0 && (
              <Paginator
                currentPage={pagingResponse.page}
                onPageChange={(page) => {
                  if (page <= pagingResponse.totalPage) {
                    const req = {
                      ...pagingRequest,
                      pageIndex: page,
                    };
                    setPagingRequest(req);
                    getPaging(req);
                  }
                }}
                pages={Array.from(
                  {
                    length: pagingResponse.totalPage,
                  },
                  (_, i) => i + 1
                )}
                pagesCount={pagingResponse.totalPage}
              />
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ManageTeacher;
