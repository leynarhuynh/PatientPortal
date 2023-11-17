import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Prompt = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "John Smith, an avid swimmer, had been enjoying a family vacation at a coastal resort..."
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
              <p className="h-72 overflow-auto">{description}</p>
              <button
                className='bg-[#487FC6] text-white p-4 rounded-lg mt-4'
                onClick={handleEdit}
              >
                Edit
              </button>
            </>
          )}
          <div className= 'ml-[350px] mt-4 ml-5 flex-1'>
            <button className=' bg-[#487FC6] text-white p-4 rounded-lg mt-4'>
              <Link to='/Chat'>Submit</Link>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
