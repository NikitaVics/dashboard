import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import Court1 from '@/pages/components/Icons/court1';
import Court2 from '@/pages/components/Icons/court2';
import Court3 from '@/pages/components/Icons/court3';
import Court4 from '@/pages/components/Icons/court4';
import Court5 from '@/pages/components/Icons/court5';
import Court6 from '@/pages/components/Icons/court6';
import useTranslation from 'next-translate/useTranslation';

interface ImageItem {
  id: number;
  name: string;
  icon: JSX.Element;
  selected: boolean;
}

const CourtMaintainence: React.FC = () => {
  const { t } = useTranslation('announcement');
  const [images, setImages] = useState<ImageItem[]>([
    { id: 1, name: 'Court1', icon: <Court1 />, selected: false },
    { id: 2, name: 'Court2', icon: <Court2 />, selected: false },
    { id: 3, name: 'Court3', icon: <Court3 />, selected: false },
    { id: 4, name: 'Court4', icon: <Court4 />, selected: false },
    { id: 5, name: 'Court5', icon: <Court5 />, selected: false },
    { id: 6, name: 'Court6', icon: <Court6 />, selected: false },
  ]);

  const handleImageClick = (imageId: number) => {
    setImages((prevImages) =>
      prevImages.map((image) => (image.id === imageId ? { ...image, selected: !image.selected } : image))
    );
  };

  const handleSubmit = () => {
    const selectedImages = images.filter((image) => image.selected).map((image) => image.name);
    console.log('Selected Images:', selectedImages);
    // Add your submission logic here
  };

  const bgColor = useColorModeValue('light.200', 'dark.300');

  return (
    <Box>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap="4"
        mt={4}
        borderRadius={'20px'}
      >
        {images.map((image) => (
          <GridItem key={image.id} rowSpan={1} colSpan={1}>
            <Stack
              bgColor={ bgColor}
              border={image.selected ? "1px solid rgba(78, 203, 113, 1)" : ""}
              p={4}
              borderRadius={'20px'}
              onClick={() => handleImageClick(image.id)}
            >
              {image.icon}
              <Text fontSize={'18px'} fontWeight="700">
                {t(`announce.${image.name.toLowerCase()}`)}
              </Text>
            </Stack>
          </GridItem>
        ))}
      </Grid>

      <Textarea h={'141px'} mt={10} placeholder={t(`announce.placeholder`)} />

      <Grid templateRows="repeat(1, 1fr)" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap="4" mt={8}>
        <GridItem rowSpan={1} colSpan={1}>
          <Button
            w="full"
            bg="none"
            variant={'outline'}
            borderColor="rgba(78, 203, 113, 1)"
            border="1px solid"
            color="rgba(78, 203, 113, 1)"
            h="80px"
            onClick={handleSubmit}
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
            onClick={handleSubmit}
          >
               {t(`common:buttons.send`)}
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CourtMaintainence;
