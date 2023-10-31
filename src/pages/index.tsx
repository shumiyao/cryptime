import Layout from '@/components/layouts/Default';
import Cryptimer from '@/components/sections/Cryptimer';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const IndexPage = () => {
  return (
    <Layout>
      {/* <Hero />
      <NewsHighlight />
      <OurMission />
      <OurValue />
      <Members /> */}
      <Cryptimer />
      {/* <Timeline/>
    <Newsletter /> */}
    </Layout>
  );
};

export default IndexPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common','home','messages'])),
      // Will be passed to the page component as props
    },
  };
}
