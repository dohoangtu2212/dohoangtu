import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "@/utils/firebase";
import { useRouter } from "next/router";
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTE } from "@/constants/route";
import { useDispatch } from "react-redux";
import {
  useCurrentUserSelector,
  useStudentCourseIdsSelector,
  useUserPermissionSelector,
} from "@/store/slices/user";
import { userActions } from "@/store/slices/user";
import { converUserToBaseUser } from "@/utils/convertModel";
import {
  useGetStudentCourseIdsMutation,
  useGetUserPermissionMutation,
} from "@/store/apis/db";
import { UserRole } from "@/types/permission";
import { ParsedUrlQuery } from "querystring";

const useAuthInit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const currentUser = useCurrentUserSelector();
  const userPermission = useUserPermissionSelector();
  const studentCourseIds = useStudentCourseIdsSelector();
  const [getUserPermission] = useGetUserPermissionMutation();
  const [getStudentCourseIds] = useGetStudentCourseIdsMutation();
  const { pathname, query } = router;

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await converUserToBaseUser(user);
        const userPermissionData = await getUserPermission({
          role: userData.role,
        });
        const courseIdsData =
          userData.role == UserRole.student
            ? await getStudentCourseIds({
                userId: userData.uid,
              })
            : [];

        dispatch(userActions.setCurrentUser(userData));
        dispatch(userActions.setUserRole(userData.role));
        if ("data" in userPermissionData) {
          dispatch(userActions.setUserPermissions(userPermissionData.data));
        }
        if ("data" in courseIdsData) {
          dispatch(userActions.setStudentCourseIds(courseIdsData.data));
        }
      } else {
        dispatch(userActions.setCurrentUser(null));
        dispatch(userActions.setUserRole(null));
        dispatch(userActions.setUserPermissions(null));
        dispatch(userActions.setStudentCourseIds(null));
      }
      setInitialized(true);
    });
  }, [dispatch, getStudentCourseIds, getUserPermission]);

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
    } else if (pathname && currentUser && initialized) {
      const ALLOW_ROUTES = [
        ...PUBLIC_ROUTES,
        ...PRIVATE_ROUTES,
        ...(userPermission?.routes ?? []),
      ];
      let isPermssionRoute = ALLOW_ROUTES.find((r) => r === pathname);
      if (
        !isPermssionRoute &&
        isValidStudentCourse(pathname, query, studentCourseIds ?? [])
      ) {
        isPermssionRoute = ROUTE.studentCourseView;
      }
      if (!isPermssionRoute) router.push(ROUTE.home);
    }
  }, [
    currentUser,
    pathname,
    router,
    initialized,
    userPermission?.routes,
    studentCourseIds,
    query,
  ]);

  return null;
};

export default useAuthInit;

function isValidStudentCourse(
  pathname: string,
  query: ParsedUrlQuery,
  courseIds: string[]
) {
  if (pathname == ROUTE.studentCourseView) {
    const courseId = query.courseId as string;
    return courseIds.includes(courseId ?? "");
  }
  return false;
}
