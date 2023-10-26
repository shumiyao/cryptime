import React, { ReactElement } from 'react';

import Image from 'next/image';
import { url } from 'inspector';

interface Props {
  imageSrc?: string;
  heading?: any;
  headingColor?: string;
  headingAlignmentRight?: boolean;
}

function HeadingAligned(props: Props = { imageSrc: '', heading: '', headingColor: '', headingAlignmentRight: true }): ReactElement {
  const headingAlignment = props.headingAlignmentRight ? props.headingAlignmentRight : true;
  return (
    <>
      <div>
        <div className=' w-full overflow-hidden '>
          <Image
            alt=''
            src={props.imageSrc || ''}
            quality={80}
            fill
            sizes='100vw'
            style={{
              objectFit: 'cover',
            }}
            className='swiper-lazy'
            priority
          />
        </div>
        <div className={'h-96 md:h-screen flex-1 flex flex-col justify-center ' + (headingAlignment ? 'items-end text-right' : 'items-start text-left')}>
          <h1 className={'pr-16 md:pr-20 text-6xl md:text-9xl text-gray-200 tracking-wider font-bold mt-12 drop-shadow-xl ' + (props.headingColor ? '' : 'text-gray-200 font-serif')} style={props.headingColor ? { color: props.headingColor } : {}} dangerouslySetInnerHTML={{ __html: props.heading }}></h1>
        </div>
        <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
      </div>
    </>
  );
}

export default HeadingAligned;
