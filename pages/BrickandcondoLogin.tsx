import { Box, FormControl, FormHelperText, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import React from 'react'; 
import { DarkFullWidthCard } from '../components/DarkFullWidthCard';
import { LightButton } from '../components/LightButton';

const BrickandcondoLogin = ({}) => { 

  return ( 
    <DarkFullWidthCard>
      <Heading mb={{lg:20, base: 4}} color='white' fontSize={{lg:'2xl', base: '1xl'}} fontFamily='ProductBold'>Login- For BrickandCondo Admins.</Heading>
      <Box w={{lg: '60%', md: '100%', base: '100%'}}>
        <form style={{fontFamily: 'ProductLight'}}>
          <FormControl mb={6}>
            <FormLabel htmlFor='email' color='white' fontSize={{base: '18px'}}>Email address</FormLabel>
            <Input 
              w={{lg: '40%', md: '90%', base: '100%'}} 
              id='email' 
              type='email' 
              bg='white'
            />
          </FormControl>
          <FormControl mb={6}>
          <FormLabel htmlFor='email' color='white' fontSize={{base: '18px'}}>Password</FormLabel>
          <Input 
            w={{lg: '40%', md: '90%', base: '100%'}} 
            id='email' 
            type='password' 
            bg='white'
          />
        </FormControl>
        <LightButton>
          Login
        </LightButton>
        </form>
        
      </Box>
    </DarkFullWidthCard>
  )
}

export default BrickandcondoLogin;