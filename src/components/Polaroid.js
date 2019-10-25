import React from 'react';

export const Polaroid = ({ src, title }) => {
  return (
    <div className="polaroid">
      <img src={src} alt="" className="polaroid-image" />
      <p className="polaroid-title">{title}</p>
    </div>
  );
};
