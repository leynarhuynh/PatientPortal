import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { SlPeople, SlMessageCircle, SlInfo } from 'react-icons/sl';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='fixed left-0 top-0 w-[160px] bg-[#353D53] text-white flex flex-col justify-between h-full'>
      <div className='flex flex-col items-center'>
        <div className='mb-10 text-2xl font-bold p-4 items-center'>PatientPortal</div>
        <ul className='flex flex-col items-center'>
          <li className='mb-10 p-4 font-bold flex flex-col items-center'>
            <Link to='/Patients'><SlPeople size={50} /> </Link>
            <Link to='/Patients'>Patients</Link>
          </li>
          <li className='mb-10 p-4 font-bold flex flex-col items-center'>
          <Link to='/Chat'><IoChatbubbleEllipsesOutline size={50}/></Link>
            <Link to='/Chat'>Chat</Link>
          </li>
          <li className='mb-10 p-4 font-bold flex flex-col items-center'>
          <Link to='/About'><SlInfo size={50} /></Link>
            <Link to='/About'>About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
