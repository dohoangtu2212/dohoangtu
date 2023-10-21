import { extendTheme } from "@chakra-ui/react";
import DrawerStyles from "@/constants/theme/components/DrawerStyles";
import { COLORS } from "@/constants/theme/colors";
import { quicksand } from "@/fonts";
import InputStyles from "./components/InputStyles";
import ButtonStyles from "./components/ButtonStyles";
import TabsStyles from "./components/TabsStyles";
import TextareaStyles from "./components/TextareaStyles";
import CardStyles from "./components/CardStyles";
import DividerStyles from "./components/DividerStyles";
import TableStyles from "./components/TableStyles";
import ModalStyles from "./components/ModalStyles";
import MenuStyles from "./components/MenuStyles";
import PopoverStyles from "./components/PopoverStyles";

export const breakpoints = {
  sm: "360px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

export const theme = extendTheme({
  // breakpoints,
  styles: {
    global: {
      "html, body": {
        bgColor: COLORS.white,
        color: COLORS.starryNightBlue,
        ...quicksand.style,
      },
    },
  },
  components: {
    Button: ButtonStyles,
    Tabs: TabsStyles,
    Card: CardStyles,
    Input: InputStyles,
    Textarea: TextareaStyles,
    Divider: DividerStyles,
    Table: TableStyles,
    Modal: ModalStyles,
    Menu: MenuStyles,
    Popover: PopoverStyles,
    Drawer: DrawerStyles,
  },
});
