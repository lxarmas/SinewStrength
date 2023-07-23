import React from 'react';
import logo from '../../assets/MyLogo.png'
import logoText from '../../assets/TextBlackLogo.png'
import './AppHeader.css';

const AppHeader = () => {
   return (
      <header className="app-header">
         <div className="AHlogo-container">
            <img src={logo} alt='logo' className="AHlogo" />
         </div>
          <div className="AHlogo-container">
            <img src={logoText} alt='logo' className="AHlogo" />
         </div>
     
      </header>
   );
};

export default AppHeader;