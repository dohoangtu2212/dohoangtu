import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, getUserRole } from "@/utils/firebase";
import { useRouter } from "next/router";
import { PUBLIC_ROUTES, ROUTE } from "@/constants/route";
import { useDispatch } from "react-redux";
import { useCurrentUserSelector } from "@/store/slices/user";
import { userActions } from "@/store/slices/user";

const useAuthenticate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useCurrentUserSelector();
  const { pathname } = router;

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(userActions.setCurrentUser(user));
        const role = await getUserRole();
        dispatch(userActions.setUserRole(role));
      } else {
        dispatch(userActions.setCurrentUser(null));
        dispatch(userActions.setUserRole(null));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!!pathname && !currentUser) {
      const isPublicRoute = !!PUBLIC_ROUTES.find((r) => r === pathname);
      if (!isPublicRoute) router.push(ROUTE.home);
    }
  }, [currentUser, pathname, router]);

  return null;
};

export default useAuthenticate;
