import { Fragment, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';

import { useTranslation } from 'next-i18next';
import { NavbarLinkBase } from '@/lib/schema';
interface Props {
  menuItems?: NavbarLinkBase[];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function LaunguageSwitcher(props: PropsWithChildren<Props>) {
  const router = useRouter();
  const { i18n } = useTranslation();
  const locales = i18n.store.options['locales'];
  const currentLocale = i18n.language;
  const { menuItems } = props;
  function switchLanguage(targetLocale) {
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      null,
      { locale: targetLocale }
    );
  }
  return (
    <Menu as='div' className='relative ml-3'>
      <div>
        <Menu.Button className='relative flex rounded-lg p-2 bg-gray-10 text-sm focus:outline-none  hover:bg-gray-100 hover:text-gray-500 uppercase'>
          <span className='absolute -inset-1.5' />
          <span className='sr-only'>Change Language</span>
          {currentLocale}
        </Menu.Button>
      </div>
      <Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
        {locales && (
          <Menu.Items className='absolute right-0 z-10 mt-2 w-13 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none'>
            {locales
              .filter((e) => e !== 'default')
              .map((f) => (
                <Menu.Item key={'menu-' + f}>
                  <div className={classNames(currentLocale == f ? 'bg-gray-100 cursor-default' : 'cursor-pointer', 'block px-4 py-2 text-sm text-gray-700 uppercase hover:bg-gray-50 hover:text-gray-500')} data-locale={f} onClick={(g) => switchLanguage(g.currentTarget.getAttribute('data-locale'))}>
                    {f}
                  </div>
                </Menu.Item>
              ))}
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  );
}
