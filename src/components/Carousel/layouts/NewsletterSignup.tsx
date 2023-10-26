import React, { ReactElement } from 'react';

import Image from 'next/image';
import { url } from 'inspector';

interface Props {
  imageSrc?: String;
  heading?: String;
  lead?: String;
  ctaButtonLabel?: String;
  ctaButtonUrl?: String;
}

function NewsletterSignup(props: Props = { imageSrc: '', heading: '', lead: "Notify me when it's ready", ctaButtonLabel: '', ctaButtonUrl: '' }): ReactElement {
  return (
    <>
      <div className='flex  items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white' style={{ backgroundImage: "url('" + props.imageSrc + "')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className='flex-1 flex flex-col items-center justify-center'>
          <h1 className='text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center'>{props.heading}</h1>
          <div className='flex flex-col items-center space-y-4 mt-24'>
            <p className='text-gray-300 uppercase text-sm'>{props.lead}</p>
            <form className='w-full flex items-center'>
              <input type='email' name='email' id='email' className='w-72 p-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-tl rounded-bl text-sm' placeholder='Email' autoComplete={'off'} />
              <button className='bg-blue-600 hover:bg-blue-700 py-2 px-6 text-gray-100 border border-blue-600 rounded-tr rounded-br text-sm'>{props.ctaButtonLabel}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsletterSignup;
