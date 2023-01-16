import { BiX } from "react-icons/bi";
import { useMic } from "../contexts/MicContext";
import microPhoneIcon from "./Images/microphone.svg";
import React, { useState,  useRef } from "react";
import "./Home.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useApp } from "../contexts/AppContext";



const MicModal = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const { isDark } = useApp();
  const {setShowMicModal} = useMic();
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  const handleSend = () => {
    setShowMicModal(false);
  };

  return (
    <div
      className="w-full top-0 left-0 z-[20] absolute bg-black/70 
		flex flex-col items-center justify-center h-screen"
    >
      <div
        onClick={() => setShowMicModal(false)}
        className="w-full h-screen absolute top-0 left-0 z-[25]"
      ></div>
      <div
        className={`flex z-30 flex-col relative mobile:w-2/3 w-11/12 max-w-[600px] rounded-xl p-4 bg-white ${
          isDark && "text-white bg-[#0a0520]"
        }`}
      >
        <BiX
          onClick={() => setShowMicModal(false)}
          className="mobile:text-4xl text-2xl absolute top-1 hover:text-red-600 cursor-pointer right-3"
        />
        <h2 className="text-center mobile:text-xl">Say Something</h2>
        <br/>
        <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <img src={microPhoneIcon} className="microphone-icon" />
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <div className="w-full mt-4 flex items-center justify-evenly">
        <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
          <button className="microphone-reset btn" onClick={handleSend}>
            Send
          </button>
          {/* <button onClick={submitPost}
					 className="px-4 py-2 bg-blue-600 text-white">Post</button> */}
        </div>
          
        </div>
      )}
    </div>


       
       
      </div>
    </div>
  );
};

export default MicModal;