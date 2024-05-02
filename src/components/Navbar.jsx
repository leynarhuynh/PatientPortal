import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { SlPeople, SlMessageCircle, SlInfo } from 'react-icons/sl';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Logo from '../images/ufhealth.PNG';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='fixed top-0 left-0 w-full bg-[#353D53] text-white flex justify-between items-center h-[100px]'>
      <Link to='/'><img src={Logo} alt="Logo" className=' w-auto h-full max-h-[110px]'/></Link>
    </div>
  );
};

export default Navbar;
