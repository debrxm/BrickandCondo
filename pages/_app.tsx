import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { PageWrapper } from '../components/PageWrapper'
import { customTheme } from '../styling/theme'
import '../styling/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
    <ChakraProvider theme={customTheme}>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </ChakraProvider>
  )
}

export default MyApp
