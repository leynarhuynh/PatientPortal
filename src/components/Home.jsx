import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Demo from '../images/laurademo.gif';

const Home = () => {
  const navigate = useNavigate();
  //navigated based on unique ID
  const handleNav = () => {
    const uniqueId = uuidv4(); //generates a new id string 
    navigate('/Chat/${uniqueId}'); 
  }
  return (
    <div className='flex h-screen bg-gray-50 mt-10'>
      <div className='flex-1 flex flex-col justify-center items-start pl-16'>
        <h1 className='text-8xl font-bold mb-6'>Welcome to PatientPortal</h1>
        <p className='mb-6 text-2xl'>
          Welcome to the Virtual Experience Virtual Patient Creator. This website is designed to 
          create a virtual patient agent within a click of a button. Learn more by watching the 
          video or simply getting started to start your own virtual human journey!
        </p>
        <button
          onClick={handleNav} 
          className='text-blue-600 flex items-center w-max py-3 px-8 border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors rounded-full font-bold text-lg'
        >
          Talk to Laura &rarr;
        </button>
      </div>
      <div className='flex-1 flex justify-center items-center mr-35 mb-20'>
        <img src={Demo} alt='Patient' className='shadow-lg' />
      </div>
    </div>
  );
};
export default Home;
