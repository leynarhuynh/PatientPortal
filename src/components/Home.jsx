import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Demo from '../images/laurademo.gif';

const Home = () => {
  const navigate = useNavigate();

  const handleNav = () => {
    const uniqueId = uuidv4();
    localStorage.setItem('uniqueId', uniqueId);
    axios.post('http://localhost:3001/api/login', {userId: uniqueId})
      .then(response => {
        const { visitNum } = response.data;
        navigate(`/Chat/${uniqueId}`, { state: { visitNum } });
      })
      .catch(error => {
        console.error('Error checking visit', error);
      });
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      <div className='flex-1 flex flex-col justify-center items-start pl-16 pr-32'>
        <h1 className='text-8xl font-bold mb-10'>Welcome to PatientPortal</h1>
        <p className='mb-10 text-2xl'>
          Welcome to the Virtual Experience Virtual Patient Creator. This website is designed to 
          create a virtual patient agent within a click of a button. Learn more by watching the 
          video or simply getting started to start your own virtual human journey!
        </p>
        <button
          onClick={handleNav} 
          className='text-blue-600 flex items-center w-max py-2 px-6 border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors rounded-full font-medium text-lg'
        >
          Talk to Laura &rarr;
        </button>
      </div>
      <div className='flex-1 flex justify-center items-center pr-16'>
        <img src={Demo} alt='Patient' className='shadow-lg max-w-full h-auto' />
      </div>
    </div>
  );
};

export default Home;
