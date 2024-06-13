import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "@/utils/firebase";
import { useRouter } from "next/router";
import { PUBLIC_ROUTES, ROUTE } from "@/constants/route";
import { useDispatch } from "react-redux";
import { useCurrentUserSelector } from "@/store/slices/user";
import { userActions } from "@/store/slices/user";
import { converUserToBaseUser } from "@/utils/convertModel";

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
        const userData = await converUserToBaseUser(user);

        dispatch(userActions.setCurrentUser(userData));
        dispatch(userActions.setUserRole(userData.role));
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
    } else if (
      pathname != ROUTE.accountActivation &&
      currentUser?.emailVerified == false &&
      initialized
    ) {
      router.push(ROUTE.accountActivation);
    }
  }, [currentUser, pathname, router, initialized]);

  return null;
};

export default useAuthInit;
