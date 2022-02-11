import { Box, Heading } from '@chakra-ui/react';
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";

const SliderTest = (props:any) => { 
  return ( 
    <Box w='100%' display={{base: 'block', lg: 'none'}}>
      <Swiper className="swiper-slide">
        {props.children}
      </Swiper>
    </Box>
  )
}

export default SliderTest;