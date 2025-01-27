import React from 'react';
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
  return (
    <div className={`${className} flex items-center space-x-4`}>
      <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyPress}
      className="w-full p-2 rounded bg-white text-black outline-none focus:ring-0 resize-none"
      placeholder="Digite sua mensagem..."
      style={{ height: '100px' }}
      />
      <button
      onClick={handleSendMessage}
      className="w-16 h-8 text-white rounded transition-all flex items-center justify-center"
      >
      <Image src={Send} alt="Send Icon" className="w-8 h-8" />
      </button>
    </div>
  );
};

export default MessageInput;
