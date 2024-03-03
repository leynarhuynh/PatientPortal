import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPatient = () => {
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    historyOfPresentIllness: '',
    medications: '',
    allergies: '',
    bloodPressure: '',
    familyHistory: '',
    smoking: '',
    drinking: '',
    drugUse: '',
    scenario: '',
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
    serialized += `Medical History: ${data.historyOfPresentIllness}\nMedications: ${data.medications}\n`;
    serialized += `Allergies: ${data.allergies}\nBlood Pressure: ${data.bloodPressure}\n`;
    serialized += `Family History: ${data.familyHistory}\nSocial History: Smoking - ${data.smoking}, Drinking - ${data.drinking}, Drug Use - ${data.drugUse}\n`;
    serialized += `Scenario: ${data.scenario}\nAdditional Instructions: ${data.additionalInstructions}`;
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
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Date:
              </label>
              <input
                type="date"
                name="date"
                value={patientData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

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

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Medical History</h3>
          <div className="mb-2">
            <div className="flex flex-wrap gap-4">

              <div>
                <input
                  type="checkbox"
                  name="pastMedicalHistory"
                  value="Breathing Problems"
                  onChange={handleChange}
                />
                <label className="ml-2">Breathing Problems</label>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Medications:
            </label>
            <input
              type="text"
              name="medications"
              value={patientData.medications}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Allergies:
            </label>
            <input
              type="text"
              name="allergies"
              value={patientData.allergies}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Blood Pressure:
            </label>
            <input
              type="text"
              name="bloodPressure"
              value={patientData.bloodPressure}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Family History</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Family History:
            </label>
            <textarea
              name="familyHistory"
              value={patientData.familyHistory}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>


        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Social History</h3>
          <div className="mb-2">
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
          </div>

          <div className="mb-2">
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
          </div>

          <div>
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

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Scenario</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scenario:
            </label>
            <textarea
              name="scenario"
              value={patientData.scenario}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="A brief description of the patient's lifestyle or specific scenario. For example, 'Avid Swimmer'."
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Additional Instructions</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Instructions:
            </label>
            <textarea
              name="additionalInstructions"
              value={patientData.additionalInstructions}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

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

export default NewPatient;
