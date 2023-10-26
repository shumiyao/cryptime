import React, { ReactElement } from 'react';

import { NestedSlide } from '../../../lib/schema';

interface Props {
  slideData: NestedSlide;
  heightClass?: string;
}

function ImageOnly(props: Props): ReactElement {
  return (
    <>
      <div className={'flex items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white ' + (props.heightClass ? props.heightClass : '')} style={{ backgroundImage: "url('" + props.slideData.image + "')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
    </>
  );
}

export default ImageOnly;
