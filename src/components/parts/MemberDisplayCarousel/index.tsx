import React, { useState, useImperativeHandle, useEffect, ForwardRefRenderFunction, forwardRef } from 'react';
import ReactModal from 'react-modal';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';

import { AdditionalPhotos } from '../../../lib/schema';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/lazy';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Lazy } from 'swiper';

export type ModalHandles = {
  open: () => void;
  currentThumbImageTitle: () => string;
};

interface Props {
  showcaseId: string;
  items?: AdditionalPhotos[];
  currentProductImageIndex?: number;
  ref?: any;
  photoIndex?: number;
  options?: string[];
  linkTo?: string;
}

const customStyles = {
  content: {
    background: 'none',
    border: 'none',
    overflow: 'hidden',
  },

  overlay: {
    zIndex: 30,
  },
};

const MemberDisplayCarousel: ForwardRefRenderFunction<ModalHandles, Props> = (props, ref) => {
  const router = useRouter();
  // carousel slider
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    const slideTo = (index) => swiper.slideTo(index);
    if (swiper && swiper.destroyed !== true) {
      slideTo(props.currentProductImageIndex);
    }
  }, [swiper, props]);
  // modal carousel
  const [modalSwiper, setModalSwiper] = useState(null);
  useEffect(() => {
    const modalSlideTo = (index) => modalSwiper.slideTo(index, 0);
    if (modalSwiper && modalSwiper.destroyed !== true) {
      modalSlideTo(props.currentProductImageIndex);
    }
  }, [props.currentProductImageIndex, modalSwiper]);
  // modal
  const [modal, setModal] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(props.photoIndex);

  // ModalHandles
  useImperativeHandle(ref, () => ({
    open() {
      setModal(true);
    },
    currentThumbImageTitle() {
      const { activeIndex } = swiper;
      return props.items[activeIndex].title as string;
    },
  }));

  // setPhotoIndex(props.photoIndex);
  function onClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (!props.linkTo) {
      setModal(true);
    } else {
      router.push(props.linkTo);
    }
  }

  function onClose(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setModal(false);
  }

  useEffect(() => ReactModal.setAppElement('body'));
  return (
    <>
      <button onClick={onClick} className='product-display-swiper'>
        <div className='relative'>
          <Swiper
            onSwiper={(e) => {
              setSwiper(e);
              e.on('activeIndexChange', function (e) {
                const { activeIndex } = e;
                const currentSlideTitle = props.items[activeIndex];
                const productionSelectElm = document.getElementById('product-options-' + props.showcaseId) as HTMLSelectElement;
                if (productionSelectElm) {
                  const optionImageExists = props.options.findIndex((e) => e === currentSlideTitle.title);
                  if (optionImageExists !== -1) {
                    productionSelectElm.value = props.options[optionImageExists];
                  }
                }
                //
              });
            }}
            style={{
              zIndex: 0,
            }}
            lazy={true}
            slidesPerView={1}
            spaceBetween={0}
            modules={[Lazy]}
            className='mySwiper'
          >
            {props.items.map((resource: AdditionalPhotos, index) => {
              return (
                <SwiperSlide key={props.showcaseId + '-' + index}>
                  <Image alt='' src={resource.image} quality={80} width='0' height='0' sizes='100vw' className='  swiper-lazy h-auto w-full ' loading='lazy' />
                  <div className='swiper-lazy-preloader absolute top-1/2 left-1/2'>
                    <div className='flex items-center justify-center space-x-2'>
                      <div className='w-4 h-4 rounded-full animate-pulse dark:bg-gray-400'></div>
                      <div className='w-4 h-4 rounded-full animate-pulse dark:bg-gray-400'></div>
                      <div className='w-4 h-4 rounded-full animate-pulse dark:bg-gray-400'></div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/* <Image alt={props.items[0] ? '' : ''} className={'w-full sm:w-96 h-96 object-cover overflow-hidden rounded'} width='0' height='0' sizes='100vw' src={props.items[0] ? props.items[0].image : '/placeholder-image.jpg'} placeholder='blur' blurDataURL='/placeholder-image.jpg' /> */}
      </button>
      <ReactModal isOpen={modal} onClick={onClose} closeTimeoutMS={500} style={customStyles}>
        <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ' onClick={onClose}></div>
          <div className='  z-10 ' onClick={onClose}>
            <div className='flex h-screen w-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
              <Swiper
                onSwiper={setModalSwiper}
                style={{
                  zIndex: 0,
                }}
                lazy={true}
                slidesPerView={1}
                spaceBetween={0}
                modules={[Lazy]}
                className='mySwiper'
              >
                {props.items.map((resource: AdditionalPhotos, index) => {
                  return (
                    <SwiperSlide key={'modal-' + index}>
                      <Image alt='' src={resource.image} quality={80} width='0' height='0' sizes='100vw' className='swiper-lazy	h-auto w-full' loading='lazy' />
                      <div className='swiper-lazy-preloader absolute top-1/2 left-1/2'>
                        <div className='flex items-center justify-center space-x-2'>
                          <div className='w-4 h-4 rounded-full animate-pulse dark:bg-gray-400'></div>
                          <div className='w-4 h-4 rounded-full animate-pulse dark:bg-gray-400'></div>
                          <div className='w-4 h-4 rounded-full animate-pulse dark:bg-gray-400'></div>
                        </div>
                      </div>{' '}
                    </SwiperSlide>
                  );
                })}
              </Swiper>{' '}
            </div>
          </div>
        </div>
      </ReactModal>
      <style>{`
      .ReactModal__Overlay {
        opacity: 0;
        transition: all 290ms ease-in-out;
      }

      .ReactModal__Overlay--after-open {
        opacity: 1;
      }

      .ReactModal__Overlay--before-close {
        opacity: 0;
      }
      `}</style>
    </>
  );
};

export default forwardRef(MemberDisplayCarousel);
