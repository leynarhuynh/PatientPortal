import React, { useState } from 'react';
import Logo from '../images/lauraPatient.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import LauraDetails from './LauraDetails'; 

function adjustMessagePatientDetails(patientDetails) {
  let systemMessageContent = "Provide general advice.";
  if (patientDetails && patientDetails.condition === "parkinsons") {
    systemMessageContent = "Give advice as if speaking to a patient with parkinsons.";
  } else {
    systemMessageContent = "Give advice as if speaking to a patient that is sick.";
  }
  return systemMessageContent;
}

const TypingIndicator = () => (
  <div className="flex items-center">
    <div className="h-2 w-2 bg-gray-400 rounded-full mr-1 animate-bounce"></div>
    <div className="h-2 w-2 bg-gray-400 rounded-full mr-1 animate-bounce"></div>
    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
);

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
          placeholder="Hi, Laura! How are you today?"
        />
        <button type="submit" className="bg-[#353D53] text-white rounded px-4 py-2">Send</button>
      </form>
    </div>
  );
};

export default function Chatbox() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const patientDetails = location.state?.patientDetails;

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    sendMessage(inputValue);
    setInputValue('');
  };
  
  const sendMessage = (message) => {
    const systemMessageContent = adjustMessagePatientDetails(patientDetails);

    const url = 'http://localhost:5000/api/chat';
    const data = {
      messages: [{
        role: "user",
        content: message
      }],
      patientDetails: patientDetails,
      systemMessage: systemMessageContent 
    };

    setIsLoading(true);
    console.log('DATA SENT TO SERVER', data);

    axios.post(url, data)
      .then((response) => {
        const choice = response.data.choices[0];
        setChatLog(prevChatLog => [...prevChatLog, { type: 'assistant', message: choice.message.content }]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        setIsLoading(false);
      });
  };

  const handlePatientSubmit = (serializedData) => {
    setFormData({ ...formData, patientDetails: serializedData }); 
    navigate('/Chat', { state: { patientDetails: serializedData } });
  };
  
  return (
    <div className="flex h-screen bg-gray-50 justify-end items-center pr-20"> 
      <div className="w-1/3 bg-white h-2/3 mr-10"> 
        <img src={Logo} alt="Laura" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/4 bg-white h-2/3"> 
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
      {isLoading && <TypingIndicator />}
    </div>
  );
}
