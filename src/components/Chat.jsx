import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FaFileDownload } from "react-icons/fa";
import { jsPDF } from 'jspdf';
import Logo from '../images/lauraPatient.png';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
    <div className={`mb-4 flex ${type === 'user' ? 'items-end justify-end' : 'items-start justify-start'}`}>
      {type === 'assistant' && (
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-1">
            <img src={Logo} alt="Laura" className="w-8 h-6 mr-2 rounded-full" />
            <span className="text-sm text-gray-600">Laura</span>
          </div>
          <div className={`max-w-[100%] w-auto bg-[#EFF0F3] rounded-lg p-3`}>
            <p className="text-black">{message}</p>
          </div>
        </div>
      )}
      {type === 'user' && (
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-600 text-right mb-1">Student</div>
          <div className={`max-w-[100%] w-auto bg-[#D6E4FD] rounded-lg p-3`}>
            <p className="text-black">{message}</p>
          </div>
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

  //gets the unique id local storage
  useEffect(() => {
    let storedId = localStorage.getItem('uniqueId', uniqueId.uniqueId);
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem('uniqueId', storedId);
      navigate(`/Chat/${storedId}`);
      console.log("no storedId", storedId);
    } else {
      if (storedId !== uniqueId) {
        navigate(`/Chat/${storedId}`);
        console.log("storedId success", storedId);
      }
    }
  }, [navigate, uniqueId]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    sendMessage(inputValue);
    setInputValue('');
  };

  const sendMessage = (message) => {
    const systemMessageContent = adjustMessagePatientDetails(patientDetails);
    
    //update the chat log with user message
    const newUserMessage = {
      role: "user",
      message: message,
      timestamp: new Date().toISOString()
    };
    setChatLog(prevChatLog => [...prevChatLog, newUserMessage]);
  
    //update the chat log with laura message
    const lauraMessage = {
      role: "assistant",
      message: "Laura response",
      timestamp: new Date().toISOString()
    };
  
    // update the chat log with Laura's response
    setChatLog(prevChatLog => [...prevChatLog, lauraMessage]);
  
    // conversation logs format
    const conversationLogs = {
      userQuery: [],
      userTime: [],
      lauraQuery: [],
      lauraTime: []
    };
    chatLog.forEach(entry => {
      if (entry.role === 'user') {
        conversationLogs.userQuery.push(entry.message);
        conversationLogs.userTime.push(entry.timestamp);
      } else if (entry.role === 'assistant') {
        conversationLogs.lauraQuery.push(entry.message);
        conversationLogs.lauraTime.push(entry.timestamp);
      }
    });
  
    //add one convo history 
    conversationLogs.userQuery.push(newUserMessage.message);
    conversationLogs.userTime.push(newUserMessage.timestamp);
    conversationLogs.lauraQuery.push(lauraMessage.message);
    conversationLogs.lauraTime.push(lauraMessage.timestamp);

    //sends request with chat
    axios.post('http://patientportal-api.us-east-1.elasticbeanstalk.com/api/updateChat', {
      userId: uniqueId,
      visitNum: 0,
      conversationLogs: JSON.stringify(conversationLogs)
    }).then(response => {
      console.log('Chat history saved', response);
    }).catch(error => {
      console.error('Error saving chat', error);
    });

  
    //function to handle response from ChatGPT
    setIsLoading(true);
    console.log('Made it!');
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

  function exportChatLog(chatLog) {
    const doc = new jsPDF();
    let y = 20; 
    const margin = 5; 
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxTextWidth = pageWidth - 2 * margin; // calculate the maximum width of the text
    //starting role
    let lastRole = 'user';
    chatLog.forEach((entry, index) => {
      //get rid of laura's extra response
      if (entry.message === "Laura response" && entry.role === 'assistant') return;
  
      //check not dupe role 
      if (index === 0 || entry.role !== lastRole) {
        lastRole = entry.role;
        let pre = entry.role === "user" ? "Student: " : "Laura: ";
        const messagePrefix = pre + entry.message;
        const lines = doc.splitTextToSize(messagePrefix, maxTextWidth); //space out text
  
        //add a new page if at text limit
        if (y + 10 * lines.length >= doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = 20;
        }
        doc.text(margin, y, lines); 
        y += 10 * lines.length + 2;
      }
    });
  
    doc.save('chatlog.pdf'); 
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
    <button
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 1000
        }}
        className='text-black-600 flex items-center w-max py-2 px-6 transition-colors rounded-full font-medium'
        onClick={() => exportChatLog(chatLog)}
      >
        <FaFileDownload size={24} />
      </button>
  </div>
);

}
