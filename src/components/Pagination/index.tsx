import {
  PaginationPrevious,
  Pagination,
  PaginationPageGroup,
  PaginationPage,
  PaginationNext,
  PaginationContainer,
} from "@ajna/pagination";
import { FC } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

type PaginatorProps = {
  pagesCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pages: number[];
};

const Paginator: FC<PaginatorProps> = ({
  pagesCount,
  currentPage,
  onPageChange,
  pages,
}) => {
  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={Number(currentPage)}
      onPageChange={onPageChange}
    >
      <PaginationContainer>
        <PaginationPrevious
          w={"40px"}
          h={"40px"}
          paddingInline={"0px"}
          color={"#334076"}
          bg="white"
          borderRadius={"50%"}
          border={"1px solid #cbd5e0"}
          _hover={{
            bg: "#e2e8f0",
          }}
          marginRight={"4px"}
        >
          <MdOutlineArrowBackIos />
        </PaginationPrevious>
        <PaginationPageGroup>
          {pages.map((page: number) => (
            <PaginationPage
              key={`pagination_page_${page}`}
              page={page}
              w={"40px"}
              h={"40px"}
              color={"#334076"}
              bg="white"
              borderRadius={"50%"}
              border={"1px solid #cbd5e0"}
              onClick={() => console.warn("Im clicking the page")}
              fontSize="sm"
              _hover={{
                bg: "#e2e8f0",
              }}
              _current={{
                bg: "#e2e8f0",
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext
          marginLeft={"4px"}
          w={"40px"}
          h={"40px"}
          paddingInline={"0px"}
          color={"#334076"}
          bg="white"
          borderRadius={"50%"}
          border={"1px solid #cbd5e0"}
          _hover={{
            bg: "#e2e8f0",
          }}
        >
          <MdOutlineArrowForwardIos />
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
};

export default Paginator;
