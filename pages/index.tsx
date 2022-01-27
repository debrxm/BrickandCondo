import { Box, Divider, Fade, Flex, Heading, Grid, Text, useDisclosure } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Image from 'next/image'
import searchIcon from '../public/searchIcon.svg'
import React from 'react';
import { PropertyPreviewCard } from '../components/PropertyPreviewCard';


const Location = [ 
  'Lekki', 
  'Magodo', 
  'Ikorodu', 
  'Bakew', 
  'Small London'
];

const FakeData = [ 
  { 
    prtyImag: 'https://images.unsplash.com/photo-1586860475241-ebd59e5bb07f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80', 
    prtyName: '12 House Hipper', 
    prtySublocation: 'Banana Island, Off Ikre- Lagos',
    mainLocation: 'Magodo',
    metaData: { 
      bath: 2, 
      room: 4, 
      sqft: 1234
    },
    id: '3892948322432'
  },
  { 
    prtyImag: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80', 
    prtyName: '12, Grover Street Ifako', 
    prtySublocation: 'Banana Island, Off Ikre- Lagos',
    mainLocation: 'Lekki',
    metaData: { 
      bath: 5, 
      room: 1, 
      sqft: 9032
    },
    id: '09483029943'
  },
  { 
    prtyImag: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80', 
    prtyName: '12, Grover Street Ifako', 
    prtySublocation: 'Banana Island, Off Ikre- Lagos',
    mainLocation: 'Lekki',
    metaData: { 
      bath: 5, 
      room: 1, 
      sqft: 9032
    },
    id: '09483029943'
  }, 
  { 
    prtyImag: 'https://images.unsplash.com/photo-1586860475241-ebd59e5bb07f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80', 
    prtyName: '12 House Hipper', 
    prtySublocation: 'Banana Island, Off Ikre- Lagos',
    mainLocation: 'Magodo',
    metaData: { 
      bath: 2, 
      room: 4, 
      sqft: 1234
    },
    id: '3892948322432'
  },
]




const Home: NextPage = () => {
  //Hooks 
  const {isOpen, onToggle} = useDisclosure();
  //Small Components
  const LocationItem = ({item}:{item: string}) => { 
    return ( 
      <Text 
        onClick={onToggle}
        _hover={{bg: 'secondary.100', color: 'white'}} 
        fontFamily='ProductLight' 
        borderRadius='xl' color='secondary.100' 
        bg='white' 
        p={{base: 4}}
        transition='all 0.3s'
        cursor='pointer'
      >
        {item}
      </Text>
    )
  }

  const SearchComp = () => { 
    return ( 
      <Flex 
        onClick={onToggle}
        cursor='pointer'
        borderRadius={{base: 'full', lg: 'full', md: 'xl'}} 
        gap={{base: 4, lg: 20}} 
        bg='white' 
        align='center' 
        w='fit-content' 
        py={{lg: 4, base: 4}} 
        px={{lg: 8, base: 4}}
        boxShadow='0px 9px 11px 9px rgba(0, 0, 0, 0.04);'
      > 
        <Text fontFamily='ProductLight' color='#C5C5C5'>Filter By Location</Text>
        <Box w={{base: '45px'}} h={{base: '45px'}}>
          <Image src={searchIcon} />
        </Box>
      </Flex>
    )
  }


  const ListLocationComp = () => { 
    return ( 
      <Flex 
        direction='column' 
        bg='primary.200' 
        borderRadius='xl' 
        px={{base: 4}} 
        py={{base: 8}}
        transition='all 4s'
      > 
        <Flex direction='column' gap='4'>
          { 
            Location.map((item, index) => {
              return <LocationItem item={item} key={index} />
            })
          }
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex direction='column' > 
      <Flex 
        mb={{base: 20}} 
        direction={{base: 'column'}} 
        position={{base: 'relative', lg: 'relative'}}
      > 
        <Flex 
          direction={{base: 'column'}}
          py={{lg:52, base: 40}}
          px={{lg: 80, base: 10}}
          borderRadius='2xl'
          bg={`linear-gradient(0deg, rgba(3, 28, 32, 0.71), rgba(3, 28, 32, 0.71)), url(https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80)`}
          bgPos='center'
          bgSize='cover'
          fontFamily='ProductLight'
        > 
          <Heading mb={{base: 6}} fontSize={{base: '4xl', lg: '6xl'}} fontFamily='ProductBold' color='white'>
            Purchase your next Property-
          </Heading>
          <Text fontFamily='ProductBold' color='white' fontSize={{base: 'sm',lg:'md'}}>
            Brick & Condo gives you the needed <br/> assistance as your venture into real <br/> estate inveting. 
          </Text>
        </Flex>

        <Flex 
          direction='column'  
          w={{base: 'fit-content'}}
          position={{lg: 'absolute', base: 'absolute'}}
          bottom={{base: '-10%', lg: '-7%'}}
          left={{base: '7%', lg: '36%'}}
          gap={{base: 4, lg: 4}}
        >
          <SearchComp />
        </Flex>
        <Fade in={isOpen}>
        <Flex 
          direction='column'  
          w={{lg: '25%', base:'70%'}}
          position={{lg: 'absolute', base: 'absolute'}}
          bottom={{base: '-93%', lg: '7%'}}
          left={{base: '7%', lg: '36%'}}
          gap={{base: 4, lg: 4}}
          transition='display 4s'
          zIndex='5'
        >
          <ListLocationComp />
        </Flex>
        </Fade>
      </Flex>

      <Grid 
        mb={{lg: 40, base: 32}} 
        rowGap={{base:'28'}}
        columnGap={{base: '25'}}
        direction={{base: 'column', lg: 'row'}}
        gridTemplateColumns={{base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)'}}
      >
        { 
          FakeData.map((item, index) => { 
            return ( 
              <PropertyPreviewCard key={index}/>
            )
          })
        }
      </Grid>
      <Flex direction='row' justify='center' align='center' gap={2}> 
        <Divider  orientation='horizontal' w={{lg:'40%', base: '30%', md: '40%'}} borderColor='primary.200'/>
        <Text cursor='pointer' fontFamily='ProductLight'>Load More</Text>
        <Divider orientation='horizontal' w={{lg:'40%', base: '30%', md: '40%'}} borderColor='primary.200'/>
      </Flex>
    </Flex>
  )
}

export default Home
