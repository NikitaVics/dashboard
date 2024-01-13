import {
    
    FormLabelProps as ChakraFormLabelProps,
    Input as ChakraInput,
    InputGroup,
    InputGroupProps as ChakraInputGroupProps,
    InputLeftAddon,
    InputLeftElement,
    InputProps as ChakraInputProps,
    InputRightAddon,
    InputRightElement,
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

  
  
  export function CustomInput(props: InputProps) {
    const {
      name,
       // eslint-disable-next-line
      label,
      inputProps,
      inputGroupProps,
      inputLeftAddon,
      inputLeftElement,
      inputRightAddon,
      inputRightElement,
      inputLeftElementColor,
      inputRightElementColor,
      inputRightElementZIndex = "unset",
      ...rest
    } = props
    const [field] = useField(name)
    const color4 = useColorModeValue("light.200", "dark.300")
  
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
            
            _placeholder={{color : color4}}
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
         {inputProps && (
          <label
            style={{
              padding: "5px",
              fontSize: "14px",
              
              position: "absolute",
           
              opacity: 1,
              color: "rgba(78, 203, 113, 1)",
              textTransform: "uppercase",
              transform: " translateY(-70%) translateX(10px)",
              display: "block",
              zIndex: 1,
              overflow: "visible",
            }}
          >
            {inputProps.placeholder}
          </label>
        )}
        </InputGroup>
      
      </FormControl>
    )
  }
  
  export const Input = ChakraInput
  
  export default Input
  