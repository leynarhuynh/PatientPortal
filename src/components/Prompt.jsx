import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Prompt = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "Name: John Smith\n\n" +
    "Age: 45\n\n" +
    "Gender: Male\n\n" +
    "Medications: N/A\n\n" +
    "Allergies: Peanuts and pollen \n\n" +
    "Blood Pressure: 90 \n\n" +
    "Family History: Breast cancer and Alzhemier's runs through the family\n\n" +
    "Medical History: John is an otherwise healthy 45-year-old man who enjoys an active lifestyle. He has no significant medical history and takes no regular medications. He has mild hypertension, which is well-controlled with lifestyle modifications. John lives in a rural community.\n\n" +
    "Scenario:\n\n" +
    "John Smith, an avid swimmer, had been enjoying a family vacation at a coastal resort. During his time at the beach, he sustained a small but deep laceration on his right lower leg from a sharp piece of coral while swimming in the ocean. He initially cleaned the wound with seawater and thought it wasn't severe enough to seek immediate medical attention. Unfortunately, this decision would later have significant consequences.\n\n" +
    "Unknowingly, John was swimming in an area recently affected by a hurricane that brought vibrio vulnificus bacteria to the waters. This bacteria can thrive in warm saltwater and proliferate during hurricanes and floods.\n\n" 
  );

  // State to store the description before editing
  const [originalDescription, setOriginalDescription] = useState(description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset the description to the original value when canceling the edit
    setDescription(originalDescription);
  };

  return (
    <div className='ml-[280px] mt-20 flex-col'>
      <h1 className='text-3xl font-bold text-[#12266C] mb-4'>Patient Details</h1>

      {/* description box for chatgpt */}
      <div className='mt-4 ml-5 flex-1'>
        <div className='bg-white w-150 h-96 p-6 rounded-lg shadow-lg mb-6 mr-[50px]'>
          {isEditing ? (
            <div>
              <textarea
                className="w-full h-72 p-2 mb-2 border-2 border-gray-300 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className='flex gap-5 mt-2'>
                <button
                  className='bg-green-500 text-white p-2 rounded-lg'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className='bg-red-500 text-white p-2 rounded-lg'
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="h-72 overflow-auto" style={{ whiteSpace: "pre-line" }}>{description}</div>
              <button
                className='bg-[#487FC6] text-white p-4 rounded-lg mt-4'
                onClick={handleEdit}
              >
                Edit
              </button>
            </>
          )}
          <div className= 'ml-[350px] mt-4 ml-5 flex-1'>
            <button className=' bg-[#487FC6] text-white p-4 rounded-lg mt-4 ml-auto'>
              <Link to='/Chat'>Submit</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
