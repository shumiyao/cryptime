import React, { ReactElement, useState } from 'react';
import Image from 'next/image';

interface Props {
  label?: string;
  title?: string;
  bodyText?: string;
  icon?: ReactElement;
}

function ToolTip(props: Props): ReactElement {
  const [toolTipOpen, setToolTipState] = useState(false);
  function showTooltip(state) {
    setToolTipState(state);
  }
  return (
    <>
      {props.label && <span className='mr-2'>{props.label}</span>}
      <a role='link' aria-label='tooltip' className='focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-2 focus:ring-2 focus:bg-gray-200 relative ' onMouseEnter={() => showTooltip(true)} onMouseLeave={() => showTooltip(false)}>
        <span className=' cursor-pointer'>{props.icon ? props.icon : <i className='ml-2 fa-regular fa-circle-question'></i>}</span>
        <div role='tooltip' className={'z-20 -mt-20 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg bg-white p-4 rounded' + (toolTipOpen ? '' : ' hidden')}>
          <p className='text-sm font-bold text-gray-800 pb-1'>{props.title}</p>
          <p className='text-xs leading-4 text-gray-600 pb-3'>{props.bodyText}</p>
        </div>
      </a>
    </>
  );
}

export default ToolTip;
