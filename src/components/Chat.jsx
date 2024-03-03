import React, { useState } from 'react';
import Logo from '../images/lauraPatient.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LauraDetails from './LauraDetails'; 


const ChatMessage = ({ message, type }) => {
  return (
    <div className={`p-3 rounded-lg m-2 ${type === 'user' ? 'bg-[#D6E4FD]' : 'bg-[#EFF0F3]'} ${type === 'user' ? 'self-end' : 'self-start'}`}>
      <p className="text-black">{message}</p>
    </div>
  );
};

const ChatInterface = ({ chatLog, onMessageSubmit, inputValue, setInputValue }) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="overflow-y-auto p-4 space-y-2">
        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message.message} type={message.type} />
        ))}
      </div>
      <form onSubmit={onMessageSubmit} className="border-t-2 border-gray-200 p-4 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow p-2 mr-4 rounded border"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-[#353D53] text-white rounded px-4 py-2">Send</button>
      </form>
    </div>
  );
};

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); // Import useNavigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    // Now directly use formData.patientDetails in sendMessage
    sendMessage(inputValue);
    setInputValue('');
  };
  
  

  const sendMessage = (message) => {
    const url = 'http://localhost:5000/api/chat';
    const data = {
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      patientDetails: formData.patientDetails
    };
  
    setIsLoading(true);
    console.log('DATA SENT TO SERVER', data);
  
    axios.post(url, data)
      .then((response) => {
        // Assuming the response structure is the same as the OpenAI documentation
        const choice = response.data.choices[0];
        setChatLog(prevChatLog => [...prevChatLog, { type: 'assistant', message: choice.message.content }]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        // Show error message to the user
      });
  };
  

  const handlePatientSubmit = (serializedData) => {
    setFormData({ ...formData, patientDetails: serializedData }); // Set patientDetails in formData
    navigate('/Chat', { state: { patientDetails: serializedData } });
  };
  

  

  return (
    <div className="flex h-screen bg-gray-50 justify-end items-center pr-20"> {/* Adjusted justify and added padding-right */}
      <div className="w-1/3 bg-white h-2/3 mr-10"> {/* Adjusted margin-right */}
        <img src={Logo} alt="Laura" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/4 bg-white h-2/3"> {/* Adjusted margin-right */}
        <ChatInterface 
        chatLog={chatLog}
        onMessageSubmit={(event) => handleSubmit(event, formData.patientDetails)}
        inputValue={inputValue}
        setInputValue={setInputValue}
        />
      </div>
      <div className="w-1/5 h-2/3 ml-10 overflow-y-auto"> 
      <LauraDetails onPatientSubmit={handlePatientSubmit} />
      </div>
    </div>
  );
  
}
