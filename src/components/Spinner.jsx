import React from 'react';

import '../assets/components/Spinner.css';

const Spinner = () => {
  return (
    <div className='text-center'>
      <div class='lds-grid'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
