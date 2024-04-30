import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientCard from './PatientCard';
import Logo from '../images/john.png';
import Logo2 from '../images/laura.png';

//current patients
const patientsData = [
  {
    id: 1,
    name: 'John Smith',
    demographics: '[Male] [34 yrs]',
    diagnosis: ['Diabetes'],
    medicalHistory: ['Family History - Glaucoma', 'Asthma'],
    currentMedication: ['Metformin', 'Glucophage'],
    image: Logo, 
  },
  {
    id: 2,
    name: 'Laura Higgins',
    demographics: '[Female] [63 yrs]',
    diagnosis: ['Parkinsons'],
    medicalHistory: ['Family History - Glaucoma', 'Asthma'],
    currentMedication: ['Levodopa'],
    image: Logo2, 
  },
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
    image: Logo, 
  });

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
    <div className='ml-[280px] mt-8 mr-20'>
      <div className="flex items-center justify-between mb-8"> 
        <h1 className='text-3xl font-bold text-[#353D53]'>Create a New Patient</h1>
        <button 
          className="bg-[#353D53] text-white py-4 px-8 rounded-lg text-lg hover:bg-[#434F70] transition duration-200 ml-280px"
          onClick={() => setAddPatientModalOpen(true)}
        >
          Create New Patient
        </button>
      </div>
      <hr className="mb-5 border-b-2 border-gray-400" /> 
      <h2 className="mb-20 text-3xl text-[#353D53]">Recent Patients</h2> 
      <div className='grid grid-cols-2 gap-4'>
        {patientsData.map((patient) => (
          <PatientCard
            key={patient.id}
            name={patient.name}
            demographics={patient.demographics}
            diagnosis={patient.diagnosis}
            medicalHistory={patient.medicalHistory}
            currentMedication={patient.currentMedication}
            image={patient.image}
            onClick={() => navigate(`/LauraDetails`)} 
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
            <input
              type='text'
              placeholder='Gender'
              value={newPatientDetails.gender}
              onChange={(e) =>
                setNewPatientDetails({ ...newPatientDetails, gender: e.target.value })
              }
            />
            <input
              type='number'
              placeholder='Age'
              value={newPatientDetails.age}
              onChange={(e) =>
                setNewPatientDetails({ ...newPatientDetails, age: e.target.value })
              }
            />
            <input
              type='text'
              placeholder='Diagnosis'
              value={newPatientDetails.diagnosis.join(', ')}
              onChange={(e) =>
                setNewPatientDetails({ ...newPatientDetails, diagnosis: e.target.value.split(',').map(diag => diag.trim()) })
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
