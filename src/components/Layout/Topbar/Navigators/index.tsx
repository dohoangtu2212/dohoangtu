import NavItem from "@/components/Layout/Navigation/NavItem";
import { PUBLIC_NAVIGATORS, STUDENT_NAVIGATORS } from "@/constants/navigator";
import { useRouter } from "next/router";
import NavigatorsContainer from "@/components/Layout/Navigation/NavigatorsContainer";
import type { FC } from "react";
import { PUBLIC_ROUTES, ROUTE } from "@/constants/route";

type NavigatorsProps = {
  authenticated: boolean;
};
const Navigators: FC<NavigatorsProps> = ({ authenticated }) => {
  const router = useRouter();
  const { pathname } = router;
  const showPublicNavigators = PUBLIC_ROUTES.includes(pathname);
  const showStudentView = pathname.includes(ROUTE.studentHome);

  if (showPublicNavigators)
    return (
      <NavigatorsContainer>
        {PUBLIC_NAVIGATORS.map((nav) => (
          <NavItem key={nav.id} onClick={() => router.push(nav.link)}>
            {nav.name}
          </NavItem>
        ))}
      </NavigatorsContainer>
    );

  if (showStudentView) {
    return (
      <NavigatorsContainer>
        {STUDENT_NAVIGATORS.map((nav) => (
          <NavItem key={nav.id} onClick={() => router.push(nav.link)}>
            {nav.name}
          </NavItem>
        ))}
      </NavigatorsContainer>
    );
  }

  return null;
};

export default Navigators;
