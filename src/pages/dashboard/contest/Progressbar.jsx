import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ percentage, text, underText }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className=' 
      w-[30px] sm:w-[50px] md:w-[80px] lg:w-[100px] 
      h-[30px] sm:h-[50px] md:h-[80px] lg:h-[100px] '>
        <CircularProgressbar
          value={percentage}
          text={text}
          strokeWidth={6}
          styles={{
            root: {},
            path: {
              stroke: `rgba(186, 94, 239, ${percentage / 100})`,
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 0.5s ease 0s',
            },
            text: {
              fill: 'white',
              fontSize: '30px',
              fontWeight: 'bold',
            },
            trail: {
              stroke: 'white',
              strokeWidth: 1,
            },
          }}
        />
      </div>
      <div className='
      mt-1 sm:mt-2 md:mt-4 lg:mt-5 
      text-[10px] sm:text-[13px] md:text-[16px] lg:text-xl
      text-white'>{underText}</div>
    </div>
  );
};

export default CircularProgressBar;
