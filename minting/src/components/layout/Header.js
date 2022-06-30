import React, { useState, useRef, useEffect } from 'react';
import ConnectButton from '../ConnectButton';
import logoImg from '../../assets/images/logo.png';

import "../../assets/scss/style.css";
import "../../assets/scss/slick.css";

const Header = () => {

  return (
    <div className="header">
      <div className="container">
        <div className="header__nav">
          <a href="index.html" className="header__nav-logo"><img
              src={logoImg}
              alt=""/></a>
          <div className="burger">
            <a href="#"><span></span></a>
          </div>
        </div>
        <ul className="header__menu">
          <li><a href="#about" rel="m_PageScroll2id">About</a></li>
          <li><a href="#portal" rel="m_PageScroll2id">Minting Portal</a></li>
          <li><a href="#arts" rel="m_PageScroll2id">Showcase</a></li>
          <li><a href="index.html" className="header__logo"><img
                src={logoImg}
                alt=""/></a></li>
          <li><a href="#news" rel="m_PageScroll2id">News</a></li>
          
          <li><a href="roadmap.html">Roadmap</a></li>
          <li><a href="https://286b3642-aa7e-4cc2-baa8-51668aa2b4c6.filesusr.com/ugd/3f99ea_8338986cc5dd45a59609819ef7ee006b.pdf">Whitepaper</a></li>
          <li><ConnectButton></ConnectButton></li>
        </ul>
      </div>
    </div>
  );

  
}

export default Header;
