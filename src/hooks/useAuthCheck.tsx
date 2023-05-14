import { useEffect } from "react";
import { useRouter } from "next/router";
import { PUBLIC_ROUTES, ROUTE } from "@/constants/route";
import { useCurrentUserSelector } from "@/store/slices/user";

const useAuthCheck = () => {
  const router = useRouter();
  const currentUser = useCurrentUserSelector();
  const { pathname } = router;

  useEffect(() => {
    if (!!pathname && !currentUser) {
      const isPublicRoute = !!PUBLIC_ROUTES.find((r) => r === pathname);
      if (!isPublicRoute) router.push(ROUTE.home);
    }
  }, [currentUser, pathname, router]);

  return null;
};

export default useAuthCheck;
