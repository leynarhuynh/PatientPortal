import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { SlPeople, SlMessageCircle, SlInfo } from 'react-icons/sl'; // Import other icons you need
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='fixed left-0 top-0 w-[250px] bg-[#353D53] text-white flex flex-col justify-between h-full'>
      <div className='flex flex-col items-center'>
        <div className='mb-10 text-3xl font-bold p-4 items-center'>PatientPortal</div>
        <ul className='flex flex-col items-center'>
          <li className='mb-10 p-4 font-bold flex flex-col items-center'>
            <SlPeople size={50} /> 
            <Link to='/Patients'>Patients</Link>
          </li>
          <li className='mb-10 p-4 font-bold flex flex-col items-center'>
            <IoChatbubbleEllipsesOutline size={50}/> 
            <Link to='/Chat'>Chat</Link>
          </li>
          <li className='mb-10 p-4 font-bold flex flex-col items-center'>
            <SlInfo size={50} />
            <Link to='/About'>About</Link>
          </li>
        </ul>
      </div>
      <div className='p-4' onClick={handleNav}>
        {nav ? <AiOutlineClose size={40} /> : <AiOutlineMenu size={20} />}
      </div>
    </div>
  );
};

export default Navbar;
