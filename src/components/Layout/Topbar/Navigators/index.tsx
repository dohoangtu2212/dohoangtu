import NavItem from "@/components/Layout/Navigation/NavItem";
import { NAVIGATORS, PUBLIC_NAVIGATORS } from "@/constants/navigator";
import { useRouter } from "next/router";
import NavigatorsContainer from "@/components/Layout/Navigation/NavigatorsContainer";
import type { FC } from "react";
import { ROUTE, PUBLIC_ROUTES } from "@/constants/route";

type NavigatorsProps = {
  authenticated: boolean;
};
const Navigators: FC<NavigatorsProps> = ({ authenticated }) => {
  const router = useRouter();
  const { pathname } = router;
  const showPublicNavigators =
    !authenticated || PUBLIC_ROUTES.includes(pathname);

  return (
    <NavigatorsContainer>
      {(showPublicNavigators ? PUBLIC_NAVIGATORS : NAVIGATORS).map((nav) => (
        <NavItem key={nav.id} onClick={() => router.push(nav.link)}>
          {nav.name}
        </NavItem>
      ))}
    </NavigatorsContainer>
  );
};

export default Navigators;
