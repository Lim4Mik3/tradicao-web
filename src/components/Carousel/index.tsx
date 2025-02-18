import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface CarouselProps extends Settings {
  children: React.ReactNode;
}

const Carousel = ({ children, ...settings }: CarouselProps) => {
  return <Slider {...settings}>{children}</Slider>;
};

export { Carousel };
