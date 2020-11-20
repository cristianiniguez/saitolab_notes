import React from 'react';

import Header from './Header';
import Footer from './Footer';

import '../assets/components/Layout.css';

const Layout = ({ children }) => {
  return (
    <div id='layout'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
