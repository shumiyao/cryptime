import { PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NavbarHeader from '@/components/Navbar';
import Cookie from '@/components/Cookie';
import menuItems from '@/lib/navmenu-items';
import Footer from '@/components/Footer';

// workaround for hydration error https://stackoverflow.com/a/66374800
// const Footer = dynamic(() => import('../Footer'), { ssr: false });

interface Props {
  className?: string;
}

const Layout = (props: PropsWithChildren<Props>) => {
  return (
    <>
      <div className={'font-marcellus text-gray-600 flex flex-col min-h-screen overflow-hidden ' + props.className || ''}>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <header>
          <NavbarHeader menuItems={menuItems} />
        </header>
        <main>{props.children}</main>
        <Footer />
      </div>
      <Cookie />
    </>
  );
};

export default Layout;
