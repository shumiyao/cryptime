import React, { ReactElement, useEffect } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { RightArrow } from '../../assets/images/icons/RightArrow';

import { Category } from '../../lib/schema';

interface Props {
  category?: Category;
  subCategory?: Category;
  title?: string;
}

const CategoryBreadCrumbs = (props: Props): ReactElement => {
  const category = props.category || undefined;
  const subCategory = props.subCategory || undefined;

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
            <Link href='/design-shop' className='ml-1 font-medium text-gray-700 hover:text-orange-400 md:ml-2'>
              Design Shop
            </Link>
          </div>
        </li>
        {category && category.slug && (
          <>
            <li>
              <div className='flex items-center'>
                <RightArrow />
                <Link href={'/design-shop?categoria=' + category.slug} className='ml-1 font-medium text-gray-700 hover:text-orange-400 md:ml-2'>
                  {category.name}
                </Link>
              </div>
            </li>
          </>
        )}
        {subCategory ? (
          <>
            <li>
              <div className='flex items-center'>
                <RightArrow />
                <Link href={'/design-shop?categoria=' + category.slug + '&subcategoria=' + subCategory.slug} className='ml-1 font-medium text-gray-700 hover:text-orange-400 md:ml-2 '>
                  {subCategory.name}
                </Link>
              </div>
            </li>
          </>
        ) : null}
        {props.title && (
          <li aria-current='page'>
            <div className='flex items-center'>
              <RightArrow />
              <span className='ml-1 font-medium text-gray-500 md:ml-2 dark:text-gray-400'>{props.title}</span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default CategoryBreadCrumbs;
