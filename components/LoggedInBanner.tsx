import { Tag } from '@chakra-ui/react';
import React from 'react'; 

export const LoggedInBanner = ({email}: any) => {

  let emailArr; 
  let fullEmail; 
  if(email) { 
    emailArr = [...Object.values(email)];
    fullEmail = emailArr.filter((item: any | string) => {return item.toString().slice(-4) === '.com'})
  }
  
  return (
    <Tag
      w={{lg:'fit-content', base:'fit-content'}}
      bg='secondary.100'
      color='white'
      fontFamily='ProductBold'
      py={{lg:4, base: 6}}
      px={{lg:4, base: 4}}
      my={{lg: 8}}
      fontSize={{base: '13px'}}
    >
      Logged in as: {fullEmail}
    </Tag>
  )
}
