import {
    HStack,
    Skeleton,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    useColorModeValue,
  } from "@chakra-ui/react"
  import React from "react"
  
  const TableSkeleton = () => {
    const tableColumnCount = [1, 2, 3, 4, 5,6,7,8,9]; 
  const tableRowCount = [1, 2, 3, 4, 5,6,7,8,9]; 
    const isMobileView = useBreakpointValue({ base: true, md: false, lg: false })
    const tableRowBgColor = useColorModeValue("light.100", "dark.700")
  
    return (
      <TableContainer width="full">
        {!isMobileView && (
          <HStack
            direction={{
              base: "column",
              md: "row",
            }}
            alignItems="end"
            background={tableRowBgColor}
            p={{ base: 4, md: 6 }}
          >
            <Stack flex="1">
              <Skeleton width={"250px"} height="20px" />
              <Skeleton width="100px" height="40px" />
            </Stack>
            
          </HStack>
        )}
        <Table size="sm" data-testid="table-component">
          <Thead data-testid="table-header">
            <Tr>
              {tableColumnCount.map((data) => (
                <Th
                  data-testid="table-head"
                  key={data}
                  textTransform="capitalize"
                  border="none"
                  p={4}
                >
                  <Skeleton height="20px" />
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody data-testid="table-body">
            {tableRowCount.map((data) => {
              return (
                <Tr key={data} backgroundColor={tableRowBgColor}>
                  {tableColumnCount.map((number) => {
                    return (
                      <Td key={number} border="none" p={4}>
                        <Skeleton height="20px" />
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }
  
  export default TableSkeleton
  