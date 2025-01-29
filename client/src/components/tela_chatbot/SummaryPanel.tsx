import React from "react";
import FileSection from "./FileSection";

interface SummaryPanelProps {
  summary: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({ summary, selectedOption, setSelectedOption, handleFileChange }) => {
  return (
    <div className="w-1/2 bg-gray-100 p-4 rounded-lg h-full flex flex-col shadow-md">
      <FileSection selectedOption={selectedOption} setSelectedOption={setSelectedOption} handleFileChange={handleFileChange} fileName="" />

      <div className="mt-4 p-3 bg-white rounded-lg shadow-md overflow-auto h-full">
        <h3 className="font-bold text-lg">Resumo</h3>
        {summary ? (
          <p className="mt-2 text-gray-800">{summary}</p>
        ) : (
          <p className="mt-2 text-gray-500 italic">Nenhum resumo gerado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default SummaryPanel;
