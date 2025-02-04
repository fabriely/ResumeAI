'use client';
import React, { useEffect, useState } from "react";
import { marked } from "marked";  
import FileSection from "./FileSection";

interface SummaryPanelProps {
  summary: string | Promise<string>;  
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;  // Recebendo a função de update
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({ summary, selectedOption, setSelectedOption }) => {
  const [formattedSummary, setFormattedSummary] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Function to check if a string is a base64 image
  const isBase64Image = (str: string) => {
    return /^data:image\/(png|jpeg|jpg|gif|bmp|svg\+xml);base64,/.test(str);
  };

  useEffect(() => {
    const fetchSummary = async () => {
      if (selectedOption === "Resumir" || selectedOption === "Analisar") {
        const resolvedSummary = await (summary instanceof Promise ? summary : Promise.resolve(summary));
        
        if (resolvedSummary && resolvedSummary.startsWith("/9j") || resolvedSummary.length > 100) { 
          // Adiciona o prefixo correto para base64
          setImageSrc(`data:image/png;base64,${resolvedSummary}`);
          setFormattedSummary("");  
        } else {
          const htmlContent = marked(resolvedSummary); // Convert the text/markdown summary to HTML
          setFormattedSummary(String(htmlContent));
          setImageSrc(null); // Ensure the image source is cleared if it's not an image
        }
      }
    };

    fetchSummary();
  }, [summary, selectedOption]);

  return (
    <div className="w-1/2 bg-gray-100 p-4 rounded-lg h-full flex flex-col shadow-md">
      <FileSection selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      <div className="mt-4 p-3 bg-white rounded-lg shadow-md overflow-auto h-full">
        <h3 className="font-bold text-lg">Resumo</h3>
        {/* Conditionally render based on the content type */}
        {imageSrc ? (
          <div className="mt-2">
            <img src={imageSrc} alt="Summary Image" className="max-w-full h-auto" />
          </div>
        ) : formattedSummary ? (
          <div className="mt-2 text-gray-800" dangerouslySetInnerHTML={{ __html: formattedSummary }} />
        ) : (
          <p className="mt-2 text-gray-500 italic">Nenhum resumo gerado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default SummaryPanel;
