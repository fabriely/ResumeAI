import React from 'react';

interface FileSectionProps {
  fileName: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileSection: React.FC<FileSectionProps> = ({ fileName, handleFileChange }) => {
  return (
    <div className="w-1/2 h-[800px] border-2 border-gray-500 flex items-center justify-center text-lg cursor-pointer rounded-lg">
      <label htmlFor="file-input" className="cursor-pointer text-center text-blue-600">
        Adicionar Arquivo
      </label>
      <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
      {fileName && <p className="text-center text-gray-600">Arquivo Selecionado: {fileName}</p>}
    </div>
  );
};

export default FileSection;
