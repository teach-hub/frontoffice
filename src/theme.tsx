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
      secondary: '#ebe9e7',
      black: '#29262b',
      white: '#f7fff6',
      green: '#00798c',
    },
  },
  styles: {
    global: () => ({
      body: {
        color: 'default',
        bg: 'teachHub.secondary',
      },
    }),
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
          overflow: 'hidden',
        },
        ghost: {
          color: 'teachHub.black',
        },
      },
    },
  },
});
