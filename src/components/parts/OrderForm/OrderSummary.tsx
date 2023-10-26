import { useState, useContext, useEffect, ReactElement } from 'react';
import AppContext from '@/lib/AppContext';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  subTotalAmount: number;
  shippingCost: number;
  vatAmount: number;
  totalAmount: number;
  processState: boolean;
}

const OrderSummary = (props: Props): ReactElement => {
  const value = useContext(AppContext);
  const { state } = value;
  const { subTotalAmount, shippingCost, vatAmount, totalAmount, processState } = props;

  const [localProcessState, setLocalProcessState] = useState(false);
  useEffect(() => {
    setLocalProcessState(processState);
  }, [setLocalProcessState, processState]);
  return (
    <>
      {!localProcessState && (
        <div className='px-3 md:w-7/12 lg:pr-10'>
          {state.cart.map((e, idx) => {
            const addZeroes = (num) => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2);
            const zeroPaddedPrice = addZeroes(String(e.price)).split('.');
            return (
              <div className='w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6' key={'cart-item-' + idx}>
                <div className='w-full flex items-center'>
                  <div className='overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200'>
                    <Image alt={e.title} className={'h-full w-full object-cover object-center rounded'} width='0' height='0' sizes='100vw' src={e.additionalProductPhotos && e.additionalProductPhotos[0] ? e.additionalProductPhotos[0].imageSrc : '/placeholder-image.jpg'} placeholder='blur' blurDataURL='/placeholder-image.jpg' />
                  </div>

                  <div className='flex-grow pl-3'>
                    <h6 className='font-semibold uppercase text-gray-600'>
                      <Link className='hover:text-orange-500' href={'/services/' + e.slug}>
                        {e.title}
                      </Link>
                    </h6>
                    {e.selectedOption ? <p className='text-gray-400'>Option: {e.selectedOption}</p> : <p className='text-gray-400'>No options available</p>}
                  </div>
                  <div>
                    <span className='font-semibold text-gray-600 text-xl'>{zeroPaddedPrice[0]}</span>
                    <span className='font-semibold text-gray-600 text-sm'>.{zeroPaddedPrice[1]}</span> €
                  </div>
                </div>
              </div>
            );
          })}

          <div className='mb-6 pb-6 border-b border-gray-200 text-gray-800'>
            <div className='w-full flex mb-3 items-center'>
              <div className='flex-grow'>
                <span className='text-gray-600'>Subtotal</span>
              </div>
              <div className='pl-3'>
                <span className='font-semibold'>{subTotalAmount} €</span>
              </div>
            </div>
            <div className='w-full flex mb-3 items-center'>
              <div className='flex-grow'>
                <span className='text-gray-600'>Shipping</span>
              </div>
              <div className='pl-3'>
                <span className='font-semibold'>{shippingCost} €</span>
              </div>
            </div>
            <div className='w-full flex items-center'>
              <div className='flex-grow'>
                <span className='text-gray-600'>Taxes (IVA)</span>
              </div>
              <div className='pl-3'>
                <span className='font-semibold'>{vatAmount} €</span>
              </div>
            </div>
          </div>
          <div className='mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl'>
            <div className='w-full flex items-center'>
              <div className='flex-grow'>
                <span className='text-gray-600'>Total</span>
              </div>
              <div className='pl-3'>
                <span className='font-semibold text-gray-400 text-sm'></span> <span className='font-semibold'>{totalAmount} €</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
