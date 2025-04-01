'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import ChatSection from './ChatSection';
import SummaryPanel from './SummaryPanel';

const ChatbotHeader: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, isBot: boolean }[]>([]);
  const [summary, setSummary] = useState<string>(''); // Gerenciar o resumo aqui
  const [selectedOption, setSelectedOption] = useState<string>('Resumir'); // Aqui definimos o estado selecionado para "Resumir"

  useEffect(() => {
    setMessages([
      { text: 'Olá, seja bem-vindo ao ResumeAI! Envie um arquivo para obter um resumo.', isBot: true },
      { text: 'Caso queira resumir um texto escrito no chat, escreva "Resumo: " seguido do texto.', isBot: true }
    ]);
  }, []);


  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-start">
      <Header />
      <div className="flex p-8 space-x-8 h-full mt-[64px] w-full max-w-screen">
        <SummaryPanel summary={summary} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <div className="flex flex-col w-1/2 h-[800px] border-2 border-gray-500 rounded-lg">
          <ChatSection 
            selectedOption={selectedOption}
            messages={messages} 
            setMessages={setMessages} 
            className="flex-1 bg-white overflow-y-auto p-4" 
            setSummary={setSummary}  // Passar setSummary para ChatSection
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotHeader;
