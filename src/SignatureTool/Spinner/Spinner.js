import React from 'react';
import './Spinner.css'

const Spinner = ({ height = '50px', width = '50px' }) => {

    const spinnerStyle = {
        height,
        width,
    }

    return(
      <div className='overlay'>
        <div className='spinner' style={spinnerStyle}></div>
      </div>
    )
}

export default Spinner;