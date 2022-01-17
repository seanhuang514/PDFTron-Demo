import React from 'react'
import Button from '../Button'
import './Preview.css'

const Preview = ({signature, handleChange}) => {
  return (
    <div className="previewOverlay">
      <div className="previewContainer">
        <div>Your Signature has been saved as below</div>

        <div className="signatureContainer">
          <img src={signature} />
        </div>

        <div className="buttonContainer">
          <Button onClick={handleChange}>Edit</Button>
        </div>
      </div>
    </div>
  )

}

export default Preview;