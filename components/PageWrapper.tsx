import { Box, Link, Text } from '@chakra-ui/react';
import React from 'react'; 
import Image from 'next/image';
import LightLogo from '../public/whiteLogoBrickandCondo.png';
import DarkLogo from '../public/blackLogoBrickandCondo.png';


const Header = () => { 
  return ( 
    <Box 
      w={{base: '90px'}}
      mb={16}
    >
      <Image src={DarkLogo} priority />
    </Box>
  )
}

const Footer = () => { 
  return ( 
    <Box  
      mt={64}
      bg='secondary.100'
      py={16}
      px={12}
      borderRadius='3xl'
    >
      <Box 
        w={{base: '90px'}}
        mb={14}
      >
        <Image src={LightLogo} priority />
      </Box>
      <Box>
        <Text 
          fontFamily='ProductLight'
          color='secondary.200'
        >
          At BrickandCondo, we are committed to helping you close on your home investment. So feel free to send us an email at <Link color='white' href='jw.org'>Hey@brickandcondo.com.</Link> <br/> <br/> We also love connecting with everyone on our page on <Link href='jw.org' color='white'>Instagram</Link> and you can checkout what we are tweeting on <Link href='jw.org' color='white'>Twitter</Link>!

        </Text>
      </Box>
    </Box>
  )
}
export const PageWrapper = (props:any) => { 
  return ( 
      <Box
        maxWidth={{lg:'1290px', base:'100vw'}}
        // mx='auto'
        py={10} 
        px={12} 
      >
      <Header />
      {props.children}
      <Footer />
    </Box>
  )
  
}