import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientCard from './PatientCard';
import Logo from '../images/johnsmith.png';
import Logo2 from '../images/eliza.png';

// Define your patientsData array here or import it from another file
const patientsData = [
  {
    id: 1,
    name: 'John Smith',
    demographics: '[Male] [10 yrs]',
    diagnosis: ['Diabetes'],
    medicalHistory: ['Family History - Glaucoma', 'Asthma'],
    currentMedication: ['Metformin', 'Glucophage'],
    image: Logo, // Replace with actual image path
  },
  {
    id: 2,
    name: 'Eliza Higgins',
    demographics: '[Female] [27 yrs]',
    diagnosis: ['Colon Cancer'],
    medicalHistory: ['Family History - Glaucoma', 'Asthma'],
    currentMedication: ['5-Fluorouracil', 'Capecitabine'],
    image: Logo2, // Replace with actual image path
  },
  // Add other patient objects here
];

const Patients = () => {
  const navigate = useNavigate();

  const navigateToVoice = (id) => {
    navigate(`/Voice`);
  };

  // State to manage the new patient 
  const [isAddPatientModalOpen, setAddPatientModalOpen] = useState(false);

  // State to store the details of the new patient
  const [newPatientDetails, setNewPatientDetails] = useState({
    name: '',
    demographics: '',
    diagnosis: [],
    medicalHistory: [],
    currentMedication: [],
    image: Logo, // Default image
  });

  // Function to handle adding a new patient
  const handleAddPatient = () => {

    // Reset the new patient details form
    setNewPatientDetails({
      name: '',
      demographics: '',
      diagnosis: [],
      medicalHistory: [],
      currentMedication: [],
      image: Logo,
    });

    // Close the modal or navigate to the patients list
    setAddPatientModalOpen(false);
  };

  return (
    <div className='ml-[280px] mt-8'>
      <h1 className='text-3xl font-bold text-[#12266C] mb-8'>Patients</h1>
      <div className='grid grid-cols-3 gap-4'>
        {patientsData.map((patient) => (
          <PatientCard
            key={patient.id}
            name={patient.name}
            demographics={patient.demographics}
            diagnosis={patient.diagnosis}
            medicalHistory={patient.medicalHistory}
            currentMedication={patient.currentMedication}
            image={patient.image}
            onClick={() => navigateToVoice(patient.id)}
          />
        ))}

        {/* Add New Patient Card */}
        <div
          className='bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center cursor-pointer'
          onClick={() => setAddPatientModalOpen(true)}
        >
          <p className='text-lg font-bold text-center mt-2'>Add New Patient</p>
        </div>
      </div>

      {isAddPatientModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70'>
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            {/* Input fields for new patient details */}
            <input
              type='text'
              placeholder='Name'
              value={newPatientDetails.name}
              onChange={(e) =>
                setNewPatientDetails({ ...newPatientDetails, name: e.target.value })
              }
            />
            <input
              type='text'
              placeholder='Demographics'
              value={newPatientDetails.demographics}
              onChange={(e) =>
                setNewPatientDetails({ ...newPatientDetails, demographics: e.target.value })
              }
            />
            {/*save button*/}
            <button onClick={handleAddPatient}>Save</button>
            {/* Cancel button */}
            <button onClick={() => setAddPatientModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
