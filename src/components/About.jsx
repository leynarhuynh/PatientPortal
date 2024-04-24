import React from 'react';
import Logo from '../images/doctor.png'; 
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='w-full h-screen bg-white flex justify-center mt-40 ml-40'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center mt-[-550px]'> 
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-7xl font-bold mb-8 text-center'>Welcome to PatientPortal</h1>
          <p className='text-2xl mb-8 text-center'> 
          We are a passionate team dedicated to creating virtual human agents for research and education.
            Our mission is to provide a seamless virtual experience for healthcare professionals and students.
          </p>
          <a href='https://verg.cise.ufl.edu/' target='_blank' className='bg-[#353D53] text-white w-80 h-16 rounded-md font-bold text-xl flex justify-center items-center mt-4'>
            Learn about VERG!
          </a>
        </div>
        <div className='flex justify-center'>
          <img src={Logo} alt='Doctor' className='shadow-md' />
        </div>
      </div>
    </div>
  );
}

export default About;