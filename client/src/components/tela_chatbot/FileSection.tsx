import React, { useState } from 'react';
import { Resumir, Analisar, OCR } from '../../assets';
import Image from 'next/image';

interface FileSectionProps {
  fileName: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileSection: React.FC<FileSectionProps> = ({ fileName, handleFileChange }) => {
  const [option, setOption] = useState<string>('Resumir');
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (selectedOption: string) => {
    setOption(selectedOption);
    setIsOpen(false);  // Fecha o dropdown após selecionar uma opção
  };

  return (
    <div className="w-1/2 h-[800px] border-2 border-gray-500 flex flex-col items-center justify-start p-4 rounded-lg">
      {/* Dropdown Customizado */}
      <div className="w-full mb-4">
        <label htmlFor="action-select" className="block mb-2 text-gray-700 font-medium">
        </label>
        <div className="relative">
          {/* Div que funciona como botão de dropdown */}
          <div
            className="w-full rounded-lg px-4 py-2 bg-white shadow-md text-black text-xl font-semibold cursor-pointer flex items-center justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center">
              {option === 'Resumir' && <Image src={Resumir} alt="Resumir Icon" width={26} height={26} className="mr-2" />}
              {option === 'Analisar' && <Image src={Analisar} alt="Analisar Icon" width={24} height={24} className="mr-2" />}
              {option === 'OCR' && <Image src={OCR} alt="OCR Icon" width={24} height={24} className="mr-2" />}
              {option}
            </span>
            <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
          </div>

          {/* Opções do Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 z-10">
              <div
                className="flex items-center px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionChange('Resumir')}
              >
                <Image src={Resumir} alt="Resumir Icon" width={26} height={26} className="mr-2" />
                Resumir
              </div>
              <div
                className="flex items-center px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionChange('Analisar')}
              >
                <Image src={Analisar} alt="Analisar Icon" width={24} height={24} className="mr-2" />
                Analisar
              </div>
              <div
                className="flex items-center px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionChange('OCR')}
              >
                <Image src={OCR} alt="OCR Icon" width={24} height={24} className="mr-2" />
                OCR
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seção de seleção de arquivo */}
      <label htmlFor="file-input" className="cursor-pointer text-center text-blue-600">
        Adicionar Arquivo
      </label>
      <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
      {fileName && <p className="text-center text-gray-600 mt-4">Arquivo Selecionado: {fileName}</p>}
    </div>
  );
};

export default FileSection;
