import React from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Demo from '../images/laurademo.gif';

const Home = () => {
  const navigate = useNavigate();
  const uniqueId = useParams();
  const handleNav = () => {
    // const uniqueId = uuidv4();
    localStorage.setItem('uniqueId', uniqueId.uniqueId);
    axios.post('http://patientportal-api.us-east-1.elasticbeanstalk.com/api/login', {userId: uniqueId.uniqueId})
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
          Welcome to the Virtual Experience Virtual Patient Chat. This website is designed to 
          chat with a virtual patient agent, Laura Higgins, within a click of a button. Learn more by watching the 
          video or simply getting started to talk to Laura to start the collaborative care.
        </p>
        <div className="flex items-center mb-4">
        <button className="text-2xl font-medium text-black-600 mr-2" onClick={() => window.location = 'mailto:huynhleyna@ufl.edu'}>Questions?</button>
          <button
            onClick={handleNav} 
            className='text-black-600 flex items-center w-max py-2 px-6 border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors rounded-full font-medium text-2xl'
          >
            Talk to Laura &rarr;
          </button>
        </div>
      </div>
      <div className='flex-1 flex justify-center items-center pr-16'>
        <img src={Demo} alt='Patient' className='shadow-lg max-w-full h-auto' />
      </div>
    </div>
  );
};

export default Home;
