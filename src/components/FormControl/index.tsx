import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

export interface FormControlProps extends ChakraFormControlProps {
  ref?: React.MutableRefObject<null>;
  name: string;
  label?: string;
  helperText?: string;
}

export const FormControl: React.FC<FormControlProps> = (props) => {
  const { children, name, label, helperText, ...rest } = props;
  const [, { error, touched }] = useField(name);

  return (
    <ChakraFormControl isInvalid={!!error && touched} {...rest}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </ChakraFormControl>
  );
};

export default FormControl;
