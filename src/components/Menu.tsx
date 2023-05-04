import {
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuItem as ChakraMenuItem,
  MenuItemProps,
  MenuButtonProps,
} from '@chakra-ui/react';

type Props = {
  content: {
    menuButton: MenuButtonProps['children'];
    items: {
      content: MenuItemProps['children'];
      action?: MenuItemProps['onClick'];
    }[];
  };
};

const Menu = ({ content: { menuButton, items } }: Props): JSX.Element => {
  return (
    <ChakraMenu>
      <ChakraMenuButton>{menuButton}</ChakraMenuButton>
      <ChakraMenuList>
        {items &&
          items.map((item, i) => (
            <ChakraMenuItem key={i} onClick={item.action}>
              {item.content}
            </ChakraMenuItem>
          ))}
      </ChakraMenuList>
    </ChakraMenu>
  );
};

export default Menu;
