import React, { ReactElement, useContext } from 'react';
import Image from 'next/image';
import AppContext from '../../../lib/AppContext';
import { NestedSlide } from '../../../lib/schema';

interface Props {
  key: string;
  slideData: NestedSlide;
  heightClass?: string;
}

function Hero(props: Props): ReactElement {
  const value = useContext(AppContext);
  const { parseMarkdown } = value;
  const { image, heading, headingColor, lead, leadColor, ctaButtonLabel, ctaButtonLabelColor, ctaButtonUrl, ctaButtonColor, readMoreLabel, readMoreUrl, learnMoreUrl } = props.slideData;

  function openPage() {
    if (ctaButtonUrl) window.open(ctaButtonUrl, ctaButtonUrl.indexOf('http') === 0 ? '_blank' : '_self');
  }
  return (
    <>
      <div className='bg-white'>
        <div className='mx-auto md:mx-5 lg:mx-auto max-w-7xl py-0 sm:pt-2 sm:pb-16 sm:py-4 lg:px-8'>
          <div className='relative isolate overflow-hidden bg-pink-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-8 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0'>
            <svg viewBox='0 0 1024 1024' className='absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0' aria-hidden='true'>
              <circle cx={512} cy={512} r={512} fill='url(#759c1415-0410-454c-8f7c-9a820de03641)' fillOpacity='0.7' />
              <defs>
                <radialGradient id='759c1415-0410-454c-8f7c-9a820de03641'>
                  <stop stopColor='#C9E3F7' />
                  <stop offset={1} stopColor='#C9E3F7' />
                </radialGradient>
              </defs>
            </svg>
            <div className='mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left'>
              {heading && <h2 className={'text-3xl font-bold tracking-tight text-white sm:text-4xl' + (headingColor ? '' : 'text-gray-200 font-serif')} style={headingColor ? { color: headingColor } : {}} dangerouslySetInnerHTML={{ __html: parseMarkdown(heading) || '' }}></h2>}
              {lead && <div className={'mt-6 text-lg leading-8 ' + (leadColor ? '' : 'text-gray-300 font-serif')} style={leadColor ? { color: leadColor } : {}} dangerouslySetInnerHTML={{ __html: parseMarkdown(lead) || '' }}></div>}
              <div className='mt-10 flex items-center justify-center gap-x-6 lg:justify-start'>
                <button className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 drop-shadow-xl ' style={ctaButtonColor ? { backgroundColor: ctaButtonColor } : {}} onClick={openPage}>
                  {ctaButtonLabel}
                </button>
                {learnMoreUrl && (
                  <a href={learnMoreUrl} className='text-sm font-semibold leading-6 text-gray-100'>
                    Learn more <span aria-hidden='true'>→</span>
                  </a>
                )}
              </div>
            </div>
            <div className='relative mt-16 h-80 md:h-136 lg:mt-8'>
              <Image className='sm:absolute left-0 top-0 md:w-[57rem] lg:max-w-none rounded-md bg-white/5 ring-1 ring-white/10' src={image} alt={heading.raw} width={1824} height={1080} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
