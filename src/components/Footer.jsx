import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-200 py-4'>
      <div className='max-w-7xl mx-auto px-4'>
        <p className='text-center text-gray-600'>&copy; {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
