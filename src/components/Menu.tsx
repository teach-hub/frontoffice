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
      props?: Omit<MenuItemProps, 'children'>;
    }[];
  };
};

const Menu = ({ content: { menuButton, items } }: Props) => {
  return (
    <ChakraMenu>
      <ChakraMenuButton>{menuButton}</ChakraMenuButton>
      <ChakraMenuList>
        {items &&
          items.map((item, i) => (
            <ChakraMenuItem key={i} {...item.props}>
              {item.content}
            </ChakraMenuItem>
          ))}
      </ChakraMenuList>
    </ChakraMenu>
  );
};

export default Menu;
