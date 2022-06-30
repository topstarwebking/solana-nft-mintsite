import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../assets/scss/layout.scss';

const LayoutDefault = ({ children }) => (
  <div className="page-layout">
    <div className="header-wrapper">
      <Header navPosition="right" className="reveal-from-bottom" />
    </div>
    <div className="content-wrapper">
      <main className="site-content" >
        {children}
      </main>
    </div>
    <div className="footer-wrapper">
      <Footer />
    </div>
  </div>
);

export default LayoutDefault;  