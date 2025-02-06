import React, { useState } from "react";
import api from "services/api";
import { useSession } from "next-auth/react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import MessageInput from "./MessageInput";

interface ChatSectionProps {
  selectedOption: string;
  messages: { text: string; isBot: boolean }[];
  className: string;
  setMessages: React.Dispatch<React.SetStateAction<{ text: string; isBot: boolean }[]>>;
  setSummary: React.Dispatch<React.SetStateAction<string>>;
}

const ChatSection: React.FC<ChatSectionProps> = ({ selectedOption, messages, className, setMessages, setSummary }) => {
  const [files, setFiles] = useState<{ name: string; id: number }[]>([]);
  const [activeFile, setActiveFile] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const { data: session } = useSession();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const newFile = { name: file.name, id: Date.now() };
      setFiles((prev) => [...prev, newFile]);
      setActiveFile(newFile.id);
    }
  };

  const handleSendFile = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("option", selectedOption);

      setMessages((prev) => [
        ...prev,
        { text: `Arquivo "${selectedFile.name}" enviado!. Gerando resumo...`, isBot: true },
      ]);

      try {
        const route = selectedOption === "Resumir" ? "/summarize" : "/analyze";
        const response = await api.post(route, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (selectedOption === "Analisar") {
          const analysis = response.data.image_base64;
          const imageElement = document.createElement("img");
          imageElement.src = `data:image/png;base64,${analysis}`;
          document.getElementById("image-container")?.appendChild(imageElement);
          setSummary(analysis);
        } else if (selectedOption === "Resumir") {
          const summary = response.data.summary_data;
          if (summary && summary.summary_content) {
            setSummary(summary.summary_content);
          }
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: "Erro ao processar o arquivo. Tente novamente.", isBot: true },
        ]);
      }
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, isBot: false }]);
      const userMessage = message;
      setMessage('');

      try {
        if (userMessage.startsWith('Resumo:')) {
          const textToSummarize = userMessage.replace('Resumo:', '').trim();
          const response = await api.post('/summarize/message', { message: textToSummarize });
          const summary = response.data.summary_data.summary_content;
          setSummary(summary);
        } else {
          const response = await api.post('/messages/', { message: userMessage });
          const botMessage = response.data.message;
          setMessages(prevMessages => [
            ...prevMessages,
            { text: botMessage, isBot: true }
          ]);
        }
      } catch (error) {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Erro ao enviar a mensagem. Tente novamente.', isBot: true }
        ]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(); 
    }
  };

  return (
    <div className={`${className} flex flex-col h-full rounded-lg`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 ">
        <div className="flex space-x-4 overflow-x-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center space-x-2 px-4 py-1 rounded-t-md cursor-pointer ${activeFile === file.id ? "bg-gray-200 shadow-sm text-black" : "bg-gray-50 text-gray-500"}`}
              onClick={() => setActiveFile(file.id)}
            >
              <span className="text-sm">{file.name}</span>
              <button
                className="text-black hover:text-black-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles((prev) => prev.filter((f) => f.id !== file.id));
                  setActiveFile((prev) => (files.length > 1 ? files[0].id : null));
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

      <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-white">
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
      <MessageInput
        message={message}
        setMessage={setMessage}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
        handleSendFile={handleSendFile}
        selectedFile={selectedFile}
        className="p-4 bg-white border-t-2 rounded-sm"
      />
    </div>
  );
};

export default ChatSection;
