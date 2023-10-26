import React, { ReactElement, useContext } from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  summary: string;
  date: string;
  imageSrc: string;
  body: string;
  slug: string;
  website: string;
}

function BrandGridItem(props: Props): ReactElement {
  return (
    <a href={props.website ? props.website : '/brands/' + props.slug} target={props.website ? '_blank' : ''} rel={props.website ? 'noreferrer' : ''}>
      <div className='rounded-2xl border-2 border-gray-100 overflow-hidden shadow-md bg-white rmilion hover:shadow-xl hover:-translate-y-1 transition-all ease duration-200'>
        <div className=''>
          <Image alt={props.title} src={props.imageSrc} quality={80} width='0' height='0' sizes='100vw' decoding='async' data-nimg='1' className='aspect-square object-cover duration-700 ease-in-out grayscale-0 blur-0 h-auto w-full' loading='lazy' placeholder='blur' blurDataURL='/placeholder-image.jpg' style={{ color: 'transparent' }} />
        </div>
        <div className='py-3 px-5 border-t border-gray-200'>
          <h3 className='font-cal text-xl tracking-wide text-gray-800'>{props.title}</h3>
          <p className='text-md italic text-gray-600 my-2 truncate hidden sm:block md:hidden lg:block'>{props.summary}</p>
        </div>
      </div>
    </a>
  );
}

export default BrandGridItem;
