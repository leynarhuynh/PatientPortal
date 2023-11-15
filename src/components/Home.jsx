import React from 'react'
import Logo from '../images/healthLogo.png'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';  

const Home = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
    <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
      <img className='w-[500px] mx-auto my-4' src={Logo} alt='/' />
      <div className='flex flex-col justify-center'>
        <p className='text-[#487FC6] text-center font-bold '>Virutal Experience Research Group</p>
        <h1 className='text-[#12266C] text-center md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Virtual Human Patient</h1>
        <p>
            Welcome to the Virtual Experience Virtual Patient Creator. This website is designed to create a virtual patient
            agent within a click of a button. Learn more by watching the video or simply getting started to start your own virtual
            human journey!
        </p>
        <button className='bg-[#487FC6] text-[#FFFFFF] w-[200px] rounded-md font-medium my-6 mx-auto md:mx8 py-3'>
          <Link to='/Patients'>Get Started</Link>
          </button>
      </div>
    </div>
  </div>
);
//     <div className='text-white'>
//         <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
//            <p className='text-[#487FC6] font-bold p-2'>Virtual Experience Research Group</p>
//            <h1 className='md:text-7xl sm:text-6x; text-4xl font-bold md:py-6'>Creating a Patient</h1> 

//            <div>
//            </div>
//            <div>
//             <button className='bg-[#487FC6] w-[200px] rounded-md font-medium my-6 mx-autp py-3 '>Get Started</button>
//            </div>
//         </div>
//     </div>
//   )
}

export default Home;