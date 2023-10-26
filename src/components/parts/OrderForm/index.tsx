import { useState, useContext, useEffect, ReactElement } from 'react';
import AppContext from '@/lib/AppContext';
import FormSection from './FormSection';
import OrderSummary from './OrderSummary';
import Link from 'next/link';

import CheckoutBreadCrumbs from '../CheckoutBreadCrumbs';
import NoItemsInCart from '../../parts/NoItemsInCart';

const OrderForm = (): ReactElement => {
  const value = useContext(AppContext);
  const { state } = value;

  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [processState, setProcessState] = useState(false);
  const [localProcessState, setLocalProcessState] = useState(false);

  useEffect(() => {
    const currentSubTotal = state.cart.reduce((a, c) => a + c.price, 0);
    const currentVatAmount = Number((currentSubTotal * 0.23).toFixed(2));
    const currentShippingCost = currentSubTotal < 30 ? 7 : 0;
    setSubTotalAmount(currentSubTotal);
    setVatAmount(currentVatAmount);
    setShippingCost(currentShippingCost);
    setTotalAmount(Number((currentSubTotal + currentVatAmount + currentShippingCost).toFixed(2)));
    setLocalProcessState(processState);
  }, [setSubTotalAmount, setVatAmount, setShippingCost, state.cart, processState, setLocalProcessState]);

  return (
    <>
      <div className='min-w-screen py-5'>
        <div className='px-5'>
          <div className='mb-2'>
            <h1 className='text-3xl md:text-5xl font-bold text-gray-600'>Checkout.</h1>
          </div>
          {!localProcessState && (
            <div className='mb-5 text-gray-400'>
              <CheckoutBreadCrumbs />
            </div>
          )}
        </div>
        <div className='w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800'>
          <div className='w-full'>
            <div className='-mx-3 md:flex items-start'>
              {state.cart.length > 0 ? (
                <>
                  <OrderSummary subTotalAmount={subTotalAmount} shippingCost={shippingCost} vatAmount={vatAmount} totalAmount={totalAmount} processState={processState} />
                  <FormSection subTotalAmount={subTotalAmount} shippingCost={shippingCost} vatAmount={vatAmount} totalAmount={totalAmount} processState={processState} setProcessState={setProcessState} />
                </>
              ) : (
                <NoItemsInCart />
              )}
            </div>
          </div>
        </div>
        <div className='mt-5 text-center text-sm'>
          Having difficulty in finalizing your order? Use{' '}
          <Link className='underline hover:text-orange-500' href='#'>
            this form
          </Link>{' '}
          to order instead.
        </div>
      </div>
    </>
  );
};

export default OrderForm;
