import { useState, useContext, useEffect, ReactElement, Dispatch, SetStateAction } from 'react';
import AppContext from '@/lib/AppContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const fieldNames = ['name', 'emailAddress', 'mobilePhoneNumber', 'nif', 'noteToSeller'];
const textareaNames = ['shippingAddress', 'billingAddress'];
const allFormFields = [...fieldNames, ...textareaNames];

const formValidationErrors = {
  invalidEmail: 'This is not a valid email address',
  required: 'This field is required.',
};

interface Props {
  subTotalAmount: number;
  shippingCost: number;
  vatAmount: number;
  totalAmount: number;
  setProcessState: Dispatch<SetStateAction<boolean>>;
  processState: boolean;
}

const FormSection = (props: Props): ReactElement => {
  const value = useContext(AppContext);
  const { state, initCart } = value;
  const { subTotalAmount, shippingCost, vatAmount, totalAmount, setProcessState, processState } = props;

  const router = useRouter();

  const [consentPrivacy, setConsentPrivacy] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [formInvalid, setFormInvalid] = useState(false);

  const [localProcessState, setLocalProcessState] = useState(false);
  useEffect(() => {
    setLocalProcessState(processState);
  }, [setLocalProcessState, processState]);

  function validateForm(e) {
    const validateEmail = (email: string) => {
      return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    allFormFields.forEach((e: string) => {
      const fieldElm = document.getElementById(e) as HTMLInputElement | HTMLTextAreaElement;
      const messageElm = document.getElementById('error-' + e);

      const isRequired = fieldElm.required || false;
      if (isRequired && !fieldElm.value) {
        messageElm.innerText = formValidationErrors.required;
        setFormInvalid(false);
      } else {
        messageElm.innerText = '';
        setFormInvalid(true);
      }
      if (e === 'emailAddress' && fieldElm.value !== '' && !validateEmail(fieldElm.value)) {
        messageElm.innerText = formValidationErrors.invalidEmail;
        setFormInvalid(false);
      } else if (e === 'emailAddress' && fieldElm.value === '') {
        messageElm.innerText = formValidationErrors.required;
        setFormInvalid(false);
      } else if (e === 'emailAddress') {
        messageElm.innerText = '';
        setFormInvalid(true);
      }
    });
  }

  function handleConsentPrivacy() {
    setConsentPrivacy(!consentPrivacy);
  }

  async function handleSendOrder() {
    setProcessState(true);
    setErrorMessage('');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const data = {
      ...fieldNames.reduce((a, c) => {
        const fieldElm: HTMLInputElement = document.getElementById(c) as HTMLInputElement;
        if (fieldElm) {
          return { ...a, [c]: fieldElm.value };
        }
      }, {}),
      ...textareaNames.reduce((a, c) => {
        const textareaElm: HTMLTextAreaElement = document.getElementById(c) as HTMLTextAreaElement;
        if (textareaElm) {
          return { ...a, [c]: textareaElm.value };
        }
      }, {}),
    };
    // build order
    let order = state.cart.map((e) => `${e.title}, ${e.selectedOption ? 'Option: ' + e.selectedOption + ',' : ''} Price: ${String(e.price)} €`).join('\n') as string;
    order = order + `\n\nSubtotal: ${subTotalAmount} €\nVAT: ${vatAmount} €\nShipping: ${shippingCost} €\nTotal: ${totalAmount} €`;

    const response = await axios.post(
      '/api/send-order',
      {
        data: { ...data, order },
      },
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'api-secret': process.env.NEXT_PUBLIC_SEND_ORDER_SECRET,
        },
      }
    );
    if (response.data.result) {
      // go to thank you page
      initCart();
      router.push('/obrigada');
    } else if (response.data.validationError) {
      const { validationError } = response.data;
      setErrorMessage(response.data.message);
      setProcessState(false);
    } else {
      setErrorMessage(response.data.message);
      setProcessState(false);
    }
  }

  return (
    <>
      {localProcessState ? (
        <>
          <div className='px-3 w-full'>
            <div className='h-auto w-full mx-auto rounded-lg bg-white text-gray-800 font-light mb-6 '>
              <div className=' w-full p-3 border-b border-gray-200 h-96'>
                <div className='flex items-center justify-center w-full h-full'>
                  <div className='flex justify-center items-center space-x-1 text-lg text-gray-700'>
                    <svg fill='none' className='w-10 h-10 animate-spin' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                      <path clipRule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fillRule='evenodd' />
                    </svg>

                    <div>Processing your order ...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='px-3 md:w-5/12'>
          <div className='w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6'>
            <div className='w-full p-3 border-b border-gray-200'>
              <div>
                <div className='mb-3'>
                  <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>Name *</label>
                  <div>
                    <input id='name' className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors' placeholder='John Smith' type='text' required onChange={validateForm} />
                    <div id='error-name' className='text-sm ml-3 mt-1 text-red-500'></div>
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>Email Address *</label>
                  <div>
                    <input id='emailAddress' className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors' placeholder='' type='text' required onChange={validateForm} />
                    <div id='error-emailAddress' className='text-sm ml-3 mt-1 text-red-500'></div>
                  </div>
                </div>

                <div className='mb-3'>
                  <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>Mobile Phone Number *</label>
                  <div>
                    <input id='mobilePhoneNumber' className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors' placeholder='' type='text' required onChange={validateForm} />
                    <div id='error-mobilePhoneNumber' className='text-sm ml-3 mt-1 text-red-500'></div>
                  </div>
                </div>

                <div className='mb-3'>
                  <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>NIF</label>
                  <div>
                    <input id='nif' className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors' placeholder='' type='text' onChange={validateForm} />
                    <div id='error-nif' className='text-sm ml-3 mt-1 text-red-500'></div>
                  </div>
                </div>

                <div className='mb-3'>
                  <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>Shipping Address *</label>
                  <div>
                    <textarea id='shippingAddress' className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors' required onChange={validateForm}></textarea>
                    <div id='error-shippingAddress' className='text-sm ml-3 mt-1 text-red-500'></div>
                  </div>
                </div>

                <div className='mb-3'>
                  <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>Billing Address</label>
                  <div>
                    <textarea id='billingAddress' className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors' onChange={validateForm}></textarea>
                    <div id='error-billingAddress' className='text-sm ml-3 mt-1 text-red-500'></div>
                  </div>
                </div>

                <div className='mb-3'>
                  <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>Note to Seller</label>
                  <div>
                    <input id='noteToSeller' className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors' placeholder='' type='text' onChange={validateForm} />
                    <div id='error-noteToSeller' className='text-sm ml-3 mt-1 text-red-500'></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full p-3'>
              <label htmlFor='privacy' className='flex items-center cursor-pointer'>
                <input type='checkbox' className='form-radio h-5 w-5 text-indigo-500' name='type' id='privacy' onChange={handleConsentPrivacy} />
                <span className={'ml-5 text-sm ' + (!consentPrivacy ? 'text-red-500' : '')}>I have read and consent terms and condition as well as privacy policy.</span>
              </label>
            </div>
          </div>
          <div>
            <button className={'block w-full max-w-xs mx-auto  text-white rounded-lg px-3 py-2 font-semibold ' + (!consentPrivacy || !formInvalid ? 'bg-red-300' : 'bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700')} onClick={handleSendOrder} disabled={!formInvalid || !consentPrivacy}>
              {!consentPrivacy ? <>Please agree with terms.</> : !formInvalid ? <>Please verify the form.</> : <>Order NOW</>}
            </button>
            {errorMessage && (
              <div id='error-message' className='mt-5 text-red-500 text-sm'>
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FormSection;
