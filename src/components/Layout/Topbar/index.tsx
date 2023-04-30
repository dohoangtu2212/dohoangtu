import Actions from "@/components/Layout/Topbar/Actions";
import Navigators from "./Navigators";
import TopbarContainer from "@/components/Layout/TopbarContainer";
import type { FC } from "react";

type TopbarProps = {
  authenticated: boolean;
};
const Topbar: FC<TopbarProps> = ({ authenticated }) => {
  return (
    <TopbarContainer>
      <Navigators authenticated={authenticated} />
      <Actions authenticated={authenticated} />
    </TopbarContainer>
  );
};

export default Topbar;
