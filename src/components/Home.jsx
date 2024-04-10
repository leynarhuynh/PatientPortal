import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Logo from '../images/healthLogo.png'; 
import DoctorImage from '../images/doctor.png'; 

const Home = () => {
  return (
    <div className='w-full h-screen bg-white flex justify-center items-center mt-40'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center mt-[-550px]'> 
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-7xl font-bold mb-8 text-center'>Welcome to PatientPortal</h1>
          <p className='text-2xl mb-8 text-center'> 
            Welcome to the Virtual Experience Virtual Patient Creator. This website is designed to
            create a virtual patient agent within a click of a button. Learn more by watching the video
            or simply getting started to start your own virtual human journey!
          </p>
          <Link to='/Patients' className='bg-[#353D53] text-white w-80 h-16 rounded-md font-bold text-xl flex justify-center items-center mt-2'> 
            Create your own patient!
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
