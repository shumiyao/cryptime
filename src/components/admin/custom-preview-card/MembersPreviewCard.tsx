import React from 'react';

import Image from 'next/image';
import type { TemplatePreviewCardProps } from '@staticcms/core';

/**
 * The type for 'entry.data'
 */
interface Post {
  image: string;
  name: string;
}

const MembersPreviewCard = ({ entry, widgetFor }: TemplatePreviewCardProps<Post>) => {
  const [src, setSrc] = React.useState(entry.data.image || '/site-images/placeholder-image.jpg');

  return (
    <>
      <div style={{ width: '100%' }}>
        <div className='flex items-center space-x-4'>
          <Image alt='' className='rounded-full h-14 w-14' width='0' height='0' sizes='100vw' src={src} onError={() => setSrc('/site-images/placeholder-image.jpg')} />

          <div className='flex flex-col space-y-2'>
            <span>{entry.data.name}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersPreviewCard;
