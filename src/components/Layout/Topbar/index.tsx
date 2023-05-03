import Actions from "@/components/Layout/Topbar/Actions";
import Navigators from "./Navigators";
import TopbarContainer from "@/components/Layout/TopbarContainer";
import type { FC } from "react";

type TopbarProps = {};
const Topbar: FC<TopbarProps> = () => {
  return (
    <TopbarContainer>
      <Navigators />
      <Actions />
    </TopbarContainer>
  );
};

export default Topbar;
