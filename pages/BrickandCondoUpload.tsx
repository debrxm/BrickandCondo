import { Box, Divider, Flex, FormControl, Grid, Heading, Text } from '@chakra-ui/react';
import React from 'react'; 
import { CustomInput, CustomTextArea } from '../components/CustomInput';
import { DangerButton } from '../components/DangerButton';
import { AddMulitplePhotos, MainUploadComp } from '../components/UploadComponents';
import {LightButton} from '../components/LightButton'

const BrickandCondoUpload = () => { 
  //Fake Data, this should be implemented by getting the actual files.
  const OtherImages = ['ImageOne', 'ImageTwo', 'Image3']
  return ( 
   <Box>
     <Heading 
      fontFamily='ProductBold'
      fontSize={{lg: '30px'}}
      color='primary.300'
      >
        Upload a new property
      </Heading>
    <Box my='8' > 
      <Grid gap='8' gridTemplateColumns={{lg:'7fr 3fr'}}>
        <Box>
          <MainUploadComp 
            text='Upload Main Image' 
          />
        </Box>
        <Flex gap='8' direction='column'>
          <MainUploadComp 
            text='Upload Sub Image' 
          />
          <MainUploadComp 
            text='Upload Sub Image' 
          />
        </Flex>
      </Grid>
    </Box>
    <AddMulitplePhotos 
      text='Add other images' 
    />
    <Flex
      align='center'
      gap={{lg:4,}} 
    >
      <Flex 
        gap={{lg:4, base: 10}} 
        my='4'
      >
        { 
          OtherImages.map((item, index) => { 
            return ( 
              <Text fontFamily='ProductBold' color='primary.300'>{item}</Text>
            )
          })
        }
      </Flex>
    </Flex>
    <Box>
      <DangerButton>Clear</DangerButton>
    </Box>

    <Flex direction='column' my='10'>
      <Heading fontSize={{lg:'25px'}} fontFamily='ProductBold' color='secondary.100'>Property Meta Data</Heading>
      
      <Flex mt='10' w='fit-content' gap={{lg: 4}} direction={{lg:'row', base: 'column'}}>
        <CustomInput 
          type='number' 
          id='BathNum'
          label='How many Baths?'
        />
        <CustomInput 
          type='number'
          id='RoomNum'
          label='How many Rooms?'
        />
        <CustomInput 
          type='number'
          id='BathText'
          label='Total Square foot'
        />
      </Flex>
    </Flex>
    <Divider mt={{lg:'8'}} colorScheme='secondary'/>
    <Flex direction='column' my='10'>
      <Heading fontSize={{lg:'25px'}} mb={{base: '4'}} fontFamily='ProductBold' color='secondary.100'>Property Main Data</Heading>
      
      <Flex gap={{lg:4, base: 10}} direction={{lg:'row', base: 'column'}}>
        <Box w={{lg:'80%', base: '100%'}} my={{lg: 4}}>
          <Flex direction='column' gap={{lg:4, base: 6}}>
            <CustomInput 
              type='text'
              id='propertyName'
              label='Property Name'
            />
            <CustomInput 
              type='text'
              id='propertySubLocation'
              label='Property SubLocation'
            />
            <CustomInput 
              type='text'
              id='propertyLocation'
              label='Property Location'
            />
            <CustomTextArea
              type='text' 
              id='DescriptionData'
              label={`Property's Description`}
            />
          </Flex>
        </Box>
        <Box w={{lg:'20%', base: '100%'}} my={{lg: 4}}>
          <Flex direction='column' gap={{lg:'4'}} h={{lg: '100%'}}>
            <CustomInput 
              type='number'
              id='oneTimePaymentNaira'
              label='One Time Payment- Naira'
            />
            <CustomInput 
              type='number'
              id='rentalValueNaira'
              label='Rental Value- Naira'
            />
            <CustomInput 
              type='number'
              id='oneTimePaymentDollar'
              label='One Time Payment- Dollar'
            />
            <CustomInput 
               type='number'
               id='rentalValueDollar'
               label='Rental Value- Dollar'
            />
          </Flex>
        </Box>
      </Flex>
      <Box w={{lg:'40%'}} mt={{base: 4}}>
        <LightButton>
          Upload Property
        </LightButton>
      </Box>
    </Flex>

   </Box>
  )
}

export default BrickandCondoUpload;