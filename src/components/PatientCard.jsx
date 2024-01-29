import React from 'react';
import { ReactComponent as PlusIcon } from '../images/plus.png'; // Path to your plus icon

const PatientCard = ({
  name,
  demographics,
  diagnosis,
  medicalHistory,
  currentMedication,
  image,
  onClick,
  isAddNew = false // This prop determines if the card is for adding new patients
}) => {
  if (isAddNew) {
    // Render the 'Add New Patient' card
    return (
      <div 
        className='bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center cursor-pointer'
        onClick={onClick}
      >
        {/* <PlusIcon className='w-16 h-16 text-[#487FC6]' /> */}
        <p className='text-lg font-bold text-center mt-2'>Add New Patient</p>
      </div>
    );
  }

  // Render the existing patient card
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between'>
      <div className='mb-4'>
        <img
          src={image}
          alt={`${name}'s Profile`}
          className='w-32 h-32 rounded-full mx-auto'
        />
        <h3 className='text-lg font-bold text-center mt-2'>{name}</h3>
        <p className='text-sm text-center'>{demographics}</p>
      </div>
      <div>
        <p className='text-sm'><strong>Diagnosis:</strong> {diagnosis}</p>
        <p className='text-sm'><strong>Medical History:</strong> {medicalHistory && medicalHistory.join(', ')}</p>
        <p className='text-sm'><strong>Current Medication:</strong> {currentMedication && currentMedication.join(', ')}</p>
      </div>
      <button
        className='bg-[#487FC6] text-white py-2 rounded-lg mt-4'
        onClick={onClick}
      >
        {name ? 'View Details' : 'Add New Patient'}
      </button>
    </div>
  );
};

export default PatientCard;
