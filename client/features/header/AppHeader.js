import React from 'react';
import logo from '../../assets/SinewStrengthAlbum/Logos/IMG_1909.PNG'
import './AppHeader.css';

const AppHeader = () => {
   return (
      <header className="app-header">
         <div className="AHlogo-container">
            <img src={logo} alt='logo' className="AHlogo" />
         </div>
         <h1 className="header-text">TRAINING</h1>
      </header>
   );
};

export default AppHeader;