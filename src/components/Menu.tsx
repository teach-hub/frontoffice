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
    items: MenuItemProps['children'][];
  };
};

const Menu = ({ content: { menuButton, items } }: Props) => {
  return (
    <ChakraMenu>
      <ChakraMenuButton>{menuButton}</ChakraMenuButton>
      <ChakraMenuList>
        {items && items.map(item => <ChakraMenuItem>{item}</ChakraMenuItem>)}
      </ChakraMenuList>
    </ChakraMenu>
  );
};

export default Menu;
