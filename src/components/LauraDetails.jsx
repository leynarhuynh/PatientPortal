import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LauraDetails = () => {
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState({
    name: 'Laura Higgins',
    age: '63',
    gender: 'Female',
    describeProblem: '',
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

  // Serialize patient data into a string
  const serializePatientData = (data) => {
    let serialized = `Patient Name: ${data.name}\nAge: ${data.age}\nGender: ${data.gender}\n`;
    serialized += `Problem Description: ${data.describeProblem}\n`;
    serialized += `Medical History: ${data.pastMedicalHistory.join(', ')}\n`;
    serialized += `Medications: ${data.medications}\n`;
    serialized += `Allergies: ${data.allergies}\n`;
    serialized += `Blood Pressure: ${data.bloodPressure}\n`;
    serialized += `Family History: ${data.familyHistory}\n`;
    serialized += `Social History: Smoking - ${data.smoking}, Drinking - ${data.drinking}, Drug Use - ${data.drugUse}\n`;
    serialized += `Scenario: ${data.scenario}\n`;
    serialized += `Additional Instructions: ${data.additionalInstructions}`;
    return serialized;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serializedData = serializePatientData(patientData);
    // Navigate to chat and pass serialized patient data as state
    navigate('/Chat', { state: { patientDetails: serializedData } });
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

        {/* Name and Date */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Name and Date</h3>
          <div className="flex justify-between gap-4">
            <div className="flex-1">
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
                Age:
                <input
                type="text"
                name="age"
                value={patientData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                Gender:
                <input
                type="text"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />

                {/* Problem Description */}
                <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Problem Description</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    Describe Problem:
                    </label>
                    <input
                    type="text"
                    name="describeProblem"
                    value={patientData.describeProblem}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                </div>

                {/* Medication */}
                <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Medication History</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    Medications:  
                    </label>
                    <input
                    type="text"
                    name="medications"
                    value={patientData.medications}
                    onChange={handleChange}
                    className="mb-4 selection:mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    <label className="block text-sm font-medium text-gray-700">
                    Allergies:  
                    </label>
                    <input
                    type="text"
                    name="allergies"
                    value={patientData.allergies}
                    onChange={handleChange}
                    className="mb-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    <label className="block text-sm font-medium text-gray-700">
                    Blood Pressure:  
                    </label>
                    <input
                    type="text"
                    name="bloodPressure"
                    value={patientData.bloodPressure}
                    onChange={handleChange}
                    className="mb-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                </div>


                <h3 className="text-lg font-semibold mb-2">Family History:</h3>   
                <textarea
                name="familyHistory"
                value={patientData.familyHistory}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />


                {/* Social */}
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

                <h3 className="text-lg font-semibold mb-2">Scenario:</h3>   
                <textarea
                name="scenario"
                value={patientData.scenario}
                onChange={handleChange}
                className="mb-4 selection:mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />

                {/* Additional Instructions */}
                <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Additional Instructions</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    </label>
                    <textarea
                    name="additionalInstructions"
                    value={patientData.additionalInstructions}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
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
