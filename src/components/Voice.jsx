import React from 'react';
import Logo from '../images/johnsmith.png'; 
import { Link } from 'react-router-dom';

const Voice = () => {
  return (
    <div className='ml-[280px] mt-24 flex'>
      {/* john smith image */}
      <div className='relative'>
        <img
          src={Logo}
          alt='John Smith'
          className='w-96 h-2/3 object-cover rounded-t-lg shadow-lg'
        />
        <div className='bg-[#487FC6] w-full h-1/3 rounded-b-lg flex items-center justify-center'>
          <p className='text-white text-lg font-bold'>
            <Link to='/patients/Voice'>John Smith</Link>
          </p>
        </div>
      </div>

      {/* description box*/}
      <div className='ml-4 flex-1'>
        <div className='bg-white first-line:w-96 h-96 p-6 rounded-lg shadow-lg mb-6 mr-[50px]'>
          <h2 className='text-2xl font-bold text-[#12266C] mb-4'>John Smith</h2>
          <p>
            John Smith, an avid swimmer, had been enjoying a family vacation at a coastal resort. During his time at the beach, he sustained a small but deep laceration on his right lower leg from a sharp piece of coral while swimming in the ocean. He initially cleaned the wound with seawater and thought it wasn't severe enough to seek immediate medical attention. 

            Unknowingly, John was swimming in an area recently affected by a hurricane that brought Vibrio vulnificus bacteria to the waters. This bacteria can thrive during hurricanes and floods.
          </p>
        </div>

        {/* voice buttons*/}
        <div className='flex gap-10 justify-center'>
          <button className='bg-[#487FC6] text-white p-10 rounded-lg'>
            <Link to='/Prompt'>Voice 1</Link>
          </button>
          <button className='bg-[#487FC6] text-white p-10 rounded-lg'>
            <Link to='/Prompt'>Voice 2</Link>
          </button>
          <button className='bg-[#487FC6] text-white p-10 rounded-lg'>
            <Link to='/Prompt'>Voice 3</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Voice;
