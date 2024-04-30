import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Logo from '../images/lauraPatient.png';
import axios from 'axios';
import LauraDetails from './LauraDetails'; 


function adjustMessagePatientDetails(patientDetails) {
  let systemMessageContent = "Provide general advice.";
  if (patientDetails && patientDetails.condition === "parkinsons") {
    systemMessageContent = "Give responses as if you are a patient with parkinsons and talking to a doctor.";
  } else {
    systemMessageContent = "Give responses as if you are a patient with a sickness and talking to a doctor.";
  }
  return systemMessageContent;
}
//chatbox layout
const ChatInterface = ({ chatLog, onMessageSubmit, inputValue, setInputValue, isLoading }) => {
  const endOfMessages = useRef(null);
  const scrollToBottom = () => {
    endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="overflow-y-auto p-4 space-y-2" style={{ maxHeight: '80vh' }}>
        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message.message} type={message.type} />
        ))}
        <div ref={endOfMessages} />
      </div>
      <div className="flex flex-col w-full">
        {isLoading && <TypingIndicator />}
        <form onSubmit={onMessageSubmit} className="border-t-2 border-gray-200 p-4 flex items-center">
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
    </div>
  );
};
// chat messages ui
const ChatMessage = ({ message, type }) => {
  return (
    <div className={`m-2 ${type === 'user' ? 'self-end' : 'self-start'}`}>
      {type === 'assistant' && (
        <div className="flex flex-col items-start mb-2">
          <span className="text-sm text-gray-600">Laura</span>
          <img src={Logo} alt="Laura" className="w-10 h-8 mt-1 rounded-xl" />
        </div>
      )}
      <div className={`p-3 rounded-lg ${type === 'user' ? 'bg-[#D6E4FD]' : 'bg-[#EFF0F3]'}`}>
        <p className="text-black">{message}</p>
      </div>
      {type === 'user' && (
        <div className="text-sm text-gray-600 text-right mt-1">
          Student
        </div>
      )}
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex items-center justify-start pl-4">
    <div className="h-2 w-2 bg-gray-400 rounded-full mr-1 animate-bounce"></div>
    <div className="h-2 w-2 bg-gray-400 rounded-full mr-1 animate-bounce"></div>
    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
);



export default function Chatbox() {
  //gets unqiue id from url & navigates
  const { uniqueId } = useParams();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const patientDetails = location.state?.patientDetails;

  //load chat history?
  


  const handleSubmit = (event) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    sendMessage(inputValue);
    setInputValue('');
  };

  const sendMessage = (message) => {


    const systemMessageContent = adjustMessagePatientDetails(patientDetails);
    const messagesForAPI = chatLog.map(c => ({
      role: c.type === 'user' ? 'user' : 'assistant',
      content: c.message
    }));
  
    // Adds new message
    messagesForAPI.push({
      role: "user",
      content: message
    });
  
    const conversationLog = chatLog.map(c => ({
      role: c.type,
      message: c.message
    })).reduce((prev, curr) => `${prev}\n${curr.role}: ${curr.message}`, '');
  
    const dataForLogging = {
      userId: uniqueId, 
      visitNum: 0, 
      startTime: new Date().toISOString(), 
      conversationLog: JSON.stringify(conversationLog)
      // patientForm: JSON.stringify(patientDetails) --> not needed 
    };
  
    //sends data for logging
    axios.post('http://localhost:3001/api/updateChat', dataForLogging)
      .then(response => {
        console.log('Chat history saved');
      })
      .catch(error => {
        console.error('Error saving chat', error);
      });
  
    //function to handle response from ChatGPT
    setIsLoading(true);
    console.log('Current chat', dataForLogging);
    ChatGPTResponse(message);
  };
  

  const ChatGPTResponse = (messages) => {
    // const url = 'http://127.0.0.1:4000/completion'
    const url = 'http://44.209.126.3/patient-response';
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const data = {
      "message": messages
    }


    axios.post(url, data, {
      headers: headers
    })
    .then(response => {
      const choice = response.data.message_response
      console.log(response);
      setChatLog(prevChatLog => [...prevChatLog, { type: 'assistant', message: choice}]);
    })
    .catch(error => {
      console.error('Error', error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }
  

  
  const handlePatientSubmit = (serializedData) => {
    setFormData({ ...formData, patientDetails: serializedData }); 
    navigate('/Chat', { state: { patientDetails: serializedData } });
  };

  return (
    <div className="flex h-screen bg-gray-50 items-center justify-end">
      <div className="flex-1 bg-white h-2/3 flex justify-center items-center p-4" style={{ maxWidth: '32%' }}>
        <img src={Logo} alt="Laura" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 bg-white h-2/3" px-10 style={{ maxWidth: '33%' }}> 
        <ChatInterface 
          chatLog={chatLog}
          onMessageSubmit={handleSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading} 
        />
      </div>
      <div className="flex-1 bg-white h-2/3 overflow-y-auto" style={{ maxWidth: '33%' }}> 
        <LauraDetails onPatientSubmit={handlePatientSubmit} />
      </div>
    </div>
  );
}