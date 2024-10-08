import React from 'react';

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  e.currentTarget.src = '/src/assets/Logo.png';
};
