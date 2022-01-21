import { Tag } from '@chakra-ui/react';
import React from 'react'; 

export const LoggedInBanner = ({email}:{email:object}) => { 
  return ( 
    <Tag
      w={{lg:'fit-content'}}
      bg='secondary.100'
      color='white'
      fontFamily='ProductBold'
      py={{lg:4}}
      px={{lg:4}}
      my={{lg: 8}}
    >
      Logged in as: {email?.email}
    </Tag>
  )
}
