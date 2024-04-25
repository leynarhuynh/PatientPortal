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
      {/* <ul className='flex justify-around items-center flex-1 mr-10'>
        <li className='p-4 font-bold flex flex-col items-center'>
          <Link to='/Patients'><SlPeople size={30} /></Link>
          <Link to='/Patients'>Patients</Link>
        </li>
        <li className='p-4 font-bold flex flex-col items-center'>
          <Link to='/Chat'><IoChatbubbleEllipsesOutline size={30}/></Link>
          <Link to='/Chat'>Chat</Link>
        </li>
        <li className='p-4 font-bold flex flex-col items-center'>
          <Link to='/About'><SlInfo size={30} /></Link>
          <Link to='/About'>About</Link>
        </li>
      </ul> */}
    </div>
  );
};

export default Navbar;
