import React from 'react';
import { useSelector } from 'react-redux';
import './Footer.css';


const Footer = (props) => {
   const username = useSelector((state) => state.auth.me.username);

   return (
      <div className="FTRcontainer">
         <div>
            <ul className="FTRlist">
               <li>Felix Soriano</li>
               <li>Chris Almodovar</li>
               <li>Alejandro Armas</li>
               <li>Gabriel Resendez</li>
            </ul>
         </div>
      </div>
   );
};

export default Footer;