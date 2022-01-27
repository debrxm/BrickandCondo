import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import BedRoomIcon from '../public/bedRoomIcon.svg';
import SqftIcon from '../public/sqtFtIcon.svg';
import BathRoomIcon from '../public/bathRoom.svg';
import Image from 'next/image';
import Link from 'next/link';


export const PropertyPreviewCard = () => { 

  return ( 
    <Link href='/p/93937293'>
      <Flex 
        direction='column' 
        pt={'30rem'}
        bg={`linear-gradient(180.03deg, rgba(0, 0, 0, 0) 50%, #000000 99.97%), url(https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80)`}
        bgPosition='center'
        bgSize='cover'
        pl={{base:10}}
        pr={{lg:28, base: 20}}
        borderRadius={{lg:'3xl', base: '2xl'}}
        position='relative'
        cursor='pointer'
      >
        <Flex 
          direction='column' 
          pb={16}
        >
          <Heading fontFamily='ProductBold' color='white' lineHeight='0.9' textTransform='capitalize' fontSize={{lg: '5xl', base: '4xl'}}>2420 main street hover lorad</Heading>
          <Text fontFamily='ProductLight' color='white'>Banana Island, Off Ikre- Lagos</Text>
        </Flex>

        <Flex 
          direction='row' 
          bg='primary.200' 
          w={{lg: 'fit-content'}} 
          borderRadius='2xl'
          position='absolute'
          py={{base: 3, lg: 6}}
          px={{base: 4, lg: 8}}
          align='center'
          gap={{base: 10, lg: 10}}
          bottom={{base: '-6%', lg: '-7%'}}
        > 
          <Flex 
            direction='column' 
          >
            <Box w='20px' h='20px' >
              <Image src={BedRoomIcon} />
            </Box>
            <Text fontFamily='ProductLight' color='white'>2 Beds</Text>
          </Flex>

          <Flex 
            direction='column'
          >
            <Box w='20px' h='20px' >
              <Image src={BathRoomIcon} />
            </Box>
            <Text fontFamily='ProductLight' color='white'>3 Baths</Text>
          </Flex>

          <Flex 
            direction='column'
          >
            <Box w='20px' h='20px' >
              <Image src={SqftIcon} />
            </Box>
            <Text fontFamily='ProductLight' color='white'>8393 Sqft.</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
    
  ) 
}