import { Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'

export const ClientScheduleCard = () => { 
  return ( 
    <Flex 
      w='100%' 
      py={{lg: 14}} 
      px={{lg: 8}} 
      bg='secondary.100'
      borderRadius='xl'
      direction='column'
    >
      <Heading color='white' textTransform='capitalize' fontFamily='ProductBold' fontSize='2xl'>
        schedule a date to see this property- we can’t wait to meet you!
      </Heading>

      <form>
        <FormControl>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <Input id='email' type='email' />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='phoneNumber'>Phone Number</FormLabel>
          <Input id='phoneNumber' type='number' />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='date'>Select a date</FormLabel>
          <Input id='date' type='date' />
        </FormControl>
      </form>
    </Flex>
  )
}