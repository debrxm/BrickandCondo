import React from "react";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { firestore } from "../firebase/config";

export const ClientScheduleCard = ({ propertyID }: { propertyID: number }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [date, setDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState<any | {}>({});
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
      setStatus({ code: 200, message: "Success" });
    } catch (error) {
      setStatus({ code: 404, message: "Failed" });
    }
    setIsLoading(false);
  };
  return (
    <Flex
      w="100%"
      py={{ lg: 14 }}
      px={{ lg: 8 }}
      bg="secondary.100"
      borderRadius="xl"
      direction="column"
    >
      <Heading
        color="white"
        textTransform="capitalize"
        fontFamily="ProductBold"
        fontSize="2xl"
      >
        schedule a date to see this property- we can’t wait to meet you!
      </Heading>

      <form onSubmit={onSubmit}>
        {status && (
          <FormLabel
            style={{ color: "#ffffff", textAlign: "center" }}
            htmlFor="name"
          >
            {status.message}
          </FormLabel>
        )}
        <FormControl>
          <FormLabel style={{ color: "#ffffff" }} htmlFor="name">
            Full name
          </FormLabel>
          <Input
            id="name"
            type="text"
            style={{ color: "#ffffff" }}
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
        <FormControl>
          <FormLabel style={{ color: "#ffffff" }} htmlFor="email">
            Email address
          </FormLabel>
          <Input
            id="email"
            type="email"
            style={{ color: "#ffffff" }}
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
        <FormControl>
          <FormLabel style={{ color: "#ffffff" }} htmlFor="phoneNumber">
            Phone Number
          </FormLabel>
          <Input
            id="phoneNumber"
            type="number"
            style={{ color: "#ffffff" }}
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
        <FormControl>
          <FormLabel style={{ color: "#ffffff" }} htmlFor="date">
            Select a date
          </FormLabel>
          <Input
            id="date"
            type="date"
            style={{ color: "#ffffff" }}
            value={date}
            onChange={
              isLoading
                ? () => {}
                : (e: any) => {
                    setDate(e.target.value);
                  }
            }
          />
        </FormControl>
      </form>
    </Flex>
  );
};
