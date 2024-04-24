import React from 'react';
import { Link } from 'react-router-dom';
import DoctorImage from '../images/doctor.png';

const Home = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-r from-blue-700 to-blue-100 flex justify-center items-center'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center mt-[-350px]'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-7xl text-white font-bold mb-8 text-center'>Welcome to PatientPortal</h1>
          <p className='text-2xl mb-8 text-center text-white'>
            Welcome to the Virtual Experience Virtual Patient Chat. This website is designed to
            talk to a virtual patient agent within a click of a button. Learn more by watching the video
            or simply get started to talk to your virtual human patient!
          </p>
          <Link
            to='/Patients'
            className='bg-[#2858db] text-white w-80 h-16 rounded-md font-bold text-xl flex justify-center items-center mt-2'
          >
            Chat with a patient!
          </Link>
        </div>
        <div className='flex justify-center'>
          <img src={DoctorImage} alt='Doctor' className='shadow-md' />
        </div>
      </div>
    </div>
  );
};

export default Home;
