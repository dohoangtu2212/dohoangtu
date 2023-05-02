import NavItem from "@/components/Layout/Navigation/NavItem";
import { PUBLIC_NAVIGATORS, STUDENT_NAVIGATORS } from "@/constants/navigator";
import { useRouter } from "next/router";
import NavigatorsContainer from "@/components/Layout/Navigation/NavigatorsContainer";
import type { FC } from "react";
import { PUBLIC_ROUTES, ROUTE } from "@/constants/route";
import useMobile from "@/hooks/useMobile";
import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Flex,
  Tooltip,
  Box,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { AiOutlineMenu } from "react-icons/ai";

type NavigatorsProps = {
  authenticated: boolean;
};
const Navigators: FC<NavigatorsProps> = ({ authenticated }) => {
  const router = useRouter();
  const { isMobile } = useMobile();
  const { pathname } = router;
  const showPublicNavigators = PUBLIC_ROUTES.includes(pathname);
  const showStudentView = pathname.includes(ROUTE.studentHome);

  const navigators = useMemo(() => {
    if (showStudentView) return STUDENT_NAVIGATORS;
    if (showPublicNavigators) return PUBLIC_NAVIGATORS;
    return [];
  }, [showStudentView, showPublicNavigators]);

  if (isMobile)
    return (
      <NavigatorsContainer>
        {navigators.map((nav) => (
          <NavItem key={nav.id} onClick={() => router.push(nav.link)}>
            {nav.name}
          </NavItem>
        ))}
      </NavigatorsContainer>
    );

  return (
    <Tooltip
      hasArrow
      borderRadius="md"
      placement="left"
      label={
        <Box>
          <Text>Vào ứng dụng</Text>
        </Box>
      }
    >
      <Popover placement="right-end">
        <PopoverTrigger>
          <IconButton
            aria-label="navigators"
            icon={<AiOutlineMenu size="1.25rem" />}
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content">
          <PopoverArrow />
          <PopoverBody>
            <Flex>
              {navigators.map((nav) => (
                <NavItem key={nav.id} onClick={() => router.push(nav.link)}>
                  {nav.name}
                </NavItem>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Tooltip>
  );
};

export default Navigators;
