import { Box, FormControl, FormHelperText, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import React from 'react'; 
import { DarkFullWidthCard } from '../components/DarkFullWidthCard';
import { LightButton } from '../components/LightButton';

const BrickandcondoLogin = ({}) => { 

  return ( 
    <DarkFullWidthCard>
      <Heading mb={20} color='white' fontSize='2xl' fontFamily='ProductBold'>Login- For BrickandCondo Admins.</Heading>
      <Box w='60%'>
        <form style={{fontFamily: 'ProductLight'}}>
          <FormControl mb={6}>
            <FormLabel htmlFor='email' color='white' fontSize={{base: '18px'}}>Email address</FormLabel>
            <Input 
              w={{base: '40%'}} 
              id='email' 
              type='email' 
              bg='white'
            />
          </FormControl>
          <FormControl mb={6}>
          <FormLabel htmlFor='email' color='white' fontSize={{base: '18px'}}>Password</FormLabel>
          <Input 
            w={{base: '40%'}} 
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