import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LauraDetails = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    name: 'Laura Higgins',
    age: '63',
    gender: 'Female',
    describeProblem: 'Right Fractured fibula, broken teeth, minor facial bruising, right arm and shoulder minor bruising from a fall outside of house. She did not sustain a concussion (did not hit head) and has no symptoms related to a possible concussion',
    pastMedicalHistory: ['Breathing Problems'],
    medications: '3 days of oxycodone/APAP (Percocet). 2.5/325 mg. Ibuprofen 800 mg. every 8 hours as needed. Percocet every 6 hours for break through pain.',
    allergies: 'No known allergies',
    bloodPressure: '120/75 (no history of hypertension)',
    familyHistory: 'Parkinson’s Disease, arthritis in knees, hearing loss in both ears.',
    smoking: 'N/A',
    drinking: 'N/A',
    drugUse: 'N/A',
    scenario: `Ms. Higgins fell when leaving her house one morning to get her mail. There is a step down from her apartment door to the walkway in her apartment complex (she lives in the bottom unit). She was using her cane at the time when she fell. A neighbor saw her fall and called 911, and she was transported by ambulance to the ED, where she was diagnosed with a right fibula fracture (non-displaced and no-ankle involvement), observed overnight, did not require surgery and was casted with follow-up care. She also has a broken tooth from the fall, and some minor shoulder pain and bruising from the fall. She was sent home the next day following an Orthopedic consult, which recommended non-weightbearing for two weeks. She did not hit her head when she fell but did hit her face.

Ms. Higgins has Parkinsons and arthritis in both knees. She has been using a cane for the last 8 months. She also has hearing loss and wears hearing aids (Genesis AI) due to bilateral hearing loss. She, did not have her hearing aids in when she fell, and thus did not have them in her ears during EMT transport. She has been using an assistive listening device while in the hospital ED. She did not find any part of the tooth when she fell. At the time of discharge, most of her pain is in her leg, and has some pain in her mouth from the tooth and also some arm/shoulder pain from bruising.`,
    additionalInstructions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass patientData as state in navigate
    navigate('/Chat', { state: { patientDetails: patientData } });
};

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl px-4 py-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Patient Information Form
        </h2>
        
        {/* Basic Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={patientData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age:
              </label>
              <input
                type="text"
                name="age"
                value={patientData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender:
              </label>
              <input
                type="text"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Problem Description</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Describe Problem:
            </label>
            <textarea
              name="describeProblem"
              value={patientData.describeProblem}
              onChange={handleChange}
              className="mb-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm h-32" // Adjusted height
            />
          </div>
        </div>

        {/* Medication History */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Medication History</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medications:
            </label>
            <textarea
              name="medications"
              value={patientData.medications}
              onChange={handleChange}
              className="mb-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm h-32" // Adjusted height
            />
          </div>
        </div>

        {/* Allergies */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Allergies</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Allergies:
            </label>
            <textarea
              name="allergies"
              value={patientData.allergies}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Blood Pressure</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Pressure:
            </label>
            <textarea
              name="bloodPressure"
              value={patientData.bloodPressure}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        {/* Family History */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Family History</h3>   
          <textarea
            name="familyHistory"
            value={patientData.familyHistory}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {/* Social History */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Social History</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Smoking:
            </label>
            <input
              type="text"
              name="smoking"
              value={patientData.smoking}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <label className="block text-sm font-medium text-gray-700">
              Drinking:
            </label>
            <input
              type="text"
              name="drinking"
              value={patientData.drinking}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <label className="block text-sm font-medium text-gray-700">
              Drug Use:
            </label>
            <input
              type="text"
              name="drugUse"
              value={patientData.drugUse}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        {/* Scenario */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Scenario</h3>
          <textarea
            name="scenario"
            value={patientData.scenario}
            onChange={handleChange}
            className="mb-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm h-32" // Adjusted height
          />
        </div>

        {/* Additional Instructions */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Additional Instructions</h3>
          <textarea
            name="additionalInstructions"
            value={patientData.additionalInstructions}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {/* Submit button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#353D53] text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LauraDetails;
