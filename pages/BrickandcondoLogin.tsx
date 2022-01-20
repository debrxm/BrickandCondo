import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import { DarkFullWidthCard } from "../components/DarkFullWidthCard";
import { LightButton } from "../components/LightButton";

const BrickandcondoLogin = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      error.code === "auth/wrong-password"
        ? setErrorMessage(
            "The password is invalid or the user does not have a password."
          )
        : error.code === "auth/user-not-found"
        ? setErrorMessage(
            "There is no user record corresponding to this identifier."
          )
        : setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <DarkFullWidthCard>
      <Heading mb={20} color="white" fontSize="2xl" fontFamily="ProductBold">
        Login- For BrickandCondo Admins.
      </Heading>
      <Box w="60%">
        <form style={{ fontFamily: "ProductLight" }} onSubmit={onSubmit}>
          <FormControl mb={6}>
            <FormLabel
              htmlFor="email"
              color="white"
              fontSize={{ base: "18px" }}
            >
              Email address
            </FormLabel>
            <Input
              w={{ base: "40%" }}
              id="email"
              type="email"
              bg="white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel
              htmlFor="email"
              color="white"
              fontSize={{ base: "18px" }}
            >
              Password
            </FormLabel>
            <Input
              w={{ base: "40%" }}
              id="email"
              type="password"
              bg="white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <LightButton onClick={onSubmit}>Login</LightButton>
        </form>
      </Box>
    </DarkFullWidthCard>
  );
};

export default BrickandcondoLogin;
