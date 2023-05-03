import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "@/utils/firebase";
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userActions.setCurrentUser(user));
      } else {
        dispatch(userActions.setCurrentUser(null));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!!pathname && !currentUser) {
      const isPublicRoute = !!PUBLIC_ROUTES.find((r) => r === pathname);
      if (!isPublicRoute) router.push(ROUTE.auth);
    }
  }, [currentUser, pathname, router]);

  return null;
};

export default useAuthenticate;
