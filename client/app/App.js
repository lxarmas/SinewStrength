import React from 'react';
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import Footer from '../features/footer/Footer';
import './App.css'

const App = () => {
  return (
      <div>
         <Navbar />
         <AppRoutes />
         <Footer/>
      </div>
   );
};

export default App;
