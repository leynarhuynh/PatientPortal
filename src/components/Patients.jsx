import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../images/johnsmith.png'; 

const Patients = () => {
  const navigate = useNavigate();

  const navigateToVoice = () => {
    navigate('./patients/Voice'); 
  };

  return (
    <div className='ml-[280px] mt-8'>
      <h1 className='text-3xl font-bold text-[#12266C] mb-40'>Select your virtual patient:</h1>
      <div className='flex justify-center items-center'>
        <div className='bg-white p-10 rounded-lg shadow-lg h-[400px] relative'>
          <div className='relative h-2/3 mb-4'>
            <img
              src={Logo}
              alt='healthLogo'
              className='w-full h-full object-contain rounded-lg shadow-md'
            />
          </div>
          <div className='bg-[#487FC6] w-full h-1/3 rounded-lg flex items-center justify-center'>
            <p className='text-white text-lg font-bold'>
              <Link to='/Voice'>John Smith</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
