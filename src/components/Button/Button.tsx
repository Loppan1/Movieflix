import React from 'react';
import './Button.css';
import { useNavigate } from 'react-router';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
};

function Button({ children, onClick, to }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <button className='button-universal' onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
