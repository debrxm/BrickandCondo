import {
  FormControl,
  Text,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

export const CustomInput = ({
  label,
  id,
  type,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type: string;
  value: any;
  onChange: any;
}) => {
  let formattedNum = Number(value).toLocaleString();
  return (
    <FormControl fontFamily="ProductLight">
      <FormLabel
        textTransform="capitalize"
        color="secondary.100"
        htmlFor={type}
      >
        {label} 
        { 
          (type === 'number' && value > 999) && <Text fontFamily='ProductLight'>{formattedNum}</Text>
        }
      </FormLabel>
      <Input
        boxShadow="0px 0px 22px rgba(0, 0, 0, 0.08)"
        fontSize={{ lg: "20px" }}
        py={{ lg: "8" }}
        bg="white"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};

export const CustomTextArea = ({
  label,
  id,
  type,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: any;
}) => {
  return (
    <FormControl fontFamily="ProductLight">
      <FormLabel
        textTransform="capitalize"
        color="secondary.100"
        htmlFor={type}
      >
        {label}
      </FormLabel>
      <Textarea
        boxShadow="0px 0px 22px rgba(0, 0, 0, 0.08)"
        fontSize={{ lg: "20px" }}
        py={{ lg: 8, base: 4 }}
        bg="white"
        w={{ lg: "100%", base: "100%" }}
        id={id}
        cols={20}
        h={{ lg: "500px", base: "1000px" }}
        type={type}
        value={value}
        onChange={onChange}
        lineHeight='2.2'
      />
    </FormControl>
  );
};
