import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import React from 'react'; 
import Image from 'next/image';
import LightLogo from '../public/whiteLogoBrickandCondo.png';
import DarkLogo from '../public/blackLogoBrickandCondo.png';


const Header = () => { 
  return ( 
    <Box pt={8} m='0 auto' w={{base: '95%'}}>
      <Link href='/'>
        <Box 
          w={{base: '90px'}}
          mb={{lg:4}}
        >
          <Image src={DarkLogo} priority />
        </Box>
      </Link>
    </Box>
  )
}

const Footer = () => { 
  return ( 
    <Box  
      mt={{lg:64, base: 32}}
      py={16}
      px={12}
      borderRadius='3xl'
      w={{base: '95%'}}
      mx={{base: 'auto'}}
    >
      <Box 
        w={{base: '90px'}}
        mb={14}
      >
        <Image src={DarkLogo} priority />
      </Box>
      <Box>
        <Flex direction={{base: 'column', lg: 'row'}} gap='10'> 
          <Flex direction='column' gap='4'  w='100%'>
            <Heading 
              fontFamily='ProductBold'
              fontSize='xl'
              color='primary.300'
            >
              Explore BrickandCondo
            </Heading>
            <Flex gap='2' direction='column'>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>Instagram</Link>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>Youtube</Link>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>Facebook</Link>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>Twitter</Link>
            </Flex>
          </Flex>

          <Flex direction='column' gap='4'  w='100%'>
            <Heading 
              fontFamily='ProductBold'
              fontSize='xl'
              color='primary.300'
            >
              Talk to Us
            </Heading>
            <Flex gap='2' direction='column'>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>Email</Link>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>Office Number</Link>
            </Flex>
          </Flex>

          <Flex direction='column' gap='4'  w='100%'>
            <Heading 
              fontFamily='ProductBold'
              fontSize='xl'
              color='primary.300'
            >
              Locations
            </Heading>
            <Flex gap='2' direction='column'>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>Ikeja</Link>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>Ajah</Link>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>Sangotedo</Link>
              <Link w='fit-content' href='https://instagram.com' fontFamily='ProductLight'>VI</Link>
            </Flex>
          </Flex>

          <Flex direction='column' gap='4' w='100%'> 
            <Heading 
              fontFamily='ProductBold'
              fontSize='xl'
              color='primary.300'
            >
              We are for you.
            </Heading>
            <Flex gap='2' direction='column'>
              <Text fontFamily='ProductLight'>
                Brick & Condo gives you the needed
                assistance as your venture into real
                estate inveting.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
export const PageWrapper = (props:any) => { 
  return (
    <Box>
      <Header />
      <Box maxWidth={{lg: '1290px'}} mx='auto' py={{lg:10, base:12}} px={{lg:12, base: 4}}>
        {props.children}
      </Box>
      <Footer />
    </Box>
  )
  
}