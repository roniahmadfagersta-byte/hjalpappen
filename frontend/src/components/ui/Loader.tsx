import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', fullPage = false }) => {
  return (
    <div className={`loader-container ${fullPage ? 'loader-fullpage' : ''}`}>
      <div className={`loader-spinner spinner-${size}`}></div>
    </div>
  );
};

export default Loader;
