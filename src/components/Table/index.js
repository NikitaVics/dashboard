import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Select,
  Stack,
  Table as ChakraTable,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { usePagination, useSortBy, useTable } from "react-table";

const Table = ({ columns, data }) => {
  const tableRef = useRef(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    rows,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const tableRowBgColor = useColorModeValue("light.250", "dark.500");

  const background = useColorModeValue("rgba(237, 250, 241, 1)", "#181818");

  const borderColor = useColorModeValue(
    "rgba(211, 211, 211, 1)",
    "rgba(57, 57, 57, 1)"
  );
  const tableColor = useColorModeValue(
    "rgba(29, 29, 31, 1)",
    "rgba(252, 252, 252, 1)"
  );
  const tableRowColor = useColorModeValue(
    "rgba(67, 67, 69, 1)",
    "rgba(224, 224, 226, 1)"
  );
  return (
    <Stack overflow={"hidden"} fontSize="14px">
      <div
        ref={tableRef}
        id="table-container"
        style={{
          overflow: "auto",
          maxWidth: "100%",
        }}
      >
        <ChakraTable
          {...getTableProps()}
          borderBottom={"1px solid "}
          borderColor={borderColor}
        >
          <Thead background={tableRowBgColor}>
            {headerGroups.map((headerGroup, index) => {
              return (
                <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, colIndex) => (
                    <Th
                      key={colIndex}
                      // {...column.getHeaderProps(column.getSortByToggleProps())}
                      textAlign={column?.textAlign}
                      //   // textAlign={
                      //   //   colIndex >= columns.length - 2
                      //   //     ? "center"
                      //   //     : column?.textAlign
                      //   // }

                      //   textAlign={
                      //     colIndex >= columns.length - 2
                      //       ? "center"
                      //       : column?.textAlign
                      //         ? textAlignArray[colIndex]
                      //         : column?.textAlign || "left"
                      //   }
                      style={{
                        width: column.width,
                        paddingTop: "1.5rem",
                        paddingBottom: "1.5rem",
                        position: "relative",
                        cursor: "pointer",
                        textTransform: "none",
                        color: tableColor,
                        fontWeight: "600",
                        fontSize: "14px",
                        borderBottom: "1px solid ",
                        borderColor: borderColor,
                        transform: colIndex === 0 ? "translateX(20px)" : "none",
                        transition: "transform 0.3s ease",
                        marginRight:
                          colIndex < columns.length - 1 ? "100px" : "0",
                      }}
                    >
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              );
            })}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);

              return (
                <Tr
                  key={i}
                  {...row.getRowProps()}
                  _hover={{ background: background }}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <Td
                      key={cellIndex}
                      {...cell.getCellProps()}
                      textAlign={cell?.column?.textAlign}
                      //   textAlign={
                      //     cellIndex >= columns.length - 2
                      //       ? "center"
                      //       : cell?.column?.textAlign
                      //   }
                      style={{
                        width: cell?.column?.width,
                        paddingBottom: cell?.column?.paddingBottom || "8px",
                        paddingTop: cell?.column?.paddingTop || "8px",
                        color: tableRowColor,
                        fontWeight: "400",
                        border: "none",
                        whiteSpace: "nowrap",
                        transform:
                          cellIndex === 0 ? "translateX(20px)" : "none",
                      }}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
      </div>
      <Flex justifyContent="end" m={3} alignItems="center" gap={2} mx="4">
        <Flex alignItems="center">
          <Text flexShrink="0">Rows per page :</Text>{" "}
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            border="none"
          >
            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <Text flexShrink="0">
            {String(pageIndex * pageSize + 1).padStart(2, "0")} -{" "}
            {String(Math.min((pageIndex + 1) * pageSize, rows.length)).padStart(
              2,
              "0"
            )}{" "}
            of {rows.length}
          </Text>
        </Flex>

        <Flex>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
              aria-label={""}
              variant="ghost"
            />
          </Tooltip>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label={""}
              variant="ghost"
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default Table;
