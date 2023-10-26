import React from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { RightArrow } from '../../assets/images/icons/RightArrow';

const CheckoutBreadCrumbs = () => {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        <li className='inline-flex items-center'>
          <Link href='/' className='inline-flex items-center font-medium text-gray-700 hover:text-orange-400'>
            <FontAwesomeIcon className='w-4 h-3 mr-3' icon={faHome} size='sm' />
            Home
          </Link>
        </li>
        <li>
          <div className='flex items-center'>
            <RightArrow />
            <Link href='/cart' className='ml-1 font-medium text-gray-700 hover:text-orange-400 md:ml-2'>
              Cart
            </Link>
          </div>
        </li>
        <li>
          <div className='flex items-center'>
            <RightArrow />
            <Link href='/finalizar-compra' className='ml-1 font-medium text-gray-700 hover:text-orange-400 md:ml-2'>
              Checkout
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default CheckoutBreadCrumbs;
