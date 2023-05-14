import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, getUserRole } from "@/utils/firebase";
import { useRouter } from "next/router";
import { PUBLIC_ROUTES, ROUTE } from "@/constants/route";
import { useDispatch } from "react-redux";
import { useCurrentUserSelector } from "@/store/slices/user";
import { userActions } from "@/store/slices/user";

const useAuthInit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
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
      setInitialized(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!!pathname && !currentUser && initialized) {
      const isPublicRoute = !!PUBLIC_ROUTES.find((r) => r === pathname);
      if (!isPublicRoute) router.push(ROUTE.home);
    }
  }, [currentUser, pathname, router, initialized]);

  return null;
};

export default useAuthInit;
