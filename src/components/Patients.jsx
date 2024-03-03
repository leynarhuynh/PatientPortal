import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientCard from './PatientCard';
import Logo from '../images/john.png';
import Logo2 from '../images/laura.png';

const patientsData = [
  {
    id: 1,
    name: 'John Smith',
    demographics: '[Male] [10 yrs]',
    diagnosis: ['Diabetes'],
    medicalHistory: ['Family History - Glaucoma', 'Asthma'],
    currentMedication: ['Metformin', 'Glucophage'],
    image: Logo, 
  },
  {
    id: 2,
    name: 'Laura Higgins',
    demographics: '[Female] [27 yrs]',
    diagnosis: ['Parkinsons'],
    medicalHistory: ['Family History - Glaucoma', 'Asthma'],
    currentMedication: ['Levodopa'],
    image: Logo2, 
  },
  // add more patients
];

const Patients = () => {
  const navigate = useNavigate();

  // manage the new patient modal visibility
  const [isAddPatientModalOpen, setAddPatientModalOpen] = useState(false);

  // store the details of the new patient
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
    if (newPatientDetails.name.trim() === '') {
      return;
    }

    const newPatient = {
      id: patientsData.length + 1, 
      ...newPatientDetails,
    };

    // Add the new patient to the patientsData array (or send to backend)
    patientsData.push(newPatient);

    // Reset the new patient details form
    setNewPatientDetails({
      name: '',
      demographics: '',
      diagnosis: [],
      medicalHistory: [],
      currentMedication: [],
      image: Logo,
    });

    setAddPatientModalOpen(false);

    navigate(`/NewPatient`);
  };

  return (
    <div className='ml-[280px] mt-8'>
      <div className="flex items-center justify-between mb-8"> {/* Added container for the heading and button */}
        <h1 className='text-3xl font-bold text-[#353D53]'>Create a New Patient</h1>
        <button 
          className="bg-[#353D53] text-white py-4 px-8 rounded-lg text-lg hover:bg-[#434F70] transition duration-200 ml-280px"
          onClick={() => setAddPatientModalOpen(true)}
        >
          Create New Patient
        </button>
      </div>
      <hr className="mb-5 border-b-2 border-gray-400" /> {/* Line under "Create a New Patient" */}
      <h2 className="mb-20 text-3xl text-[#353D53]">Recent Patients</h2> {/* Heading for recent patients */}
      <div className='grid grid-cols-2 gap-4'> {/* Adjusted to have 2 columns */}
        {patientsData.map((patient) => (
          <PatientCard
            key={patient.id}
            name={patient.name}
            demographics={patient.demographics}
            diagnosis={patient.diagnosis}
            medicalHistory={patient.medicalHistory}
            currentMedication={patient.currentMedication}
            image={patient.image}
            onClick={() => navigate(`/NewPatient`)} 
          />
        ))}
      </div>

      {isAddPatientModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70'>
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <input
              type='text'
              placeholder='Name'
              value={newPatientDetails.name}
              onChange={(e) =>
                setNewPatientDetails({ ...newPatientDetails, name: e.target.value })
              }
            />
            <button className='mr-2' onClick={handleAddPatient}>Save</button>
            <button onClick={() => setAddPatientModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
