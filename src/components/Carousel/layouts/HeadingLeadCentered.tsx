import React, { ReactElement, useContext } from 'react';
import AppContext from '@/lib/AppContext';
import { NestedSlide } from '@/lib/schema';

interface Props {
  key: string;
  slideData: NestedSlide;
  heightClass?: string;
}

function HeadingLeadCentered(props: Props): ReactElement {
  const value = useContext(AppContext);
  const { parseMarkdown } = value;
  const { image, heading, headingColor, lead, leadColor, ctaButtonLabel, ctaButtonLabelColor, ctaButtonUrl, ctaButtonColor } = props.slideData;

  function openPage() {
    if (ctaButtonUrl) window.open(ctaButtonUrl, ctaButtonUrl.indexOf('http') === 0 ? '_blank' : '_self');
  }
  return (
    <>
      <div className={' w-full overflow-hidden flex items-center justify-center bg-gray-400' + (props.heightClass ? props.heightClass : '')} style={{ backgroundImage: "url('" + image + "')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className={'flex-1 flex flex-col justify-center text-center ' + (props.heightClass ? props.heightClass : '')}>
          <h2 className={'font-YanoneKaffeesatz text-6xl md:text-8xl lg:text-9xl text-gray-200 tracking-wider font-bold mt-12 drop-shadow-md ' + (headingColor ? '' : 'text-gray-200 font-serif')} style={headingColor ? { color: headingColor } : {}} dangerouslySetInnerHTML={{ __html: parseMarkdown(heading) || '' }}></h2>
          <h3 className={'text-4xl md:text-5xl xl:text-5xl text-gray-200 tracking-wider font-bold font-marcellus mt-12 drop-shadow-xl ' + (leadColor ? '' : 'text-gray-200 font-serif')} style={leadColor ? { color: leadColor } : {}} dangerouslySetInnerHTML={{ __html: parseMarkdown(lead) || '' }}></h3>
        </div>
      </div>
    </>
  );
}

export default HeadingLeadCentered;
