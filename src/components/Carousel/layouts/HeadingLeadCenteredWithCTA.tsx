import React, { ReactElement, useContext } from 'react';
import AppContext from '../../../lib/AppContext';
import { NestedSlide } from '../../../lib/schema';

interface Props {
  key: string;
  slideData: NestedSlide;
  heightClass?: string;
}

function HeadingLeadCenteredWithCTA(props: Props): ReactElement {
  const value = useContext(AppContext);
  const { parseMarkdown } = value;
  const { image, heading, headingColor, lead, leadColor, ctaButtonLabel, ctaButtonLabelColor, ctaButtonUrl, ctaButtonColor, readMoreLabel, readMoreUrl, learnMoreUrl } = props.slideData;

  function openPage() {
    if (ctaButtonUrl) window.open(ctaButtonUrl, ctaButtonUrl.indexOf('http') === 0 ? '_blank' : '_self');
  }
  return (
    <>
      <div className={' w-full overflow-hidden flex items-center justify-center bg-gray-400' + (props.heightClass ? props.heightClass : '')} style={{ backgroundImage: "url('" + image + "')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className={'mx-auto max-w-3xl py-32 sm:py-48 lg:py-56 ' + (props.heightClass ? props.heightClass : '')}>
          {readMoreLabel && (
            <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
              <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-700 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-white'>
                {readMoreLabel}{' '}
                {readMoreUrl && (
                  <a href={readMoreUrl} className='font-semibold text-indigo-600'>
                    <span className='absolute inset-0' aria-hidden='true' />
                    Read more <span aria-hidden='true'>&rarr;</span>
                  </a>
                )}
              </div>
            </div>
          )}
          <div className='text-center'>
            {heading && <h1 className={'text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ' + (headingColor ? '' : 'text-gray-200 font-serif')} style={headingColor ? { color: headingColor } : {}} dangerouslySetInnerHTML={{ __html: parseMarkdown(heading) || '' }}></h1>}
            {lead && <div className={'mt-6 text-lg leading-8 text-gray-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ' + (leadColor ? '' : 'text-gray-200 font-serif')} style={leadColor ? { color: leadColor } : {}} dangerouslySetInnerHTML={{ __html: parseMarkdown(lead) || '' }}></div>}
            {ctaButtonLabel && (
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <button className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' style={ctaButtonColor ? { backgroundColor: ctaButtonColor } : {}} onClick={openPage}>
                  {ctaButtonLabel}
                </button>
                {learnMoreUrl && (
                  <a href={learnMoreUrl} className='text-sm font-semibold leading-6 text-gray-100'>
                    Learn more <span aria-hidden='true'>→</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadingLeadCenteredWithCTA;
