import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import UfLogo from '../images/uflogo.png';

const NavbarHome = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-32 max-width mx-auto px-4 text-[#12266C] bg-gradient-to-r from-blue-700 to-blue-100'>
      <img src={UfLogo} alt="Logo" className="h-11 w-auto mb-10" /> 
    </div>
  );
};

export default NavbarHome;
