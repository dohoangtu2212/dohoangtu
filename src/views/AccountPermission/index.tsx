import { Button, Flex, Spinner, Text } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/theme/colors";

import AccountPermissionTable from "./AccountPermissionTable";
import { DEFAULT_PERMISSION } from "@/constants/permission";
import {
  useGetPermissionsQuery,
  useUpdatePermissionsMutation,
} from "@/store/apis/db";
import { MdOutlineRefresh, MdSave } from "react-icons/md";
import useCustomToast from "@/hooks/useCustomToast";
import {
  IGroupPermission,
  IUpdatePermissionsReq,
  UserRole,
} from "@/types/permission";

const AccountPermission = () => {
  const toast = useCustomToast();
  const {
    data: permission = DEFAULT_PERMISSION,
    isLoading: isGetPermissionLoading,
    isFetching: isGetPermissionFetching,
  } = useGetPermissionsQuery();
  //{ skip: !currentUser?.uid || userRole !== UserRole.admin }
  const [updatePermissions, { isLoading: isUpdatePermissionsLoading }] =
    useUpdatePermissionsMutation();
  const isLoading = isGetPermissionLoading || isGetPermissionFetching;
  const [permissionGroup, setPermissionGroup] = useState<IGroupPermission[]>(
    []
  );

  useEffect(() => {
    setPermissionGroup(permission.data);
  }, [permission]);

  const onReset = async () => {
    await handleSubmit(DEFAULT_PERMISSION);
  };

  const onSave = async (data: IGroupPermission[]) => {
    const req: IUpdatePermissionsReq = {
      data: data,
      mapData: mapToPermissionValues(data),
    };
    await handleSubmit(req);
  };

  const handleSubmit = async (req: IUpdatePermissionsReq) => {
    try {
      await updatePermissions(req).unwrap();
      toast("Lưu thành công!", "success");
    } catch (err) {
      toast("Lưu không thành công", "error");
    }
  };

  return (
    <>
      <Flex flexDir="column" gap="1rem">
        <Flex flexDir="row" justifyContent="space-between" flex={1}>
          <Text fontWeight="600" textTransform="uppercase">
            Quản lý phân quyền
          </Text>
          <Flex flexDir="row" gap="0.5rem">
            <Button
              leftIcon={<MdOutlineRefresh size="1.25rem" />}
              onClick={() => onReset()}
              variant="outline"
            >
              Mặc định
            </Button>
            <Button
              width="120px"
              leftIcon={<MdSave size="1.25rem" />}
              onClick={() => onSave(permissionGroup)}
            >
              Lưu
            </Button>
          </Flex>
        </Flex>
        {isLoading ? (
          <Spinner color={COLORS.twilightBlue} />
        ) : (
          <AccountPermissionTable
            setPermissionGroup={setPermissionGroup}
            permissionGroup={permissionGroup}
          />
        )}
      </Flex>
    </>
  );
};

export default AccountPermission;

const mapToPermissionValues = (groups: IGroupPermission[]) => {
  return groups.reduce((acc: { [key: string]: UserRole[] }, group) => {
    group.children.forEach((perm) => {
      if (!acc[perm.code]) {
        acc[perm.code] = [];
      }
      acc[perm.code] = [...acc[perm.code], ...(perm.roles ?? [])];
    });
    return acc;
  }, {});
};
