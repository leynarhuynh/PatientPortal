import React, { useState } from 'react';
import Logo from '../images/johnsmith.png'; 
import axios from 'axios';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    sendMessage(inputValue);
    setInputValue('');
  }

  const sendMessage = (message) => {
    // Check for specific messages and respond immediately
    if (message.toLowerCase() === 'what is your name?') {
      setChatLog(prevChatLog => [...prevChatLog, { type: 'bot', message: 'John Smith' }]);
      return;
    } else if (message.toLowerCase() === 'how old are you?') {
      setChatLog(prevChatLog => [...prevChatLog, { type: 'bot', message: '45' }]);
      return;
    }
    else if (message.toLowerCase() === 'what pains are you feeling?') {
      setChatLog(prevChatLog => [...prevChatLog, { type: 'bot', message: 'burning and sharp pains in my chest' }]);
      return;
    }
  
    // For other messages, continue with the existing logic
    const url = '/api/chat';
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message }]
    };
  
    setIsLoading(true);
  
    axios.post(url, data).then((response) => {
      console.log(response);
      setChatLog(prevChatLog => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }]);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }

  return (
    <div className='flex justify-center items-center' style={{ marginLeft: '250px' }}>
      <div className='w-full max-w-4xl mt-24 flex'>
        {/* John Smith Image */}
        <div className='relative mr-10'> 
          <img
            src={Logo}
            alt='John Smith'
            className='w-96 h-2/3 object-cover rounded-t-lg shadow-lg'
          />
          <div className='bg-[#487FC6] w-full h-1/3 rounded-b-lg flex items-center justify-center'>
            <p className='text-white text-lg font-bold'>John Smith</p>
          </div>
        </div>

        {/* Chatbox */}
        <div className='flex-1'>
          <div className='flex flex-col bg-white w-96 h-[600px] rounded-lg shadow-lg'> 
            <div className='bg-[#487FC6] text-white text-lg font-bold p-2 rounded-t-lg'>
              Patient Interaction
            </div>
            
            {/* Chat Messages */}
            <div className='flex-grow overflow-y-auto p-4'>
            {chatLog.map((message, index) => (
                <div key={index} className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                  <div className={`${
                    message.type === 'user' ? 'bg-[#365f8b]' : 'bg-gray-800'
                  } rounded-lg p-4 text-white max-w-sm ${
                    message.type === 'user' ? 'ml-auto' : 'mr-auto'
                  } mb-2`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {isLoading && <div>Loading...</div>}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className='flex gap-4 p-4 bg-white border-t border-gray-700 rounded-b-lg'>
              <input
                type="text"
                className="flex-grow px-4 py-2 bg-transparent text-black border border-gray-700 rounded-lg focus:outline-none"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#487FC6] rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-[#365f8b] transition-colors duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
