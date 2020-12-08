import React from 'react';
import './style.css';

function Btn({ children, onClick }) {
  return (
    <div className='default-btn' onClick={onClick}>
      {children}
    </div>
  );
}

export default Btn;
