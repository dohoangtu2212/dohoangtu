import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { IBreadcrumbLink } from "@/components/UI/PageBreadcrumb/types";
import { useRouter } from "next/navigation";

type PageBreadcrumbProps = {
  links: IBreadcrumbLink[];
};
const PageBreadcrumb: FC<PageBreadcrumbProps> = ({ links = [] }) => {
  const router = useRouter();
  return (
    <Box p={{ base: "0.25rem", md: "1.25rem 0" }}>
      <Breadcrumb
        fontSize="0.875rem"
        lineHeight="1.25rem"
        letterSpacing="0.02625rem"
        w="100%"
        overflow="hidden"
      >
        {links.map((l) => {
          const { name, path, isCurrentPage } = l;
          return (
            <BreadcrumbItem key={name}>
              <BreadcrumbLink
                onClick={() => router.push(path)}
                fontWeight={isCurrentPage ? "700" : "300"}
                isCurrentPage={isCurrentPage}
              >
                <Text
                  w="max-content"
                  maxW={{ base: "12rem", md: "none" }}
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                >
                  {name}
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Box>
  );
};

export default PageBreadcrumb;
