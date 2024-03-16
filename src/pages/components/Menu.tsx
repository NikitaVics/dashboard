import { Menu, MenuItem, MenuList, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement } from "react";

type ChakraMenuProps = {
  items: ItemProps[];
};

type ItemProps = {
  name: string;
  icon?: ReactElement;
  onClick?: () => void;
};

const ChakraMenu = (props: React.PropsWithChildren<ChakraMenuProps>) => {
  const { items, children, ...rest } = props;
  const color = useColorModeValue("rgba(254, 254, 254, 1)","rgba(13, 13, 13, 1)")
  const bgColor = useColorModeValue("rgba(237, 250, 241, 1)","rgba(24, 24, 24, 1)")
  return (
    <Menu {...rest} placement="bottom">
      {children}
      <MenuList bgColor = {color} >
        {items &&
          items.map((item, index) => {
            return (
              <MenuItem key={index} icon={item?.icon} onClick={item?.onClick} bgColor = {color} _hover={{bgColor : bgColor}}   >
                {item.name}
              </MenuItem>
            );
          })}
      </MenuList>
    </Menu>
  );
};
export default ChakraMenu;
