import React from 'react';
import '../sass/Button.scss';

const Button = ({ text, onMoreMessages, type }) => {
  return (
    <div className={type} onClick={onMoreMessages}>
      {text}
    </div>
  )
};

export default Button;
