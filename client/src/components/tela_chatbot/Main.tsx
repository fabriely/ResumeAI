'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import FileSection from './FileSection';
import ChatSection from './ChatSection';
import MessageInput from './MessageInput';

const ChatbotHeader: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, isBot: boolean }[]>([]);
  const [message, setMessage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  // Mensagem inicial do bot
  useEffect(() => {
    setMessages([
      { text: 'Olá, seja bem-vindo ao ResumeAI, basta digitar o que você deseja fazer, entre resumir ou traduzir e enviar seu arquivo ao lado no formato PDF ou WORD.', isBot: true }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, isBot: false }]); // Adiciona a mensagem do usuário
      setMessage('');
      // Simulação de uma resposta do bot
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Estou aqui para ajudar!', isBot: true }
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(); 
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileName(file.name); 
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-start">
      <Header />
  
      <div className="flex p-8 space-x-8 h-full mt-[64px] w-full max-w-screen-xl">
        <FileSection fileName={fileName} handleFileChange={handleFileChange} />
  
        <div className="flex flex-col w-1/2 h-[800px] border-2 border-gray-500 rounded-lg">
          <ChatSection 
            messages={messages} 
            className="flex-1 bg-blue-50 overflow-y-auto p-4" 
          />
  
          <div className="p-4 bg-gray-100 border-t-2">
            <MessageInput 
              message={message} 
              setMessage={setMessage} 
              handleKeyPress={handleKeyPress} 
              handleSendMessage={handleSendMessage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotHeader;
