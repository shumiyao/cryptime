import React, { ReactElement, useContext } from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  summary: string;
  date?: string;
  imageSrc: string;
  slug: string;
}

function PostGridItem(props: Props): ReactElement {
  return (
    <a href={'/members/' + props.slug}>
      <div className='rounded-2xl border-2 border-gray-100 overflow-hidden shadow-md bg-white rmilion hover:shadow-xl hover:-translate-y-1 transition-all ease duration-200'>
        <Image alt='sample post' src={props.imageSrc} width='500' height='400' decoding='async' data-nimg='1' className='w-full h-64 object-cover duration-700 ease-in-out grayscale-0 blur-0 scale-100' loading='lazy' style={{ color: 'transparent' }} />

        <div className='py-8 px-5 h-36 border-t border-gray-200'>
          <h3 className='font-cal text-xl tracking-wide text-gray-500'>{props.title}</h3>
          <p className='text-md italic text-gray-500 my-2 '>{props.summary}</p>
          {props.date && <p className='text-sm text-gray-500 my-2'>Published {props.date}</p>}
        </div>
      </div>
    </a>
  );
}

export default PostGridItem;
