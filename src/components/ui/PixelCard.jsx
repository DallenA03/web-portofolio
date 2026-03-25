import React from 'react';

const PixelCard = ({ children, className = "" }) => (
  <div className={`border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all bg-white p-6 ${className}`}>
    {children}
  </div>
);

export default PixelCard;
