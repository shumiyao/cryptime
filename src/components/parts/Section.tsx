import React, { ReactElement } from 'react';

interface Props {
  body: string;
  id: string;
  title?: string;
}

function Section(props: Props): ReactElement {
  return (
    <section className='section relative text-gray-500 mt-2 lg:mt-12 mb-16'>
      <div className='mx-auto max-w-4xl px-2 sm:px-6 lg:px-8 text-center'>
        <div className='container px-6 sm:px-0 mx-auto flex flex-wrap flex-col md:flex-row items-center'>
          <div className='mt-10 mx-auto lg:w-full'>
            <div className='bg-white  '>
              {props.title && <h4 className='text-4xl font-bold text-gray-800 tracking-widest uppercase text-center'>{props.title}</h4>}
              <div className='space-y-6 text-left text-lg' dangerouslySetInnerHTML={{ __html: props.body }}></div>
            </div>
          </div>{' '}
        </div>{' '}
      </div>
    </section>
  );
}

export default Section;
