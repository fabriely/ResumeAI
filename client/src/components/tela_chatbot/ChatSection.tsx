import React, { useState } from "react";
import api from "services/api";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import FileSection from "./FileSection";

interface ChatSectionProps {
  messages: { text: string; isBot: boolean }[];
  className: string;
  setMessages: React.Dispatch<React.SetStateAction<{ text: string; isBot: boolean }[]>>;
}

const ChatSection: React.FC<ChatSectionProps> = ({ messages, className, setMessages }) => {
  const [files, setFiles] = useState<{ name: string; id: number }[]>([]);
  const [activeFile, setActiveFile] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("Resumir"); // Opção selecionada

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile = { name: file.name, id: Date.now() };
      setFiles([...files, newFile]);
      setActiveFile(newFile.id);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("option", selectedOption); // Envia a opção escolhida para o backend

      try {
        const response = await api.post("summarize/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Resposta da API:", response.data); // Debug

        setMessages((prev) => [
          ...prev,
          { text: `Arquivo "${file.name}" enviado (${selectedOption}). Resumo gerado:`, isBot: false },
          { text: response.data.summary, isBot: true },
        ]);
      } catch (error) {
        console.error("Erro ao processar arquivo", error);
        setMessages((prev) => [
          ...prev,
          { text: "Erro ao processar o arquivo. Tente novamente.", isBot: true },
        ]);
      }
    }
  };

  return (
    <div className={`${className} flex flex-col h-full rounded-lg`}>
      {/* Adicionando FileSection acima da aba de arquivos */}
      <FileSection fileName={files.length > 0 ? files[0].name : ""} handleFileChange={handleFileChange} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

      {/* Seção de abas de arquivos */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b">
        <div className="flex space-x-4 overflow-x-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center space-x-2 px-4 py-1 rounded-t-md cursor-pointer ${
                activeFile === file.id ? "bg-gray-200 shadow-sm text-black" : "bg-gray-50 text-gray-500"
              }`}
              onClick={() => setActiveFile(file.id)}
            >
              <span className="text-sm">{file.name}</span>
              <button
                className="text-black hover:text-black-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles(files.filter((f) => f.id !== file.id));
                  setActiveFile(files.length > 1 ? files[0].id : null);
                }}
              >
                <AiOutlineClose size={14} />
              </button>
            </div>
          ))}
          <button
            className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <AiOutlinePlus size={20} />
          </button>
        </div>
        <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
      </div>

      {/* Seção de mensagens do chat */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 m-2 rounded-lg max-w-[80%] ${
              message.isBot ? "bg-gray-200 text-black self-start" : "bg-purple-600 text-white self-end"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSection;
