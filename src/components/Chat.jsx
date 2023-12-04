import React from 'react';
import Logo from '../images/johnsmith.png'; 
import { Link } from 'react-router-dom';

const Chat = () => {
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
          <h2 className='text-2xl font-bold text-[#12266C] mb-4 justify-center'>Patient Interaction</h2>
          <p>
            chatbot here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
