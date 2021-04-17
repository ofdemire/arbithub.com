import React from 'react';
import './styles.scss';

const Button = ({ children, ...otherProps }) => {
  return (
    <button className="form_btn" {...otherProps}>
      {children}
    </button>
  );
}

export default Button