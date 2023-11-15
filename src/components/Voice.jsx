import React from 'react';
import { Link } from 'react-router-dom';

const Voice = () => {
  return (
    <div className='ml-[280px] mt-20 flex'>
      {/* John Smith Box */}
      <div className='bg-[#487FC6] w-96 h-96 rounded-lg flex items-center justify-center relative'>
        <p className='text-white text-lg font-bold'>
          <Link to='/patients/Voice'>John Smith</Link>
        </p>
      </div>

      {/* Description Box (moved to the right of John Smith) */}
      <div className='ml-4 flex-1'>
        <div className='bg-white first-line:w-96 h-96 p-6 rounded-lg shadow-lg mb-6 mr-[50px]'>
          <h2 className='text-2xl font-bold text-[#12266C] mb-4'>John Smith</h2>
          <h2>Age: 45</h2>
          <h2>Gender: Male</h2>
          <h2 className='mb-2'>Medical History: He has no significant medical history and takes no regular medications. He has mild hypertension, which is well-controlled with lifestyle modifications. John lives in a rural community.</h2>
          <p className='mt-4'>
            John Smith, an avid swimmer, had been enjoying a family vacation at a coastal resort. During his time at the beach, he sustained a small but deep laceration on his right lower leg from a sharp piece of coral while swimming in the ocean. He initially cleaned the wound with seawater and thought it wasn't severe enough to seek immediate medical attention.
            Unknowingly, John was swimming in an area recently affected by a hurricane that brought Vibrio vulnificus bacteria to the waters.
          </p>
        </div>

        {/* Buttons */}
        <div className='flex gap-10'>
          <button className='bg-[#487FC6] text-white p-10 rounded-lg'>English</button>
          <button className='bg-[#487FC6] text-white p-10 rounded-lg'>British</button>
          <button className='bg-[#487FC6] text-white p-10 rounded-lg'>Australian</button>
        </div>
      </div>
    </div>
  );
};

export default Voice;
