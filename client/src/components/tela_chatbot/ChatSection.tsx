import React, { useState } from "react";
import api from "services/api";
import { useSession } from "next-auth/react";
import { Plus, X } from "lucide-react";
import MessageInput from "./MessageInput";


interface ChatSectionProps {
  selectedOption: string;
  messages: { text: string; isBot: boolean }[];
  className: string;
  setMessages: React.Dispatch<React.SetStateAction<{ text: string; isBot: boolean }[]>>;
  setSummary: React.Dispatch<React.SetStateAction<string>>;
}

const ChatSection: React.FC<ChatSectionProps> = ({ selectedOption, messages, className, setMessages, setSummary }) => {
  const [files, setFiles] = useState<{ name: string; id: number; file: File }[]>([]);
  const [activeFile, setActiveFile] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
  const { data: session } = useSession();
  const key = String(selectedOption) as keyof typeof states_dictionary;
  let states_dictionary={ 
    "Resumir":["resumo"], 
    "Analisar":["análise"], 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile = { name: file.name, id: Date.now(), file };
      setFiles((prev) => [...prev, newFile]);
      setActiveFile(newFile.id);
      e.target.value = ''; // Reset the file input value
    }
  };

  const handleSendFile = async () => {
    if (activeFile !== null) {
      const selectedFile = files.find(file => file.id === activeFile)?.file;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("option", selectedOption);

        setMessages((prev) => [
          ...prev,
          { text: `Arquivo "${selectedFile.name}" enviado!. Gerando "${states_dictionary[key][0]}"...`, isBot: true },
        ]);
        setActiveFile(null);

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
            setSummaries((prev) => ({ ...prev, [activeFile]: analysis }));
  
            setMessages((prev) => [
            ...prev,
            { text: `Resultado gerado para o arquivo, veja ao lado! Qualquer coisa, pode falar, estamos aqui para ajudar`, isBot: true },
          ]);

        } else if (selectedOption === "Resumir") {
            // Condicional para garantir que só processe um resumo
            const summary = response.data.summary_data;
            if (summary && summary.summary_content) {
              setSummary(summary.summary_content);
              setSummaries((prev) => ({ ...prev, [activeFile]: summary.summary_content }));

              // Enviar o resumo para o backend e associar ao perfil do usuário
              if (session?.user?.email) {
                await api.post(`/users/${session.user.email}/summaries/`, { content: summary });
                setMessages((prev) => [
                  ...prev,
                  { text: `Resultado gerado para o arquivo, veja ao lado!`, isBot: true },
                ]);
              } else {
                setMessages((prev) => [
                  ...prev,
                  { text: `Resultado gerado para o arquivo, veja ao lado! Qualquer coisa, pode falar, estamos aqui para ajudar`, isBot: true },
                ]);
              }
            }
          } else {
            setMessages((prev) => [
              ...prev,
              { text: "Nenhum resumo gerado. Tente novamente.", isBot: true },
            ]);
          }
        } catch (error) {
          setMessages((prev) => [
            ...prev,
            { text: "Erro ao processar o arquivo. Tente novamente.", isBot: true },
          ]);
        }
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

  const handleCloseFile = (fileId: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    setActiveFile((prevState: number | null) => {
      const remainingFiles = files.filter((f) => f.id !== fileId);
      if (remainingFiles.length > 0) {
        const nextActiveFile = remainingFiles[0].id;
        setSummary(summaries[nextActiveFile] || "");
        return nextActiveFile;
      } else {
        setSummary("");
        return null;
      }
    });
  };

  return (
    <div className={`${className} flex flex-col h-full rounded-lg`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 ">
        <div className="flex space-x-4 overflow-x-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center space-x-2 px-4 py-1 rounded-t-md cursor-pointer ${activeFile === file.id ? "bg-gray-200 shadow-sm text-black" : "bg-gray-50 text-gray-500"}`}
              onClick={() => {
                setActiveFile(file.id);
                setSummary(summaries[file.id] || "");
              }}
            >
              <span className="text-sm">{file.name}</span>
              <button
                className="text-black hover:text-black-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseFile(file.id);
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <button
            className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA] text-white rounded-full"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <Plus size={20} />
          </button>
        </div>
        <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 m-2 rounded-lg max-w-[80%] ${message.isBot ? "bg-gray-200 text-black self-start" : "bg-purple-600 text-white self-end"
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
        activeFile={activeFile}
        files={files}
        className="p-4 bg-white border-t-2 rounded-sm"
      />
          </div>
  );
};

export default ChatSection;
