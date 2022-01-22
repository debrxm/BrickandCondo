import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { LightButton } from './LightButton'

type ManagePropertyCardType = { 
  propName: string, 
  propTotalVisits: string,
}
export const ManagePropertyCard = ({ 
  propName, 
  propTotalVisits
}: ManagePropertyCardType) => {
  return ( 
    <Box
      bg='secondary.100'
      borderRadius='xl'
      py={8}
      px={8}
      fontFamily='ProductLight'
      color='white'
      w='100%'
    >
      <Flex direction='column' flexWrap='wrap' gap={{lg:10, base: 10}}>
        <Box>
          <Text>Property Name:</Text>
          <Heading 
          fontFamily='ProductBold'
          color='white'
          fontSize='2xl'
          w={{lg:'80%'}}
          >
          {propName}
          </Heading>
        </Box>

        <Box>
          <Text>Property Name:</Text>
          <Heading 
          fontFamily='ProductBold'
          color='white'
          fontSize='2xl'
          w={{lg:'80%'}}
          >
          {propName}
          </Heading>
        </Box>
        
        <Box w='fit-content'>
          <Link href='BrickandCondoUpload'><LightButton>Manage</LightButton></Link>
        </Box>
      </Flex>
    </Box>
  )
}