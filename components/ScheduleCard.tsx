import { Box, Flex, Heading, Text, Link } from '@chakra-ui/react';
import React from 'react'; 
import { LightButton } from './LightButton';


type ScheduleTypes = { 
  clientName: string, 
  scheduledDate: string, 
  clientEmail: string,
}
export const ScheduleCard = ({ 
  clientName, 
  scheduledDate, 
  clientEmail
}: ScheduleTypes) => { 
  return ( 
    <Flex 
      bg='white'
      px='4'
      py='8'
      w={{base: '100%'}}
      borderRadius='3xl'
      boxShadow="0px 0px 22px rgba(0, 0, 0, 0.08)"
    > 
      <Flex gap={{base: 10}} direction='column'>
        <Box>
          <Text 
            fontFamily='ProductLight'
            color='secondary.100'
          >
            Client Name:
          </Text>
          <Heading
            fontFamily='ProductBold'
            fontSize='3xl'
            color='secondary.100'
          > 
            {clientName}
          </Heading>
        </Box>

        <Box>
          <Text 
            fontFamily='ProductLight'
            color='secondary.100'
          >
            Scheduled Date:
          </Text>
          <Heading
            fontFamily='ProductBold'
            fontSize='3xl'
            color='secondary.100'
          > 
            {scheduledDate}
          </Heading>
        </Box>

        <Box>
          <Text 
            fontFamily='ProductLight'
            color='secondary.100'
          >
            Client Email:
          </Text>
          <Heading
            fontFamily='ProductBold'
            fontSize='3xl'
            color='secondary.100'
          > 
            {clientEmail}
          </Heading>
        </Box>  

        <Box> 
          <Link 
            _hover={{
              textDecoration: 'none'
            }}
            href={`mailto:${clientEmail}`}
          >
            <LightButton>Send An Email</LightButton>
          </Link>
        </Box>     
      </Flex>
      
    </Flex>
  )
}