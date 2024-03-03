import React from 'react';
import { Link } from 'react-router-dom';

const PatientCard = ({
  name,
  demographics,
  diagnosis,
  medicalHistory,
  currentMedication,
  image,
  isAddNew = false 
}) => {
  if (isAddNew) {
    return (
      <div 
        className='bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center cursor-pointer'
      >
        <p className='text-lg font-bold text-center mt-2'>Add New Patient</p>
      </div>
    );
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-xl flex flex-col justify-between'> {/* Changed shadow-lg to shadow-xl */}
      <div className='mb-4'>
        <img src={image} alt={`${name}'s Profile`} className='w-32 h-32 rounded-full mx-auto' />
        <h3 className='text-xl font-bold text-center mt-2'>{name}</h3> {/* Changed text-lg to text-xl */}
        <p className='text-base text-center'>{demographics}</p> {/* Changed text-sm to text-base */}
      </div>
      <div>
        <p className='text-base'> {/* Changed text-sm to text-base */}
          <strong>Diagnosis:</strong> {diagnosis}
        </p>
        <p className='text-base'> {/* Changed text-sm to text-base */}
          <strong>Medical History:</strong> {medicalHistory && medicalHistory.join(', ')}
        </p>
        <p className='text-base'> {/* Changed text-sm to text-base */}
          <strong>Current Medication:</strong> {currentMedication && currentMedication.join(', ')}
        </p>
      </div>
      <div className='flex justify-center mt-4'>
        {/* Navigate to the appropriate pages */}
        <Link to={`/LauraDetails`} className='bg-[#353D53] text-white py-3 px-6 rounded-lg mr-4 text-base font-bold'>
          View Details
        </Link>
        <Link to={`/Chat`} className='bg-[#353D53] text-white py-3 px-6 rounded-lg ml-4 text-base font-bold'>
          Chat
        </Link>
      </div>
    </div>
  );
};

export default PatientCard;
