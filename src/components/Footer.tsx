import React, { ReactElement } from 'react';
function PageFooter(): ReactElement {
  return (
    <>
      <footer aria-label='Site Footer' className='mt-auto font-YanoneKaffeesatz'>
        <div className=' px-4 pb-5 mx-auto '>
          <div className='container px-3 mx-auto flex flex-wrap flex-col md:flex-row '>
            {/* <div className='flex flex-wrap text-left lg:text-left w-full'>
              <div className=' md:w-8/12 px-4 mb-8 lg:mb-0'>
                <div className='mt-12 space-y-5'>
                  <Image src={LogoImage} alt='' width='300' height='84' className='my-2' />
                </div>
              </div>
              <div className='w-full md:w-4/12 lg:px-4'>
                <div className='flex flex-wrap items-top lg:mb-6'>
                  <div className='w-full  px-4 ml-auto'>
                    <span className='block mb-6 uppercase text-blueGray-500 text-2xl border-solid border-b-2  font-semibold '>Contactos</span>
                    <ul className='list-unstyled '>
                      <li>
                        <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-5 text-md ' href='mailto:info@cuckooparrot.com'>
                          <i className=' fa-solid fa-envelope mr-2'></i> info@miyao-andrade.org
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='w-full'>
              <div className='w-full px-4 mx-auto text-center justify-self-end'>
                <div className='mt-6 text-blueGray-500 py-1 text-xl mx-auto'>
                  Copyright © <span>2023</span> Miyao-Andrade
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default PageFooter;
