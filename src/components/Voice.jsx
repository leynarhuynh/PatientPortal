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
          <p>
          John Smith, an avid swimmer, had been enjoying a family vacation at a coastal resort. During his time at the beach, he sustained a small but deep laceration on his right lower leg from a sharp piece of coral while swimming in the ocean. He initially cleaned the wound with seawater and thought it wasn't severe enough to seek immediate medical attention. Unfortunately, this decision would later have significant consequences.

Unknowingly, John was swimming in an area recently affected by a hurricane that brought vibrio vulnificus bacteria to the waters. This bacteria can thrive in warm saltwater and proliferate during hurricanes and floods.
          </p>
        </div>

        {/* Buttons */}
        <div className='flex gap-10'>
          <button className='bg-[#487FC6] text-white p-10 rounded-lg'>
            <Link to='/Prompt'>English</Link>
          </button>
          <button className='bg-[#487FC6] text-white p-10 rounded-lg'>
            <Link to='/Prompt'>British</Link>
          </button>
          <button className='bg-[#487FC6] text-white p-10 rounded-lg'>
            <Link to='/Prompt'>Australian</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Voice;
