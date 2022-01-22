import { Flex, Grid, Heading, Box } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'; 
import { LightButton } from '../components/LightButton';
import { LoggedInBanner } from '../components/LoggedInBanner';
import { ManagePropertyCard } from '../components/ManagePropertyCard';

const BrickandCondoDash = ({user}: {user: object}) => { 
  const DeleteThisFakeData = [ 
    {
      propName: 'Main Street House 24 1717 Fraser Cir', 
      propTotalVisits: '6'
    },
    {
      propName: '1717 Fraser Cir', 
      propTotalVisits: '0'
    },
    {
      propName: 'Crumbs Road 13', 
      propTotalVisits: '1'
    }
  ]
  return ( 
    <Flex direction='column'>
      <LoggedInBanner email={user}/>
      <Flex direction='column'>
        <Flex align='center' mt={{lg: 10, base: 10}} direction={{base: 'column', lg:'row'}}>
          <Heading 
            fontFamily='ProductBold'
            color='secondary.100'
            fontSize={{lg:'5xl', base: '4xl'}}
            w={{lg:'80%', base: '100%'}}
          >
            Welcome, Admin
          </Heading>
          <Box w={{base: '100%', lg:'20%'}}>
            <Link href='BrickandCondoUpload'><LightButton>Upload New Property</LightButton></Link>
          </Box>
        </Flex>
        <Flex direction='column' mt={{lg: 20, base: 20}}> 
          <Heading 
            fontFamily='ProductBold'
            color='secondary.100'
            fontSize='2xl'
            w={{lg:'80%'}}
          >
            Propeties to manage:
          </Heading>
          <Flex gap={{lg:4, base: 4}} mt={{base:4}} direction={{lg:'row', base: 'column'}}> 
            {
              DeleteThisFakeData.map((item, index) => { 
                return ( 
                  <ManagePropertyCard 
                    key={index}
                    propName={item.propName}
                    propTotalVisits={item.propTotalVisits}
                  />
                )
              })
            }
          </Flex>
        </Flex>
      </Flex>
     
    </Flex>
  )
}

export default BrickandCondoDash;