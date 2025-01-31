import React, { useState } from 'react';  
import Image from 'next/image';
import Send from '../../assets/Send.png';

interface MessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  className?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ message, setMessage, handleKeyPress, handleSendMessage, className }) => {
  const [error, setError] = useState<string | null>(null); 

  const validateAndSend = () => {
    if (message.trim() === '') { 
      setError('Por favor, digite uma mensagem ou envie um arquivo.'); 
    } else {
      setError(null); 
      handleSendMessage(); 
    }
  };

  return (
    <div className={`${className} flex flex-col space-y-2`}>
      <div className="flex items-center space-x-4">
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setError(null); 
          }}
          onKeyDown={handleKeyPress}
          className="w-full p-2 rounded bg-white text-black outline-none focus:ring-0 resize-none"
          placeholder="Digite sua mensagem..."
          style={{ height: '100px' }}
        />
        <button
          onClick={validateAndSend}
          className="w-16 h-8 text-white rounded transition-all flex items-center justify-center"
        >
          <Image src={Send} alt="Send Icon" className="w-8 h-8" />
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default MessageInput;
