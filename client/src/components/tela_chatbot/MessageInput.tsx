import React from 'react';

interface MessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  className?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ message, setMessage, handleKeyPress, handleSendMessage, className }) => {
  return (
    <div className={`message-input ${className} flex items-center space-x-4`}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full p-2 border rounded"
        placeholder="Digite sua mensagem..."
      />
      <button
        onClick={handleSendMessage}
        className="w-16 h-8 bg-purple-600 text-white border-2 border-purple-600 rounded transition-all"
      >
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
