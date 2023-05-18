import type { IconType } from "react-icons";

export interface INavigator {
  id: string;
  name: string;
  link: string;
  Icon?: IconType;
}
