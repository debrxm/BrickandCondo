import React from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { firestore } from '../firebase/config';
import { LightButton } from './LightButton';

export const ClientScheduleCard = ({ propertyID }: { propertyID: number }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [date, setDate] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState<any | {}>({});
  const [showForm, setShowFrom] = React.useState<boolean | null>(true);

  const onSubmit = async () => {
    setIsLoading(true);
    const scheduleRef = firestore
      .collection(`properties`)
      .doc(`${propertyID}`)
      .collection(`schedules`);
    try {
      await scheduleRef.doc().set({
        clientName: name,
        clientPhoneNumber: phone,
        clientEmail: email,
        scheduledDate: date,
      });
      setStatus({ code: 200, message: 'Success' });
      setShowFrom(!showForm); 

    } catch (error) {
      setStatus({ code: 404, message: 'Failed' });
    }
    setIsLoading(false);
  };

  let dateArr = new Date().toLocaleDateString().split('/').reverse();
  
  return (
    <Flex
      w={{base:'100%', md: '50%', lg: '100%'}}
      py={{ lg: 14, base: 8 }}
      px={{ lg: 8, base: 10 }}
      bg='secondary.100'
      borderRadius='xl'
      direction='column'
    >
      <Heading
        color='white'
        textTransform='capitalize'
        fontFamily='ProductBold'
        fontSize='2xl'
        mb={{base: 4}}
      >
        schedule a date to see this property- we can’t wait to meet you!
      </Heading>

      <Box display={!showForm ? 'none' : 'block'}>
        <form onSubmit={onSubmit} style={{fontFamily:'ProductLight'}}>
          {status && (
            <FormLabel
              style={{ color: '#ffffff', textAlign: 'center' }}
              htmlFor='name'
            >
              {status.message}
            </FormLabel>
          )}
          <FormControl fontFamily='ProductLight' mb={{base: 4}}>
            <FormLabel fontFamily='ProductLight' style={{ color: '#ffffff' }} htmlFor='name'>
              Full name
            </FormLabel>
            <Input
              fontFamily='ProductLight'
              id='name'
              type='text'
              style={{ color: '#ffffff' }}
              value={name}
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      setName(e.target.value);
                    }
              }
            />
          </FormControl>
          <FormControl  mb={{base: 4}}>
            <FormLabel style={{ color: '#ffffff' }} htmlFor='email'>
              Email address
            </FormLabel>
            <Input
              fontFamily='ProductLight'
              id='email'
              type='email'
              style={{ color: '#ffffff' }}
              value={email}
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      setEmail(e.target.value);
                    }
              }
            />
          </FormControl>
          <FormControl  mb={{base: 4}}>
            <FormLabel style={{ color: '#ffffff' }} htmlFor='phoneNumber'>
              Phone Number
            </FormLabel>
            <Input
              fontFamily='ProductLight'
              id='phoneNumber'
              type='number'
              style={{ color: '#ffffff' }}
              value={phone}
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      setPhone(e.target.value);
                    }
              }
            />
          </FormControl>
          <FormControl  mb={{base: 4}}>
            <FormLabel style={{ color: '#ffffff' }} htmlFor='date'>
              Select a date
            </FormLabel>
            <Input
              fontFamily='ProductLight'
              id='date'
              type='date'
              style={{ color: '#ffffff' }}
              value={date}
              min={dateArr.join('-')}
              onChange={
                isLoading
                  ? () => {}
                  : (e: any) => {
                      setDate(e.target.value);
                    }
              }
            />
          </FormControl>
          <Box w={{ lg: '40%' }} mt={{ base: 4 }} mb={{base: 4}}>
            <LightButton 
              onClick={isLoading ? () => {} : onSubmit}
              disabled={!(name && email && phone && date)}
            >
              {isLoading ? 'Sending...' : 'Submit'}
            </LightButton>
          </Box>
        </form>
      </Box>

      <Box display={showForm ? 'none' : 'block'}>
        <Heading fontSize={{base: 'xl'}} lineHeight='1.5' color='white' fontFamily='ProductLight'>
          🎉 Thanks! We got your message and we will be in touch with more details for your visit 🎉  
        </Heading>
      </Box>
      
    </Flex>
  );
};
