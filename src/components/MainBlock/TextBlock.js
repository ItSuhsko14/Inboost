import React from 'react';
import './style.css';



const TextBlock = ({text, onChange}) => {

  
  
  
  return (

    <textarea
        type="text"
        className='text-block'
        value={text}
        onChange={ (e) => onChange(e) }
    />
  );
}

export default TextBlock;