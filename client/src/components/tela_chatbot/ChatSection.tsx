import React from 'react';

interface ChatSectionProps {
  messages: { text: string, isBot: boolean }[];
  className: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({ messages, className }) => {
  return (
    <div className={`${className} flex flex-col-reverse`}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-3 m-2 rounded-lg max-w-[80%] ${
            message.isBot
              ? 'bg-gray-200 text-black self-start'  
              : 'bg-purple-600 text-white self-end'   
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatSection;
