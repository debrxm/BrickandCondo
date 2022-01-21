import { Flex } from '@chakra-ui/react';
import React from 'react'; 
import { LoggedInBanner } from '../components/LoggedInBanner';

const BrickandCondoDash = ({user}: {user: object}) => { 
  return ( 
    <Flex>
      <LoggedInBanner email={user}/>
    </Flex>
  )
}

export default BrickandCondoDash;