import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { IBasePagingRes } from "@/models/common";
import React from "react";
import ApproveTag from "../ApproveTag";
import { MdAdd, MdVisibility } from "react-icons/md";
import { EApproveStatus, IRegisterTeacherRes } from "@/types/registerTeacher";

type TeacherTableProps = {
  selected: number[];
  pagingResponse: IBasePagingRes<IRegisterTeacherRes>;
  onSelectedAll: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectedItem: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  onViewDetail: (item: IRegisterTeacherRes, index: number) => void;
  onApprove: (item: IRegisterTeacherRes, index: number) => void;
};

const TeacherTable: FC<TeacherTableProps> = ({
  selected,
  pagingResponse,
  onSelectedAll,
  onSelectedItem,
  onViewDetail,
  onApprove,
}) => {
  return (
    <>
      {/* {isLoading && <Spinner color={COLORS.twilightBlue} />} */}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isChecked={
                    selected.length === pagingResponse.items.length &&
                    selected.length != 0
                  }
                  onChange={(event) => {
                    onSelectedAll(event);
                  }}
                />
              </Th>
              <Th>Họ và Tên</Th>
              <Th>Kinh nghiệm</Th>
              <Th>Vị trí</Th>
              <Th>Học vị</Th>
              <Th>Trạng thái</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {pagingResponse.items?.map(
              (item: IRegisterTeacherRes, index: number) => (
                <Tr key={item.id}>
                  <Td>
                    <Checkbox
                      isChecked={selected.indexOf(index) != -1}
                      onChange={(event) => {
                        onSelectedItem(event, index);
                      }}
                    />
                  </Td>

                  <Td>{item.fullName}</Td>
                  <Td>{item.yearsOfExperience} năm</Td>
                  <Td>{item.position}</Td>
                  <Td>{item.culturalLeveling}</Td>
                  <Td>
                    <ApproveTag status={item.status} />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="mdVisibility"
                      icon={<MdVisibility size="18px" />}
                      border={0}
                      bg={"white"}
                      color={"blue.500"}
                      onClick={() => {
                        onViewDetail(item, index);
                      }}
                    />
                    <IconButton
                      aria-label="mdAdd"
                      icon={<MdAdd size="18px" />}
                      border={0}
                      bg={"white"}
                      color={"blue.500"}
                      isDisabled={item.status === EApproveStatus.Register}
                      onClick={() => {
                        onApprove(item, index);
                      }}
                    />
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TeacherTable;
