import { PropsWithChildren } from 'react';
import Link from 'next/link';
import ActiveLink from '@/components/parts/ActiveLink';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import LogoImage from '@/assets/images/ci/logo.png';
import { useTranslation } from 'next-i18next';
import { NavbarLinkBase } from '@/lib/schema';

import LaunguageSwitcher from '@/components/LaunguageSwitcher';
interface Props {
  menuItems?: NavbarLinkBase[];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example(props: PropsWithChildren<Props>) {
  const { menuItems } = props;
  const { t } = useTranslation('common');
  return (
    <Disclosure as='nav' className='bg-gray-10'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-20 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? <XMarkIcon className='block h-6 w-6' aria-hidden='true' /> : <Bars3Icon className='block h-6 w-6' aria-hidden='true' />}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <Link href='/'>
                    <Image src={LogoImage} alt='' width='200' height='56' className='h-8 w-auto' />
                  </Link>
                </div>
                <div className='hidden md:ml-8 sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {menuItems.map((item) => (
                      <ActiveLink className='text-gray-500 hover:bg-gray-100 hover:text-gray-500 rounded-md px-3 py-2 text-md font-medium' key={item.name} href={item.href} activeClassName='italic'>
                        {t(item.name)}
                      </ActiveLink>
                      // <a key={item.name} href={item.href} className={classNames(item.current ? 'underline ' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-500', 'rounded-md px-3 py-2 text-md font-medium')} aria-current={item.current ? 'page' : undefined}>
                      //   {item.name}
                      // </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* <button type='button' className='relative rounded-full bg-gray-10 p-1 text-gray-400 hover:text-white focus:outline-none '>
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button> */}

                {/* Language dropdown */}
                <LaunguageSwitcher />
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {menuItems.map((item) => (
                <Disclosure.Button key={item.name} as='a' href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
                  {t(item.name)}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
