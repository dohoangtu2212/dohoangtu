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
import AccountTable from "./AccountTable";
import AlertConfirm from "./AccountTable/AlertConfirm";
import React, { ChangeEvent, useEffect, useState } from "react";
import { INITAL_BASE_PAGING } from "@/constants/api";
import { IBasePagingRes } from "@/models/common";
import { IGetPagingReq } from "@/models/user";
import { useCurrentUserSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import {
  IBaseUser,
  IBaseAuthReq,
  IDisableUsers,
  IDeleteUsers,
} from "@/types/user";
import Paginator from "@/components/Pagination";
import useCustomToast from "@/hooks/useCustomToast";
import {
  useDeleteUsersMutation,
  useDisableUsersMutation,
  useGetUserMutation,
  useGetUsersMutation,
} from "@/store/apis/user";

export enum ETypeMenu {
  delete = "delete",
  disable = "disable",
  active = "acitve",
}

const ManageAccount = () => {
  const toast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();
  const currentUser = useCurrentUserSelector();
  const [getUsers, { isLoading: isGetUsersLoading }] = useGetUsersMutation();
  const [disableUsers, { isLoading: isDisableUsersLoading }] =
    useDisableUsersMutation();
  const [deleteUsers, { isLoading: isDeleteUsersLoading }] =
    useDeleteUsersMutation();

  const isLoading = isDisableUsersLoading || isDeleteUsersLoading;

  const [pagingRequest, setPagingRequest] = useState<
    IGetPagingReq & IBaseAuthReq
  >({
    pageIndex: 1,
    pageSize: 10,
    currid: "",
    role: UserRole.student,
  });
  const [pagingResponse, setPagingResponse] =
    useState<IBasePagingRes<IBaseUser>>(INITAL_BASE_PAGING);
  const [selected, setSelected] = useState<number[]>([]);
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

  const getPaging = async (req: IGetPagingReq & IBaseAuthReq) => {
    const res = await getUsers(req).unwrap();
    if (res.success && res.data) {
      setPagingResponse(res.data);
    }
  };

  const onSelectedAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(Array.from(Array(pagingResponse.items.length).keys()));
    } else {
      setSelected([]);
    }
  };

  const onSelectedItem = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let list = selected.filter((item) => item != index);
    if (event.target.checked) {
      list.push(index);
      setSelected(list);
    } else {
      setSelected(list);
    }
  };

  const handleAction = () => {
    if (type == ETypeMenu.delete) {
      handleDeleteUsers();
    } else if (type == ETypeMenu.disable) {
      handDisableUsers(true);
    } else if (type == ETypeMenu.active) {
      handDisableUsers(false);
    }
  };

  const handDisableUsers = async (disabled: boolean) => {
    const req: IDisableUsers & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      disabled: disabled,
      users: pagingResponse.items.filter(
        (item, index) =>
          selected.indexOf(index) != -1 && item.disabled != disabled
      ),
    };
    const res = await disableUsers(req).unwrap();
    if (res.success && res.data) {
      toast(res.data.message, "success");
      getPaging(pagingRequest);
    }
  };

  const handleDeleteUsers = async () => {
    const req: IDeleteUsers & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      uids: pagingResponse.items
        .filter((_, index) => selected.indexOf(index) != -1)
        .map((item) => item.uid),
    };
    const res = await deleteUsers(req).unwrap();
    if (res.success && res.data) {
      toast(res.data.message, "success");
      getPaging(pagingRequest);
      setSelected([]);
    }
  };

  return (
    <>
      <AlertConfirm
        title={modalConfirm.title}
        message={modalConfirm.messgage}
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onConfirm={handleAction}
      />
      <Flex flexDir="column" gap="1rem">
        <Flex flexDir="row">
          <Text fontWeight="600" textTransform="uppercase">
            Quản lý tài khoản
          </Text>
        </Flex>

        <Flex alignItems="flex-start" justifyContent="space-between">
          <Flex flexDir="row" gap="1rem" minW={"70%"}>
            <Input
              placeholder="Tên hoặc email"
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
              value={pagingRequest.role}
              onChange={(event) => {
                const req = {
                  ...pagingRequest,
                  role: event.target.value as UserRole,
                };
                setPagingRequest(req);
                getPaging(req);
              }}
            >
              <option value={UserRole.student}>Học viên</option>
              <option value={UserRole.teacher}>Giáo viên</option>
            </Select>
          </Flex>
          <Box>
            <Menu>
              <MenuButton
                isDisabled={selected.length === 0}
                as={Button}
                leftIcon={<MdArrowDropDown size="1.25rem" />}
                isLoading={isLoading}
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
                      title: "Vô hiệu hoá tài khoản",
                      messgage: "Bạn muốn vô hiệu hoá tài khoản đã chọn",
                    });
                    onOpen();
                    setType(ETypeMenu.disable);
                  }}
                >
                  Vô hiệu hoá
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setModalConfirm({
                      title: "Kích hoạt tài khoản",
                      messgage: "Bạn muốn kích hoạt tài khoản đã chọn",
                    });
                    onOpen();
                    setType(ETypeMenu.active);
                  }}
                >
                  Kích hoạt
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <Box pb="1rem">
          <AccountTable
            selected={selected}
            pagingResponse={pagingResponse}
            onSelectedAll={onSelectedAll}
            onSelectedItem={onSelectedItem}
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

export default ManageAccount;
