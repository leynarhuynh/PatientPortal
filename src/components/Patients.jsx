import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Patients = () => {
  const navigate = useNavigate();

  const navigateToVoice = () => {
    navigate('./patients/Voice'); // Replace '/voice' with the path you have for your Voice component
  };


  return (
    <div className='ml-[280px] mt-8'>
      <h1 className='text-3xl font-bold text-[#12266C] mb-40'>Select your virtual patient:</h1>
      <div className='flex justify-center items-center'>
        <div className='bg-white p-10 rounded-lg shadow-lg'>
          <div className='bg-[#487FC6] w-96 h-96 rounded-lg flex items-center justify-center relative'>
            <p className='text-white text-lg font-bold'>
              <Link to='/Voice'>John Smith</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Patients;
