import {
    FormLabel,
    FormLabelProps as ChakraFormLabelProps,
    Input as ChakraInput,
    InputGroup,
    InputGroupProps as ChakraInputGroupProps,
    InputLeftAddon,
    InputLeftElement,
    InputProps as ChakraInputProps,
    InputRightAddon,
    InputRightElement,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react"
  import { useField } from "formik"
  import React from "react"
  
  import { FormControl, FormControlProps } from "../FormControl"
  
  type BottomTextLabelProperties = {
    marginTop: string
    color: string
    fontSize: string
  }
  
  export type InputProps = Omit<FormControlProps, "label"> & {
    inputLeftAddon?: string
    inputLeftElement?: React.ReactNode | string
    inputRightAddon?: React.ReactNode
    inputRightElement?: React.ReactNode
    label?: string | React.ReactElement
    tooltip?: string | React.ReactElement
    labelProps?: ChakraFormLabelProps
    inputGroupProps?: ChakraInputGroupProps
    inputProps?: ChakraInputProps & {
      disabled?: boolean
      ref?: React.RefObject<HTMLInputElement>
      placeholder?: string
    }
    mask?: Array<RegExp | string>
    inputLeftElementColor?: string
    inputRightElementColor?: string
    inputRightElementZIndex?: string
    bottomTextLabel?: string
    bottomText?: BottomTextLabelProperties
  }
  
  export function InputControl(props: InputProps) {
    const {
      name,
      label,
      labelProps,
      inputProps,
      inputGroupProps,
      inputLeftAddon,
      inputLeftElement,
      inputRightAddon,
      inputRightElement,
      inputLeftElementColor,
      inputRightElementColor,
      inputRightElementZIndex = "unset",
      bottomTextLabel,
      bottomText,
      ...rest
    } = props
    const [field] = useField(name)
    const color4 = useColorModeValue("black", "#fff")
    const color2 = useColorModeValue("#fff", "#fff")
    const color3 = useColorModeValue("#fff", "black")
  
    return (
      <FormControl name={name} {...rest}>
        <InputGroup {...inputGroupProps} position="relative">
          {inputLeftElement && (
            <InputLeftElement
              pointerEvents="none"
              color={
                inputLeftElementColor
                  ? inputLeftElementColor
                  : field.value
                    ? "white"
                    : "gray.700"
              }
              borderBottom="2px solid transparent"
            >
              {inputLeftElement}
            </InputLeftElement>
          )}
  
          {inputLeftAddon && (
            <InputLeftAddon
              color={field.value ? "white" : "gray.700"}
              borderBottom="2px solid transparent"
            >
              {inputLeftAddon}
            </InputLeftAddon>
          )}
          <ChakraInput
            {...field}
            id={name}
            aria-label={name}
            color="gray"
            _focus={{ boxShadow: "none" ,borderColor:"rgba(78, 203, 113, 1)"}}
            autoComplete="off"
            {...inputProps}
          />
          {inputRightAddon && (
            <InputRightAddon
              color={field.value ? "white" : "gray.500"}
              borderBottom="2px solid transparent"
            >
              {inputRightAddon}
            </InputRightAddon>
          )}
          {inputRightElement && (
            <InputRightElement
              color={
                inputRightElementColor
                  ? inputRightElementColor
                  : field.value
                    ? "white"
                    : "gray.700"
              }
              borderBottom="2px solid transparent"
              zIndex={inputRightElementZIndex}
              height="12"
            >
              {inputRightElement}
            </InputRightElement>
          )}
          {inputProps && inputProps.placeholder && field.value && (
            <label
              style={{
                padding: "6px",
                fontSize: "17px",
                pointerEvents: "none",
                position: "absolute",
                left: 15,
                top: 0,
                opacity: 1,
                color: color4,
  
                backgroundColor: labelProps ? color3 : color2,
                transform: field.value
                  ? "scale(0.75) translateY(-70%) translateX(-14px)"
                  : "none",
                display: field.value ? "block" : "block",
  
                zIndex: 1,
  
                overflow: "visible",
              }}
            >
              {inputProps.placeholder}
            </label>
          )}
        </InputGroup>
        {typeof label === "string" ? (
          <FormLabel
            htmlFor={name}
            color="gray.500"
            mb="0"
            me="0"
            fontSize="sm"
            fontWeight="medium"
            opacity="1"
            _disabled={{ opacity: "unset" }}
            {...labelProps}
          >
            {label}
          </FormLabel>
        ) : (
          label
        )}
        {bottomTextLabel && <Text {...bottomText}>{bottomTextLabel}</Text>}
      </FormControl>
    )
  }
  
  export const Input = ChakraInput
  
  export default Input
  