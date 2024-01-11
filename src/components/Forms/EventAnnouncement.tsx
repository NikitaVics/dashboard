import { Button, Grid, GridItem, Input, Text, Textarea, useColorModeValue } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { InputControl } from "../Input/Input"
import useTranslation from "next-translate/useTranslation"
import PlusIcon from "@/pages/components/Icons/PlusIcon"



const EventAnnouncement = () => {

    const {t} = useTranslation("announcement")
    const bgColor = useColorModeValue("light.200","dark.300")
    return (
        <Formik
        initialValues={{
            firstName: "",
          }}
          onSubmit={() => {}}
        >
          {({  setFieldTouched,values }) => (
            <Form noValidate>

      
        <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap="8"
        mt={10}
       
        pt={7}
        pl={4}
        borderRadius={"20px"}>
            <GridItem rowSpan={1} colSpan={2}>
            <InputControl name="eventName" inputProps={{
                bgColor:bgColor
            }} />
           
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
                <Input  type="date"  bgColor={bgColor}/>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
                <Input  type="time"  bgColor={bgColor} />
            </GridItem>

            <GridItem rowSpan={1} colSpan={2} >
            <div style={{ border: '1px solid black', borderRadius: '4px',height:"120px",backgroundColor : bgColor }}>
                                <label htmlFor="attachment" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                                    <Input
                                        type="file"
                                        id="attachment"
                                        
                                        name="attachment"
                                        // onChange={(e) => setFieldValue('attachment', e.currentTarget.files[0])}
                                        display="none"
                                       
                                        
                                    />
                                    <PlusIcon w={24} /> 
                                    <Text ml={2} color="gray.500">Upload File</Text>
                                </label>
                            </div>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
            <Textarea h={'174px'} mt={10} placeholder={t(`announce.placeholder`)}  bgColor={bgColor} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
          <Button
            w="full"
            bg="none"
            variant={'outline'}
            borderColor="rgba(78, 203, 113, 1)"
            border="1px solid"
            color="rgba(78, 203, 113, 1)"
            h="80px"
            // onClick={handleSubmit}
          >
            {t(`common:buttons.schedule`)}
          </Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Button
            w="full"
            bgColor="rgba(78, 203, 113, 1)"
            color="#fff"
            h="80px"
            _hover={{ bg: 'none', color: 'rgba(78, 203, 113, 1)', border: '1px solid rgba(78, 203, 113, 1)' }}
            // onClick={handleSubmit}
          >
               {t(`common:buttons.send`)}
          </Button>
        </GridItem>
        </Grid>
        </Form>
          )}
        </Formik>
    )
}


export default EventAnnouncement