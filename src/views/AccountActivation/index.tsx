import { AuthMode } from "@/constants/auth";
import { ROUTE } from "@/constants/route";
import { COLORS } from "@/constants/theme/colors";
import {
  useCheckActivationMutation,
  useUpdateUserInfoMutation,
} from "@/store/apis/user";
import { useCurrentUserSelector, userActions } from "@/store/slices/user";
import {
  ActionEditUser,
  IBaseAuthReq,
  IBaseUser,
  ICheckActivationReq,
  IEditUser,
} from "@/types/user";
import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ButtonTimer from "./ButtonTimer";
import useCustomToast from "@/hooks/useCustomToast";

enum AccountActivationType {
  sendMail,
  errorCode,
  successCode,
}

const AccountActivation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useCustomToast();
  const { code } = router.query as ParsedUrlQuery & { code: string };
  const currentUser = useCurrentUserSelector();
  const [isCodeSuccess, setIsCodeSuccess] = useState<boolean>(false);
  const [checkActivation, { isLoading: isCheckActivationLoading }] =
    useCheckActivationMutation();
  const [updateUserInfo, { isLoading: isUpdateUserInfoLoading }] =
    useUpdateUserInfoMutation();

  const isLoading = isCheckActivationLoading;
  const isLoadingMail = isUpdateUserInfoLoading;

  useEffect(() => {
    if (currentUser?.uid && currentUser.emailVerified == false) {
      checkActivationAsync(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, currentUser]);

  const checkActivationAsync = async (otp: string) => {
    const req: ICheckActivationReq & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      otp: otp,
    };

    const res = await checkActivation(req).unwrap();
    if (res.success && res.data == true) {
      setIsCodeSuccess(true);
      updateInfoAsync();
    }
  };

  const updateInfoAsync = async () => {
    const req: IEditUser & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      uid: currentUser?.uid ?? "",
      otp: null,
      otpCreatedAt: null,
      emailVerified: true,
    };
    const res = await updateUserInfo(req).unwrap();
    if (res.success) {
      dispatch(userActions.setCurrentUser(res.data));
    }
  };

  const reSendMail = async () => {
    const req: IEditUser & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      uid: currentUser?.uid ?? "",
      action: ActionEditUser.reSendMail,
    };
    await updateUserInfo(req).unwrap();
    toast("Gửi mail thành công", "success");
  };

  return (
    <Flex flexDir="column" gap="1rem">
      <Flex flexDir="row">
        <Text fontWeight="600" textTransform="uppercase">
          Kích hoạt tài khoản
        </Text>
      </Flex>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        alignItems={"center"}
        pt="24px"
      >
        <Flex w="500px" mt={{ base: "0", md: "100px" }} justifyContent="center">
          <Image
            src="/images/account-activation.png"
            alt=""
            w={{ base: "200px", md: "400px" }}
          />
        </Flex>
        <Flex w="full" pt="24px" flexDir="column" justifyContent="center">
          <Flex align={"center"} justify={"center"}>
            {isLoading ? (
              <Spinner color={COLORS.twilightBlue} />
            ) : (
              <Stack
                spacing={4}
                w={"full"}
                bg={"white"}
                rounded={"xl"}
                pr={6}
                pl={12}
              >
                <Content
                  isLoading={isLoadingMail}
                  currentUser={currentUser}
                  code={code}
                  isCodeSuccess={isCodeSuccess}
                  router={router}
                  reSendMail={reSendMail}
                />
              </Stack>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountActivation;

type ContentProps = {
  currentUser: IBaseUser | null;
  code: string;
  isCodeSuccess: boolean;
  router: NextRouter;
  reSendMail: () => Promise<void>;
  isLoading: boolean;
};
const Content: FC<ContentProps> = ({
  currentUser,
  code,
  isCodeSuccess,
  router,
  reSendMail,
  isLoading,
}) => {
  if ((code && isCodeSuccess) || currentUser?.emailVerified == true) {
    return (
      <Flex flexDir="column" gap={"24px"} pr={{ base: "0", md: "100px" }}>
        <b>Tài khoản đã kích hoạt</b>
        <p>Bạn đã kích hoạt tài khoản thành công.</p>
        <Button
          onClick={() => {
            router.push({
              pathname: ROUTE.home,
            });
          }}
        >
          Trang chủ
        </Button>
      </Flex>
    );
  } else if (currentUser?.emailVerified == false && !code) {
    return (
      <Flex flexDir="column" gap={"24px"} pr={{ sm: "0", md: "100px" }}>
        <b>Kích hoạt tài khoản</b>
        <p>
          Bạn chưa kích hoạt tài khoản. Vui lòng kiểm tra email của bạn để xác
          nhận.
          <br /> Nếu không tìm thấy email hãy gửi lại.
        </p>
        <ButtonTimer
          isLoading={isLoading}
          text="Gửi Email"
          onClick={() => reSendMail()}
        />
      </Flex>
    );
  } else if (currentUser?.emailVerified == false && code && !isCodeSuccess) {
    return (
      <Flex flexDir="column" gap={"24px"} pr={{ sm: "0", md: "100px" }}>
        <b>Mã kích hoạt không hợp lệ</b>
        <p>Mã kích hoạt không đúng. Vui lòng kiểm tra email và thử lại</p>
        <ButtonTimer
          isLoading={isLoading}
          text="Gửi lại mail"
          onClick={() => reSendMail()}
        />
      </Flex>
    );
  }
  return <Box />;
};
