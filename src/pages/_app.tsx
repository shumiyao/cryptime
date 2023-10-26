import '@/styles/globals.css';
import '@/styles/swiper.css';
import '@/styles/section.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import Script from 'next/script';
import { getCookieConsentValue } from 'react-cookie-consent';
import { appWithTranslation } from 'next-i18next';

import AppContext from '../lib/AppContext';
import { marked } from 'marked';

import { siteConfig } from 'contentlayer/generated';

const netlifyIdentity = require('netlify-identity-widget') as any;

// .env constants
const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const NEXT_PUBLIC_GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { asPath } = useRouter();

  const [categoryFilterOpen, setCategoryFilterOpen] = useState(true);
  const [subCategoryFilterOpen, setSubCategoryFilterOpen] = useState(true);
  const [cookieConsent, setCookieConsent] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [isProduction, setIsProduction] = useState(false);
  const [needNetlifyIdentityWidget, setNeedNetlifyIdentityWidget] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateFilterToggleState = (isRoot, isOpen) => {
    if (isRoot) {
      setCategoryFilterOpen(isOpen);
    } else {
      setSubCategoryFilterOpen(isOpen);
    }
  };

  useEffect(() => {
    setNeedNetlifyIdentityWidget(asPath.indexOf('/#') === 0 || asPath.indexOf('/admin') === 0);
    setIsAdmin(asPath.indexOf('/admin') === 0);
    if (isAdmin) {
      window.netlifyIdentity = netlifyIdentity;
    } else if (needNetlifyIdentityWidget) {
      window.netlifyIdentity = netlifyIdentity;
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    setCanonicalUrl(siteConfig.baseUrl + asPath.split('?')[0]);
    setCookieConsent((getCookieConsentValue() as string) || '');
    if (process.env.NODE_ENV === 'production') {
      setIsProduction(true);
    }
  }, [asPath, setCanonicalUrl, isAdmin, needNetlifyIdentityWidget]);

  function parseMarkdown(markdownObject): string {
    if (typeof markdownObject === 'object' && markdownObject.raw.search(/<|>/) !== -1) {
      return markdownObject.raw;
    } else if (typeof markdownObject === 'object' && markdownObject.html) {
      return markdownObject.html.replace(/\n/gm, '<br/>');
    } else if (typeof markdownObject === 'string') {
      return marked.parse(markdownObject);
    } else {
      return '';
    }
  }
  return (
    <>
      <DefaultSeo
        defaultTitle={siteConfig.siteTitle}
        description={siteConfig.siteDescription}
        openGraph={{
          type: 'website',
          title: siteConfig.siteTitle,
          description: siteConfig.siteDescription,
          site_name: siteConfig.siteTitle,
          url: '/',
          images: [
            {
              url: siteConfig.siteImage,
              width: 800,
              height: 600,
              alt: siteConfig.siteTitle,
              type: 'image/jpeg',
            },
          ],
        }}
        canonical={canonicalUrl}
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: '/favicon/favicon.ico',
            type: 'image/x-icon',
          },
        ]}
      />
      {isAdmin ? (
        <>
          <Component {...pageProps} />
        </>
      ) : (
        <AppContext.Provider
          value={{
            state: {
              categoryFilterOpen,
              subCategoryFilterOpen,
            },
            updateFilterToggleState,
            parseMarkdown,
          }}
        >
          {needNetlifyIdentityWidget === true && <Script src={`https://identity.netlify.com/v1/netlify-identity-widget.js`} />}
          {needNetlifyIdentityWidget === false && cookieConsent === 'true' && isProduction === true && (
            <>
              <Script strategy='afterInteractive' defer src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_ID}`} />
              <Script
                id='ga-init'
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${NEXT_PUBLIC_GA_ID}', {
            page_path: window.location.pathname,
            });
          `,
                }}
              />
              <Script id='google-tag-manager' strategy='afterInteractive'>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${NEXT_PUBLIC_GTM_ID}');`}</Script>
            </>
          )}

          <Component {...pageProps} />
        </AppContext.Provider>
      )}
    </>
  );
};
export default appWithTranslation(MyApp);
