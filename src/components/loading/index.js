import React from 'react';

import { css } from '@emotion/core';
import ClockLoader from 'react-spinners/ClockLoader';

import './style.css';

function Loading(props) {
  return (
    <div className='container-loading'>
      <ClockLoader size={150} color={'#3d405b'} loading={true} />
    </div>
  );
}

export default Loading;
