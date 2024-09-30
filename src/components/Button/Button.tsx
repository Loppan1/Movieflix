import React from 'react';
import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className='button-universal' onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
