import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import SidebarContent, { LinkItemProps } from "./SidebarContent";
import AccoutInfoEdit from "./AccoutInfoEdit";
import { IBaseAuthReq, IBaseUser, IEditUser } from "@/types/user";
import { useCurrentUserSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import { AccountInfoFormValues, ChangePasswordFormValues } from "@/types/auth";
import { COLORS } from "@/constants/theme/colors";
import { MdLock, MdLogout, MdPerson } from "react-icons/md";
import AccountResetPassword from "./ChangePassword";
import { getAuth } from "firebase/auth";
import useCustomToast from "@/hooks/useCustomToast";
import AlertConfirm from "../Manage/Account/AccountTable/AlertConfirm";
import {
  useGetUserMutation,
  useUpdateUserInfoMutation,
} from "@/store/apis/user";

export enum ETypeMenu {
  delete = "delete",
  disable = "disable",
  active = "acitve",
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Thông tin cá nhân", code: "account-info", icon: MdPerson },
  { name: "Đổi mật khẩu", code: "change-password", icon: MdLock },
  { name: "Đăng xuất", code: "logout", icon: MdLogout },
];

const AccountInfo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();
  const auth = getAuth();
  const toast = useCustomToast();
  const [getUser, { isLoading: isGetUserLoading }] = useGetUserMutation();
  const [updateUserInfo, { isLoading: isUpdateUserInfoLoading }] =
    useUpdateUserInfoMutation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>("account-info");
  const [user, setUser] = useState<IBaseUser>({
    displayName: "",
    email: "",
    photoURL: "",
    role: UserRole.student,
    uid: "",
  });
  const [modalConfirm, _] = useState<{
    title: string;
    messgage: string;
  }>({ title: "Thông báo", messgage: "Bạn có muốn đăng xuất không?" });
  const currentUser = useCurrentUserSelector();

  const getUserAsync = async () => {
    const req: IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
    };
    console.log("req: ", req);

    const res = await getUser(req).unwrap();
    if (res.success && res.data) {
      setUser(res.data);
      setIsLoading(false);
    }
  };

  const updateInfoAsync = async (
    values: AccountInfoFormValues,
    birthday?: Date
  ) => {
    const req: IEditUser & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      uid: currentUser?.uid ?? "",
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      schoolName: values.schoolName,
      className: values.className,
      address: values.address,
      culturalLeveling: values.culturalLeveling,
      yearsOfExperience: values.yearsOfExperience,
      birthday: birthday,
    };
    const res = await updateUserInfo(req).unwrap();
    if (res.success) {
      toast("Lưu thành công.", "success");
      getUserAsync();
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      getUserAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <>
      <AlertConfirm
        title={modalConfirm.title}
        message={modalConfirm.messgage}
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onConfirm={handleLogout}
      />
      <Flex flexDir="column" gap="1rem">
        <Flex flexDir="row">
          <Text fontWeight="600" textTransform="uppercase">
            Quản lý thông tin
          </Text>
        </Flex>
        {isLoading ? (
          <Spinner color={COLORS.twilightBlue} />
        ) : (
          <Flex flexDir="row" pt="24px">
            <SidebarContent
              user={user}
              value={value}
              linkItems={LinkItems}
              onChangeValue={(value) => {
                if (value != "logout") {
                  setValue(value);
                } else {
                  onOpen();
                }
              }}
              onClose={() => {}}
            />
            <Box w="full">
              {value == "account-info" && (
                <AccoutInfoEdit user={user} onSubmit={updateInfoAsync} />
              )}
              {value == "change-password" && (
                <AccountResetPassword user={user} />
              )}
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default AccountInfo;
