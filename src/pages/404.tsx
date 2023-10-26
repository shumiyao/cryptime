import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layouts/Default';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
//
export default function FourOhFour() {
  const { t } = useTranslation('common');
  return (
    <>
      <Layout>
        <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center'>
            <div className='flex justify-center items-center pt-12'>
              <Image className='w-64' src='/img/cat-in-a-box.png' alt='cat in a box' width={350} height={432} />
            </div>
            <p className='text-base font-semibold text-indigo-600'>404</p>
            <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>{t('404-title')}</h1>
            <p className='mt-6 text-base leading-7 text-gray-600'>{t('404-message')}</p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link href='/' className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                {t('404-button-label')}
              </Link>
              {/* <Link href='/' className='text-sm font-semibold text-gray-900'>
              Contact support <span aria-hidden='true'>&rarr;</span>
            </Link> */}
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
