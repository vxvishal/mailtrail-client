import React from 'react';
import './styles.css';
import Lottie from 'react-lottie-player';
import error404 from '../../assets/error404.json';

function Error404() {
  return (
    <div className='error-404'>
      <Lottie className='animation' play animationData={error404} />
    </div>
  )
}

export default Error404