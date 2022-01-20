import {extendTheme} from '@chakra-ui/react' 

export const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'primary.100',
      },
    },
  },
  colors: {
    primary: {
      100: '#F1FDFF',
      200: '#06A7C2',
      300: '#2F5057',
    },
    secondary: { 
      100: '#02282F',
      200: '#7E9195',
      300: '#E84848',
    }
  },
})