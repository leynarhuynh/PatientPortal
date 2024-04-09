import React, { useState } from 'react';
import Logo from '../images/lauraPatient.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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

const ChatInterface = ({ chatLog, onMessageSubmit, inputValue, setInputValue, isLoading }) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="overflow-y-auto p-4 space-y-2">
        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message.message} type={message.type} />
        ))}
      </div>
      {isLoading && <TypingIndicator />}
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
    // const url = 'http://localhost:5000/api/chat';
    // holds chat history
    const messagesForAPI = chatLog.map(c => ({
      role: c.type === 'user' ? 'user' : 'assistant',
      content: c.message
    }));
  
    // adds new message
    messagesForAPI.push({
      role: "user",
      content: message
    });
  
    const data = {
      messages: messagesForAPI,
      patientDetails: patientDetails,
      systemMessage: systemMessageContent
    };
  
    setIsLoading(true);
    console.log('DATA SENT TO SERVER', data);
    ChatGPTResponse(message);
  };

  const ChatGPTResponse = (messages) => {
    // const url = 'http://127.0.0.1:4000/completion'
    const url = 'http://44.209.126.3/completion';
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const data = {
      "message": messages
    }

    const data2 = {
      // max response length: 100 words
      "prompt": "You are to play the role of a patient with Parkinsons disease, Laura Higgins, and I am your healthcare provider. Act and respond as if you are the patient that is seeking advice. The response should be empathetic yet informative, providing clear guidance on managing her health needs.",
      "bio": "Scenario: Ms. Laura Higgins fell when leaving her house one morning to get her mail. There is a step down from her apartment door to the walkway in her apartment complex (she lives in the bottom unit). She was using her cane at the time when she fell. A neighbor saw her fall and called 911, and she was transported by ambulance to the ED, where she was diagnosed with a right radius fracture (non-displaced), observed overnight, did not require surgery and was casted with follow-up care. " +
      "She also has a broken tooth from the fall, and some minor shoulder pain and bruising from the fall. She was sent home the next day following an Orthopedic consult, which recommended follow up in for two weeks. She did not hit her head when she fell but did hit her face. Ms. Higgins has Parkinsons disease (diagnosed 10 years ago and has mild arthritis in both knees. She has been using a cane for the last 8 months. She also has hearing loss and wears hearing aids (Genesis AI) due to bilateral hearing loss. " +
      "She did not have her hearing aids in when she fell, and thus did not have them in her ears during EMT transport. She has been using an assistive listening device while in the hospital ED. She did not find any part of the tooth when she fell. At the time of discharge, most of her pain is in her wrist, and has some pain in her mouth from the tooth and also some arm/shoulder pain from bruising." +
      "Medications at discharge: 3 days of oxycodone/APAP (Percocet) 2.5/325 mg every 6 hours for break through pain Ibuprofen 800 mg every 8 hours as needed" +
      "Patient Information Name: Laura Higgins Age: 63" +
      "Gender: Female/nMedical History" +
      "History of Present Illness: Right fractured radius, broken teeth, minor facial bruising, right arm and shoulder minor bruising from a fall outside of house. She did not sustain a concussion (did not hit head) and has no symptoms related to a possible concussion. She has Parkinson disease, arthritis in knees, hearing loss in both ears. She had early onset of Parkinson disease and was in her early 50s when she was diagnosed. She has had arthritis for about 5 years. She normally wears hearing aids and has been wearing them for about a year. " +
      "Allergies: No known allergies" +
      "Blood Pressure: 120/75 (no history of hypertension)" +
      "Dental trauma and history. Dental x-ray in the hospital (Periapical radiograph) indicated her tooth #8 is broken (right side of mouth). She had some bruising around lips. Tooth fractured at middle third. No pulp exposure (nerve not exposed). On-call oral surgeon examined her in the hospital and ordered an x-ray. There is no movement of the tooth. The oral surgeon found that the tooth was not movable, had not moved out of socket and no avulsion. She does not complain of any tooth sensitivity and the oral surgeon recommends follow-up with a general dentist. " +
      "Her teeth and oral cavity look healthy. She regularly brushes and flosses her teeth, but has noticed more dry mouth over time. She is also concerned about future abilities to brush and floss her teeth as her Parkinson disease progresses. " +
      "Medications: Carbidopa/Levodopa controlled-release (Sinemet CR) 50 /250 mg 2 tablets twice a day with entacapone (Comtan) 200 mg 2 tablets twice a day "+
      "Tylenol for knees as needed. She sometimes does not take her medication on time." +
      "At discharge: Ibuprofen 800 mg. every 8 hours as needed. Oxycodone/APAP (Percocet) 2.5/325 mg every 6 hours for break through pain (3 day supply provided)" +
      "Speech/language history: She has noticed that people do not hear her well when she is speaking on the phone (cell phone) and sometimes her sister has complained that it is hard to hear her when they are out eating in a noisy restaurant. She does not have any issues with swallowing, has not noticed any changes to her drinking beverages or eating, and had not had unintentional weight loss. She also has not choked on anything. " +
      "Audiology history: No difference in hearing between her ears. She has had the hearing aids for about a year and hearing loss is age-related. She has not quite developed a habit of wearing them all the time. She does have a history of falling a few times, but has never hit her head or broken anything. She has not experienced any issues with spinning, but has experienced some dizziness." +
      "Mental health: She recognizes some mild depression and anxiety regarding her health, but has not discussed this with a health care provider. Has had some anxiety about falling because she has fallen in the past and that is why she is using her cane more. The move to the local area is a source of stress, anxiety and depression. She is worried about how to walk the dog given she cant use her cane due to the cast for at least two weeks. She is right handed and is also afraid of falling again. No history of mental health issues. Normally, she can walk dog with her cane. Dog was inside the house when she fell and did not escape. Her sister has gone over the feed the dog overnight, but her sister is planning to go on a cruise in 3 days and will be out of town for 2 weeks." +
      "Physical Therapy: She was seen for an initial evaluation when she was diagnosed with Parkinsons disease 10 years ago. She was provided with some exercises which she is unable to recall and has not really done. Her primary form of exercise is walking the dog and does this every day. Over the past year she has had increased difficulty with balance and reports that she has difficulty stopping or turning. She also reports that her dog is pulling her and she sometimes is afraid that the dog will pull her over. She uses her right hand to hold the cane, more in case she loses her balance rather than for support. She has fallen before, but never injured herself. She has fallen in both the bedroom when getting dressed one time, and once in the bathroom getting out of the bathtub. Her hand and fingers are painful due to the current injury and she has difficulty lifting the arm." +
      "Family History: Mother died at 92 (4 years ago) due to “old age” had hypertension in her 80s, and otherwise healthy, Father died at 76 due to heart attack, had undiagnosed heart disease. No other known chronic conditions or unknown, Sister is 58 years old is healthy" +
      "Social History: Smoking: No history of smoking Drinking: Two drinks a year on special occasions. Drug Use: No history of recreational or medicinal drug use" +
      "Living situation: Divorced and no children. She has a 5-year-old dog, a boxer, named Emerson. She recently moved to the area from outside of Boston to be near her sister and out of snow and cold. She is renting an apartment by herself. At present, she is feeling socially isolated. She has spoken with other people in her apartment complex while walking her dog, but is self- conscious about using a cane when she walks him and “looking disabled.” “Im afraid it might be hard to make new friends when they learn about my Parkinson Disease. Also, with my hearing aids, people may not want to talk with me easily." +
      "Occupation: College graduate with masters degree; was an IT manager at a company and “retired” about 4 months ago (early retirement) because of PD. She, and her colleagues, were noticing some cognitive changes, i.e., her thinking “being slower” (finding it harder to follow and comprehend work tasks); she found it hard to keep it up with some deadlines (missed some work deadlines)." +
      "Financially: the company offered her a nice severance package and with savings, she is financially fine for a short time, but is a bit worried about finances because she is not yet eligible for Medicare and is not sure what to do regarding insurance. She was able to buy an insurance plan through the Affordable Care Act. She would like to find other work, even if part time, to help with her finances"
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
          isLoading={isLoading} 
        />
      </div>
      <div className="w-1/5 h-2/3 ml-10 overflow-y-auto"> 
        <LauraDetails onPatientSubmit={handlePatientSubmit} />
      </div>
    </div>
  );
}
