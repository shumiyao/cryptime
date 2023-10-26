import React, { ReactElement } from 'react';

import Image from 'next/image';
import { url } from 'inspector';

interface Props {
  imageSrc?: String;
  lead?: any;
}

function LeadOnly(props: Props = { imageSrc: '', lead: '' }): ReactElement {
  return (
    <>
      <div className='flex  items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white' style={{ backgroundImage: "url('" + props.imageSrc + "')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className='flex-1 flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center space-y-4 mt-24'>
            <p className='text-gray-300 uppercase text-lg font-overpass drop-shadow-xl' dangerouslySetInnerHTML={{ __html: props.lead }}></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadOnly;
