import { extendTheme } from '@chakra-ui/react'; // const solid = defineStyle({

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Lato', sans-serif`,
    body: `'Lato', sans-serif`,
  },
  colors: {
    teachHub: {
      primary: '#004e89',
      primaryLight: '#1a659e',
      secondary: '#d1495b',
      black: '#29262B',
      white: '#F7FFF6',
      green: '#00798c',
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          backgroundColor: 'teachHub.primary',
          color: 'teachHub.white',
          borderRadius: 10,
          fontWeight: 'semibold',
          size: 'lg',
          _hover: { bg: 'teachHub.primaryLight' },
        },
        ghost: {
          color: 'teachHub.black',
        },
      },
    },
  },
});
