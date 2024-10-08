import React from 'react';
import Logo from '../assets/Logo.png';

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  e.currentTarget.src = Logo;
};
