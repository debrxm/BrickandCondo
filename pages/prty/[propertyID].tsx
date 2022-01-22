import { Box, Divider, Flex, Heading, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'; 
import { CustomInput, CustomTextArea } from '../../components/CustomInput';
import { DangerButton } from '../../components/DangerButton';
import { LightButton } from '../../components/LightButton';
import { LoggedInBanner } from '../../components/LoggedInBanner';
import { ScheduleCard } from '../../components/ScheduleCard';
import { AddMulitplePhotos, AddedImagesPreview, EditMainUploadComp } from '../../components/UploadComponents';


const fakeScheduledVisit = [ 
  { 
    clientName: 'Kumuran Davids',
    scheduledDate: '12th Febuary 2022', 
    clientEmail: 'james@gmail.com', 
  }, 
  { 
    clientName: 'James Akpan',
    scheduledDate: '1st April 2082', 
    clientEmail: 'lmao@drake.com', 
  }, 
  { 
    clientName: 'Boluwatife Agebelemo',
    scheduledDate: '11th June 2024', 
    clientEmail: 'fola@jumia.com', 
  }, 
]

const IndividualProperty = ({user}: {user: object}) => { 
  return ( 
    <Flex direction="column">
      <LoggedInBanner email={user} />
      <Popover>
        <PopoverTrigger>
          <Flex direction='column' w='fit-content' my={{base:4}}> 
            <DangerButton>Delete This Property</DangerButton>
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <Heading fontFamily='ProductBold' fontSize='2xl'>Are you sure?</Heading>
          </PopoverHeader>
          <PopoverBody>  
            <Text
              mb={{base: 4}} 
              fontFamily='ProductLight' 
              fontSize={{base: '16px'}}
            >
              Are you sure? You can't retrieve this property once deleted.
            </Text>
            <DangerButton>Yes, Delete</DangerButton>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Flex my={{base: 10}} justifyContent='flex-start' direction={{base: 'column', lg:'row'}}>
        <Heading w={{base: '100%', lg: '80%'}} fontSize='3xl' color='secondary.100' fontFamily='ProductBold'>Updating: House 23, New layout</Heading>
      </Flex>

      <Flex gap={{base: 4}} direction={{base: 'column', lg: 'row'}}>
       <Box w={{lg: '80%', base:'100%'}}>
        <EditMainUploadComp 
          text='Change Main Image'
          imageURL='https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/271fe938251bcc3921fa947afa16b907-full.webp'
        />
       </Box>
       <Flex gap={{base: 4}} direction={{base: 'column'}} w={{lg: '20%', base:'100%'}}>
        <Box>
          <EditMainUploadComp 
            text='Change Sub Image'
            imageURL='https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/271fe938251bcc3921fa947afa16b907-full.webp'
          />
        </Box>
        <Box>
          <EditMainUploadComp 
            text='Change Sub Image'
            imageURL='https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/271fe938251bcc3921fa947afa16b907-full.webp'
          />
        </Box>
       </Flex>
      </Flex>

      <Flex direction='column' my={{base: 8}} gap={{base: 4}}>
        <AddMulitplePhotos text='Add more images' />
        <Flex gap={{base: 4}} w={{lg:'fit-content', base: '100%'}}>
          { 
            [1,2,3].map((item, index) => {
              return ( 
                <AddedImagesPreview imageURL='https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/271fe938251bcc3921fa947afa16b907-full.webp'/>
              )
            })
          }
        </Flex>
      </Flex>

      <Flex direction="column" my="10">
            <Heading
              fontSize={{ lg: "25px" }}
              fontFamily="ProductBold"
              color="secondary.100"
            >
              Property Meta Data
            </Heading>

            <Flex
              mt="10"
              w="fit-content"
              gap={{ lg: 4 }}
              direction={{ lg: "row", base: "column" }}
            >
              <CustomInput
                type="number"
                id="BathNum"
                label="How many Baths?"
              />
              <CustomInput
                type="number"
                id="RoomNum"
                label="How many Rooms?"

              />
              <CustomInput
                type="number"
                id="BathText"
                label="Total Square foot"
              />
            </Flex>
          </Flex>

         <Flex>
          <Divider mt={{ lg: "8" }} colorScheme="secondary" />
         </Flex>

         <Flex direction="column" my="10">
            <Heading
              fontSize={{ lg: "25px" }}
              mb={{ base: "4" }}
              fontFamily="ProductBold"
              color="secondary.100"
            >
              Property Main Data
            </Heading>

            <Flex
              gap={{ lg: 4, base: 10 }}
              direction={{ lg: "row", base: "column" }}
            >
              <Box w={{ lg: "80%", base: "100%" }} my={{ lg: 4 }}>
                <Flex direction="column" gap={{ lg: 4, base: 6 }}>
                  <CustomInput
                    type="text"
                    id="propertyName"
                    label="Property Name"
                  />
                  <CustomInput
                    type="text"
                    id="propertySubLocation"
                    label="Property SubLocation"
                  />
                  <CustomInput
                    type="text"
                    id="propertyLocation"
                    label="Property Location"
                  />
                  <CustomTextArea
                    type="text"
                    id="DescriptionData"
                    label={`Property's Description`}
                  />
                </Flex>
              </Box>
              <Box w={{ lg: "20%", base: "100%" }} my={{ lg: 4 }}>
                <Flex direction="column" gap={{ lg: "4" }} h={{ lg: "100%" }}>
                  <CustomInput
                    type="number"
                    id="oneTimePaymentNaira"
                    label="One Time Payment- Naira"
                  />
                  <CustomInput
                    type="number"
                    id="rentalValueNaira"
                    label="Rental Value- Naira"
                  />
                  <CustomInput
                    type="number"
                    id="oneTimePaymentDollar"
                    label="One Time Payment- Dollar"
                  />
                  <CustomInput
                    type="number"
                    id="rentalValueDollar"
                    label="Rental Value- Dollar"
                  />
                </Flex>
              </Box>
            </Flex>
            <Box w={{ lg: "40%" }} mt={{ base: 4 }}>
              <LightButton>
                  Update Property
              </LightButton>
            </Box>
          </Flex> 

          <Divider 
            my={{ lg: "8" }} 
            colorScheme="secondary"
          /> 
          <Heading
            fontSize={{ lg: "25px" }}
            fontFamily="ProductBold"
            color="secondary.100"
            mb={8}
          >
            Scheduled Date
          </Heading>
          <Flex direction={{base: 'column', lg: 'row'}} gap={{base: 4,}}>
            { 
              fakeScheduledVisit.map((item, index) => { 
                return (
                  <ScheduleCard
                    clientName={item.clientName}
                    scheduledDate={item.scheduledDate}
                    clientEmail={item.clientEmail}
                  />
                )
              })
            }
          </Flex>
          

    </Flex>
  )
}

export default IndividualProperty;