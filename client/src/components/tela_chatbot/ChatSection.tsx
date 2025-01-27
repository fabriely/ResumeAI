import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

interface ChatSectionProps {
  messages: { text: string; isBot: boolean }[];
  className: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({ messages, className }) => {
  const [files, setFiles] = useState<{ name: string; id: number }[]>([]);
  const [activeFile, setActiveFile] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile = { name: file.name, id: Date.now() }; // ID único
      setFiles([...files, newFile]);
      setActiveFile(newFile.id);
    }
  };

  const handleFileRemove = (id: number) => {
    setFiles(files.filter((file) => file.id !== id));
    if (activeFile === id) {
      setActiveFile(files.length > 1 ? files[0].id : null);
    }
  };

  return (
    <div className={`${className} flex flex-col h-full rounded-lg`}>
      {/* Seção de abas */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b">
        <div className="flex space-x-4 overflow-x-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center space-x-2 px-4 py-1 rounded-t-md cursor-pointer ${
                activeFile === file.id ? "bg-gray-200 shadow-sm  text-black" : "bg-gray-50 text-gray-500"
              }`}
              onClick={() => setActiveFile(file.id)}
            >
              <span className="text-sm">{file.name}</span>
              <button
                className="text-black hover:text-black-500"
                onClick={(e) => {
                  e.stopPropagation(); // Evita ativar a aba ao clicar no "X"
                  handleFileRemove(file.id);
                }}
              >
                <AiOutlineClose size={14} />
              </button>
            </div>
          ))}
          {/* Botão de adicionar novo arquivo */}
          <button
            className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <AiOutlinePlus size={20} />
          </button>
        </div>
        <input
          id="file-input"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>


      {/* Seção de mensagens do chat */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 m-2 rounded-lg max-w-[80%] ${
              message.isBot
                ? "bg-gray-200 text-black self-start"
                : "bg-purple-600 text-white self-end"
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
