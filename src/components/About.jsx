import React from 'react';
import Logo from '../images/healthLogo.png';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Logo} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#487FC6] text-center font-bold'>Virtual Experience Research Group</p>
          <h1 className='text-[#12266C] text-center md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            About Us
          </h1>
          <p>
            We are a passionate team dedicated to creating virtual human patients for research and education.
            Our mission is to provide a seamless virtual experience for healthcare professionals and students.
          </p>
          <button className='bg-[#487FC6] text-[#FFFFFF] w-[200px] rounded-md font-medium my-6 mx-auto py-3'>
            <Link to='/Patients'>Learn More</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
