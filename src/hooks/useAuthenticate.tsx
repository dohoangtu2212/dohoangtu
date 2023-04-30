import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "@/utils/firebase";
import { useRouter } from "next/router";
import { PUBLIC_ROUTES, ROUTE } from "@/constants/route";

const useAuthenticate = () => {
  const router = useRouter();
  const { pathname } = router;
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!!pathname && !authenticated) {
      const isPublicRoute = !!PUBLIC_ROUTES.find((r) => r === pathname);
      if (!isPublicRoute) router.push(ROUTE.auth);
    }
  }, [authenticated, pathname, router]);

  return { authenticated };
};

export default useAuthenticate;
