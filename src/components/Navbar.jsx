import React, { useState } from 'react';
import Logo from '../images/patientportal.png'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='fixed left-0 top-0 h-full w-[250px] bg-[#353D53] text-[#FFFFFF] flex flex-col justify-between'>
      <div>
        <h1 className='text-3xl font-bold p-4'>PatientPortal</h1>
        <ul className='flex flex-col'>
          <li className='p-4 font-bold'>
            <Link to='/Home'>Home</Link>
          </li>
          <li className='p-4 font-bold'>
            <Link to='/Patients'>Patients</Link>
          </li>
          <li className='p-4 font-bold'>
            <Link to='/Chat'>Chat</Link>
          </li>
        </ul>
      </div>
      <div className='p-4' onClick={handleNav}>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
    </div>
  );
};

export default Navbar;