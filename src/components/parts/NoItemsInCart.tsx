import React, { ReactElement, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function NoItemsInCart(): ReactElement {
  return (
    <>
      <div>
        <div className='m-12'>
          <Image src='/site-images/services/empty-cart-svgrepo-com.svg' alt='' width='100' height='100' className='mx-auto' />
        </div>
        No service items in cart. Please add services you like to purchase at{' '}
        <Link href='/design-shop' className='underline'>
          our Design Shop.
        </Link>
      </div>
    </>
  );
}

export default NoItemsInCart;
