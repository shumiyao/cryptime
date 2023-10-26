import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import Link from 'next/link';
import LaunguageSwitcher from '@/components/LaunguageSwitcher';
function Cookie(): ReactElement {
  const [cookieConsent, setCookieConsent] = useState('');
  const { t } = useTranslation('common');

  useEffect(() => {
    setCookieConsent((getCookieConsentValue() as string) || '');
  }, [setCookieConsent]);

  return (
    <>
      {cookieConsent === '' && (
        <CookieConsent buttonId='accept-button' enableDeclineButton declineButtonId='decline-button' onAccept={() => window.location.reload()} disableStyles={true} contentClasses=''>
          <div id='menu' className='w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0'>
            <div className='2xl:container  2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center'>
              <div className='w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36'>
                <div role='banner'></div>
                <div className='mt-12'>
                  <h1 role='main' className='text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800'>
                    {t('cookie-title')}
                  </h1>
                </div>
                <div className='mt'>
                  <p className='mt-6 text-base dark:text-white leading-7 text-center text-gray-800'>{t('cookie-message')}</p>
                </div>
                <button
                  className='w-full dark:text-gray-800 dark:hover:bg-gray-100 dark:bg-white sm:w-auto mt-14 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-black'
                  onClick={() => {
                    const elm = document.getElementById('accept-button');
                    if (elm) elm.click();
                  }}
                >
                  {t('cookie-accept')}
                </button>
                <a
                  href=''
                  className='mt-6 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800'
                  onClick={() => {
                    const elm = document.getElementById('decline-button');
                    if (elm) elm.click();
                  }}
                >
                  {t('cookie-reject')}
                </a>
                {/* <Link
                  href='/politica-de-privacidade'
                  className='mt-6 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800'
                  onClick={() => {
                    const elm = document.getElementById('decline-button');
                    if (elm) elm.click();
                  }}
                >
                  {t('privacy-policy')}
                </Link> */}
                <div className='text-gray-800 dark:text-gray-400 absolute top-8 left-8 focus:outline-none'>
                  <LaunguageSwitcher />
                </div>
                <button
                  className='text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'
                  aria-label='close'
                  onClick={() => {
                    const elm = document.getElementById('decline-button');
                    if (elm) elm.click();
                  }}
                >
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M18 6L6 18' stroke='currentColor' strokeWidth='1.66667' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M6 6L18 18' stroke='currentColor' strokeWidth='1.66667' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </CookieConsent>
      )}
      {cookieConsent === 'false' && (
        <>
          <CookieConsent visible={'show'} onAccept={() => window.location.reload()} buttonText={t('cookie-accept')}>
            <div>{t('cookie-message')}</div>
          </CookieConsent>
        </>
      )}
    </>
  );
}

export default Cookie;
