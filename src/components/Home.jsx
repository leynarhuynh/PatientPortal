import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Logo from '../images/healthLogo.png';
import Video from '../images/homeVideo.mp4'; 

const Home = () => {
  return (
    <div className='w-full bg-white py-24 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        {/* Video */}
        <div className='relative w-full'>
          <div className='bg-[#EDF7FD] border-20 border-[#487FC6]'>
            <video className='w-full h-auto mx-auto' controls>
              <source src={Video} type='video/mp4' /> 
            </video>
          </div>
          {/* Text box under video */}
          <div className='absolute bottom-0 left-0 w-full bg-[#487FC6] py-4 px-4 border-20 border-[#487FC6]'>
            <p className='text-[#EDF7FD] text-center font-bold'>Introduction</p>
          </div>
        </div>
        {/* intro */}
        <div className='flex flex-col justify-center ml-12'>
          <p className='text-[#487FC6] text-center font-bold'>Virtual Experience Research Group</p>
          <h1 className='text-[#12266C] text-center md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Virtual Human Patient
          </h1>
          <p className='text-center'>
            Welcome to the Virtual Experience Virtual Patient Creator. This website is designed to create a virtual
            patient agent within a click of a button. Learn more by watching the video or simply getting started to start
            your own virtual human journey!
          </p>
          <button className='bg-[#487FC6] text-[#FFFFFF] w-[200px] rounded-md font-medium my-6 mx-auto md:mx8 py-3'>
            <Link to='/Patients'>Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
