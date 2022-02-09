import { Box } from '@chakra-ui/react';
import React from 'react'; 

export const DarkFullWidthCard = (props:any) => { 
  return ( 
    <Box
      bg='secondary.100'
      borderRadius='xl'
      py={20}
      px={16}
      maxW={{lg: '1290px'}} mx={{lg: 'auto'}}
    >
      {props.children}
    </Box>
  )
}