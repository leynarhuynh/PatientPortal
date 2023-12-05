import React, { useState } from "react";
import { OpenAI } from "openai";
import Logo from '../images/johnsmith.png'; 
import { Link } from 'react-router-dom';

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });

      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });

      setApiResponse(result.data.choices[0].text);
    } catch (error) {
      console.error("Error from OpenAI API:", error);
      setApiResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className='ml-[280px] mt-24 flex'>
      {/* John Smith image and info */}
      <div className='relative'>
        <img
          src={Logo}
          alt='John Smith'
          className='w-96 h-2/3 object-cover rounded-t-lg shadow-lg'
        />
        <div className='bg-[#487FC6] w-full h-1/3 rounded-b-lg flex items-center justify-center'>
          <p className='text-white text-lg font-bold'>
            <Link to='/patients/Voice'>John Smith</Link>
          </p>
        </div>
      </div>

      {/* Chatbot box on the right */}
      <div className='ml-4 flex-1'>
        <div className='bg-white w-96 h-96 p-6 rounded-lg shadow-lg mb-6'>
          <h2 className='text-2xl font-bold text-[#12266C] mb-4 justify-center'>Patient Interaction</h2>

          {apiResponse && (
            <div className='mb-4'>
              <h3 className='text-xl font-bold mb-2'>John Smith Response:</h3>
              <p>{apiResponse}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question..."
              className='w-full mb-4 p-2 border border-gray-300 rounded'
            ></textarea>

            <button type="submit" disabled={loading} className='w-full bg-blue-500 text-white p-2 rounded'>
              {loading ? "Generating..." : "Generate Response"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
