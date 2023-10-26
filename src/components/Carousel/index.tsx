import React, { ReactElement, ReactNode } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Lazy, Navigation, Autoplay } from 'swiper';
import HeadingAligned from './layouts/HeadingAligned';
import LeadOnly from './layouts/LeadOnly';
import ImageOnly from './layouts/ImageOnly';
import HeadingAlignedLeft from './layouts/HeadingAligned';
import HeadingLeadCentered from './layouts/HeadingLeadCentered';
import HeadingLeadCenteredWithCTA from './layouts/HeadingLeadCenteredWithCTA';
import Hero from './layouts/Hero';

import { NestedSlide } from '@/lib/schema';

interface Props {
  showcaseId: string;
  slides?: NestedSlide[];
  slideContainerHeight?: string;
  autoPlaySpeed?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  loopSlides?: boolean;
}

const slideLayoutComponents = {
  ImageOnly: ImageOnly,
  HeadingLeadCenteredWithCTA: HeadingLeadCenteredWithCTA,
  HeadingLeadCentered: HeadingLeadCentered,
  Hero: Hero,
};

const slideContainerHeightTable = {
  short: 'h-96 sm:h-136',
  full: 'h-screen',
  default: '',
};

function CarouselComponent(props: Props): ReactElement {
  const { slideContainerHeight, slides, showcaseId, autoPlaySpeed, showNavigation, showPagination, loopSlides } = props;
  const slideContainerHeightClassNames = slideContainerHeightTable[slideContainerHeight || 'default'];
  return (
    <>
      <div className='hero-slider-banner '>
        <Swiper
          style={{
            zIndex: 0,
          }}
          slidesPerView={1}
          spaceBetween={0}
          navigation={showNavigation}
          pagination={showPagination}
          lazy={true}
          loop={loopSlides}
          autoplay={
            autoPlaySpeed
              ? {
                  delay: autoPlaySpeed,
                  disableOnInteraction: true,
                }
              : false
          }
          //   pagination={{
          //     clickable: true,
          //   }}
          modules={[Lazy, Navigation, Autoplay]}
          className='mySwiper'
        >
          {slides &&
            slides.length > 0 &&
            slides.map((slideData: NestedSlide, idx: number) => {
              const SlideLayout = slideLayoutComponents[slideData.slideType];
              return (
                <SwiperSlide key={showcaseId + '-' + idx}>
                  <SlideLayout key={'heroslide-' + idx} slideData={slideData} heightClass={slideContainerHeightClassNames} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
}

export default CarouselComponent;
