import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Checkbox,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import React from "react";
import { IGroupPermission, IPermission, UserRole } from "@/types/permission";

type AccountPermissionTableProps = {
  permissionGroup: IGroupPermission[];
  setPermissionGroup: React.Dispatch<React.SetStateAction<IGroupPermission[]>>;
};

const AccountPermissionTable: FC<AccountPermissionTableProps> = ({
  permissionGroup,
  setPermissionGroup,
}) => {
  const handleChangeValue = (
    checked: boolean,
    code: string,
    groupCode: string,
    role: UserRole
  ) => {
    const newData = permissionGroup.map((group) => {
      if (group.code === groupCode) {
        return {
          ...group,
          children: group.children.map((child) => {
            if (
              child.code === code &&
              !child.roles?.includes(role) &&
              checked
            ) {
              return {
                ...child,
                roles: Array.from(new Set([...(child.roles ?? []), role])),
              };
            } else if (
              child.code === code &&
              child.roles?.includes(role) &&
              !checked
            ) {
              return {
                ...child,
                roles: child.roles?.filter((r) => r !== role),
              };
            }
            return child;
          }),
        };
      }
      return group;
    });
    setPermissionGroup(newData); // Update the state with the new data object
  };

  console.log("permissionGroup: ", permissionGroup);

  return (
    <>
      {/* {isLoading && <Spinner color={COLORS.twilightBlue} />} */}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Quyền</Th>
              <Th>Học viên</Th>
              <Th>Giáo viên</Th>
              <Th>Quản trị viên</Th>
            </Tr>
          </Thead>
          <Tbody>
            {permissionGroup?.map((item: IGroupPermission, index: number) => (
              <React.Fragment key={item.code}>
                <Tr backgroundColor="#F8FAFB">
                  <Td colSpan={4}>{item.name}</Td>
                </Tr>
                {item.children?.map((child: IPermission) => (
                  <Tr key={child.code}>
                    <Td>
                      <Flex flexDir="column" alignItems="start" gap="0.25rem">
                        <Text fontSize="md" color="#334076">
                          {child.name}
                        </Text>
                        <Text fontSize=".875rem" color="gray.500">
                          {child.description}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Checkbox
                        radioGroup={item.code}
                        value={child.code}
                        isChecked={child.roles?.includes(UserRole.student)}
                        isDisabled={child.disabledStudent}
                        onChange={(e) => {
                          handleChangeValue(
                            e.target.checked,
                            child.code,
                            item.code,
                            UserRole.student
                          );
                        }}
                      />
                    </Td>
                    <Td>
                      <Checkbox
                        radioGroup={item.code}
                        value={child.code}
                        isChecked={child.roles?.includes(UserRole.teacher)}
                        isDisabled={child.disabledTeacher}
                        onChange={(e) => {
                          handleChangeValue(
                            e.target.checked,
                            child.code,
                            item.code,
                            UserRole.teacher
                          );
                        }}
                      />
                    </Td>
                    <Td>
                      <Checkbox
                        radioGroup={item.code}
                        value={child.code}
                        isChecked={child.roles?.includes(UserRole.admin)}
                        onChange={(e) => {
                          handleChangeValue(
                            e.target.checked,
                            child.code,
                            item.code,
                            UserRole.admin
                          );
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AccountPermissionTable;
