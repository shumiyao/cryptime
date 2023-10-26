import React, { ReactElement, PropsWithChildren, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface Props {
  imageUrl?: string;
  title?: string;
}

export default function BlogHero(props: PropsWithChildren<Props>): ReactElement {
  const router = useRouter();
  const [heroHasLoaded, setHeroHasLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const { t } = useTranslation('lp-digital-marketing');
  useEffect(() => {
    const exitingFunction = () => {
      setHeroHasLoaded(false);
      setImageUrl('');
    };
    router.events.on('routeChangeStart', exitingFunction);
    setImageUrl(props.imageUrl);
    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };
  }, [router, setHeroHasLoaded, props, setImageUrl]);

  const doFadeIn = () => {
    setHeroHasLoaded(true);
  };
  return (
    <>
      <header className='relative'>
        <div className='absolute inset-x-0 bottom-0 h-1/2 ' />
        <div className='mx-auto'>
          <div className='relative shadow-xl sm:overflow-hidden'>
            <div className='absolute inset-0'>
              {imageUrl && <Image priority fill onLoadingComplete={doFadeIn} className={`${heroHasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 h-full w-full object-cover`} src={imageUrl} alt={props.title} />}
              <div className='absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-40 mix-blend-multiply' />
            </div>
            <div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8'>
              <h1 className='mt-1 text-center font-bold uppercase text-gray-900 text-4xl sm:text-5xl sm:tracking-tight lg:text-7xl'>
                <span className='block text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{props.title}</span>
              </h1>

              <div className='mx-auto mt-10 max-w-xs flex  justify-center'>
                <button className='flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-400 drop-shadow-xl sm:px-8'>{t('Hire us now')}</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
