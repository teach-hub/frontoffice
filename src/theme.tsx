import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Lato', sans-serif`,
    body: `'Lato', sans-serif`,
    defaultSize: 'xl',
  },
  colors: {
    teachHub: {
      primary: '#004e89',
      primaryLight: '#1a659e',
      secondary: '#ebe9e7',
      black: '#29262b',
      white: '#F5F5F5',
      gray: '#BDBDBD',
      green: '#00798c',
      red: '#D1103A',
      yellow: '#F2CD5D',
      success: 'teachHub.green',
      error: 'teachHub.red',
      warning: 'teachHub.yellow',
    },
  },
  styles: {
    global: {
      body: {
        color: 'default',
        bg: 'teachHub.secondary',
        fontSize: '20px',
      },
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
          overflow: 'hidden',
        },
        ghost: {
          color: 'teachHub.black',
          _hover: { bg: 'teachHub.white' },
        },
      },
    },
  },
});
