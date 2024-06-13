import { COLORS } from "@/constants/theme/colors";
import useCustomToast from "@/hooks/useCustomToast";
import { useUpdateAvatarMutation } from "@/store/apis/db";
import { useUpdateUserInfoMutation } from "@/store/apis/user";
import { useCurrentUserSelector, userActions } from "@/store/slices/user";
import { IBaseAuthReq, IEditUser } from "@/types/user";
import { Avatar, Box, Center, Flex, Stack } from "@chakra-ui/react";
import { useRef, type FC } from "react";
import { MdCreate } from "react-icons/md";
import { useDispatch } from "react-redux";

type AvatarUserProps = {};
const AvatarUser: FC<AvatarUserProps> = ({}) => {
  const toast = useCustomToast();
  const dispatch = useDispatch();
  const currentUser = useCurrentUserSelector();
  const fileInputRef = useRef<any>();
  const [updateUserInfo, { isLoading: isUpdateUserInfoLoading }] =
    useUpdateUserInfoMutation();
  const [updateAvatar, { isLoading: isUpdateAvatarLoading }] =
    useUpdateAvatarMutation();

  const updateAvatarAsync = async (file?: File) => {
    const req: { avatar?: File } & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      avatar: file,
    };
    const res = await updateAvatar(req).unwrap();
    console.log("res: ", res);
    if (res) {
      await updateUserInfoAsync(res);
      toast("Lưu thành công.", "success");
    } else {
      toast("Lưu không thành công.", "success");
    }
  };

  const updateUserInfoAsync = async (photoURL?: string) => {
    const req: IEditUser & IBaseAuthReq = {
      currid: currentUser?.uid ?? "",
      uid: currentUser?.uid ?? "",
      photoURL: photoURL,
    };
    const res = await updateUserInfo(req).unwrap();
    if (res.success) {
      dispatch(userActions.setCurrentUser(res.data));
    }
  };

  return (
    <Stack direction={["column", "row"]} spacing={6}>
      <Center>
        <Avatar size="xl" src={currentUser?.photoURL ?? ""} position="relative">
          <Box position="absolute" bottom="5px" right="10px">
            <Flex
              backgroundColor={COLORS.twilightBlue}
              onClick={() => fileInputRef.current.click()}
              width="20px"
              height="20px"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
            >
              <MdCreate size="12px" />
            </Flex>
            <input
              onChange={(event) => {
                const file = event.target.files?.[0];
                updateAvatarAsync(file);
              }}
              multiple={false}
              ref={fileInputRef}
              type="file"
              hidden
            />
          </Box>
        </Avatar>
      </Center>
    </Stack>
  );
};

export default AvatarUser;
