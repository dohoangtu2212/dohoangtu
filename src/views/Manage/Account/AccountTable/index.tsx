import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Checkbox,
} from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { IBasePagingRes } from "@/models/common";
import { IBaseUser } from "@/types/user";
import React from "react";
import { UserRole } from "@/types/permission";
import DisableTag from "../DisableTag";

type AccountTableProps = {
  selected: number[];
  pagingResponse: IBasePagingRes<IBaseUser>;
  onSelectedAll: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectedItem: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
};

const renderRole = (role: UserRole) => {
  if (role == UserRole.student) {
    return "Học viên";
  } else if (role == UserRole.teacher) {
    return "Giáo viên";
  }
  return "";
};

const AccountTable: FC<AccountTableProps> = ({
  selected,
  pagingResponse,
  onSelectedAll,
  onSelectedItem,
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
              <Th>Email</Th>
              <Th>Loại tài khoản</Th>
              <Th>Trạng thái</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {pagingResponse.items?.map((item: IBaseUser, index: number) => (
              <Tr key={item.uid}>
                <Td>
                  <Checkbox
                    isChecked={selected.indexOf(index) != -1}
                    onChange={(event) => {
                      onSelectedItem(event, index);
                    }}
                  />
                </Td>
                <Td>{item.fullName}</Td>
                <Td
                  maxW="15rem"
                  textOverflow="clip"
                  overflow="hidden"
                  whiteSpace="initial"
                >
                  {item.email}
                </Td>
                <Td>{renderRole(item.role)}</Td>
                <Td>
                  <DisableTag status={item.disabled || false} />
                </Td>
                <Td>{item.disabled}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AccountTable;
