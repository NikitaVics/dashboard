import { Menu, MenuItem, MenuList } from "@chakra-ui/react"
import React, { ReactElement } from "react"

type ChakraMenuProps = {
  items: ItemProps[]
}

type ItemProps = {
  name: string
  icon?: ReactElement
  onClick?: () => void
}

const ChakraMenu = (props: React.PropsWithChildren<ChakraMenuProps>) => {
  const { items, children, ...rest } = props
  return (
    <Menu {...rest}>
      {children}
      <MenuList>
        {items &&
          items.map((item, index) => {
            return (
              <MenuItem key={index} icon={item?.icon} onClick={item?.onClick}>
                {item.name}
              </MenuItem>
            )
          })}
      </MenuList>
    </Menu>
  )
}
export default ChakraMenu
