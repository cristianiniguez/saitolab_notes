import React from 'react';

import '../assets/components/Spinner.css';

const Spinner = () => {
  return (
    <section className='text-center'>
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
    </section>
  );
};

export default Spinner;
