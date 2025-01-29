'use client';
import React, { useEffect, useState } from "react";
import { marked } from "marked";  
import FileSection from "./FileSection";

interface SummaryPanelProps {
  summary: string | Promise<string>;  
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
} 

const SummaryPanel: React.FC<SummaryPanelProps> = ({ summary, selectedOption, setSelectedOption }) => {
  const [formattedSummary, setFormattedSummary] = useState<string>("");

  useEffect(() => {
    const fetchSummary = async () => {
      // Verifica se o summary é uma Promise e aguarda a resolução
      const resolvedSummary = await (summary instanceof Promise ? summary : Promise.resolve(summary));
      const htmlContent = marked(resolvedSummary); // Converte o resumo em Markdown para HTML
      setFormattedSummary(String(htmlContent)); // Atualiza o estado com o HTML gerado
    };

    fetchSummary(); // Chama a função assíncrona
  }, [summary]);

  return (
    <div className="w-1/2 bg-gray-100 p-4 rounded-lg h-full flex flex-col shadow-md">
      <FileSection selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      <div className="mt-4 p-3 bg-white rounded-lg shadow-md overflow-auto h-full">
        <h3 className="font-bold text-lg">Resumo</h3>
        {/* Exibir o resumo convertido para HTML */}
        {formattedSummary ? (
          <div className="mt-2 text-gray-800" dangerouslySetInnerHTML={{ __html: formattedSummary }} />
        ) : (
          <p className="mt-2 text-gray-500 italic">Nenhum resumo gerado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default SummaryPanel;
