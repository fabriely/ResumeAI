import React, { useState } from 'react';
import { Resumir, Analisar, OCR } from '../../assets';
import Image from 'next/image';

interface FileSectionProps {
  fileName: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const FileSection: React.FC<FileSectionProps> = ({ fileName, handleFileChange, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full border-2 border-gray-500 flex flex-col items-center justify-start p-4 rounded-lg">
      {/* Dropdown de seleção */}
      <div className="w-full mb-4">
        <label className="block mb-2 text-gray-700 font-medium">Escolha uma opção:</label>
        <div className="relative">
          <div
            className="w-full rounded-lg px-4 py-2 bg-white shadow-md text-black text-xl font-semibold cursor-pointer flex items-center justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center">
              {selectedOption === 'Resumir' && <Image src={Resumir} alt="Resumir Icon" width={26} height={26} className="mr-2" />}
              {selectedOption === 'Analisar' && <Image src={Analisar} alt="Analisar Icon" width={24} height={24} className="mr-2" />}
              {selectedOption === 'OCR' && <Image src={OCR} alt="OCR Icon" width={24} height={24} className="mr-2" />}
              {selectedOption}
            </span>
            <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 z-10">
              <div className="flex items-center px-4 py-2 text-black cursor-pointer hover:bg-gray-100" onClick={() => handleOptionChange('Resumir')}>
                <Image src={Resumir} alt="Resumir Icon" width={26} height={26} className="mr-2" />
                Resumir
              </div>
              <div className="flex items-center px-4 py-2 text-black cursor-pointer hover:bg-gray-100" onClick={() => handleOptionChange('Analisar')}>
                <Image src={Analisar} alt="Analisar Icon" width={24} height={24} className="mr-2" />
                Analisar
              </div>
              <div className="flex items-center px-4 py-2 text-black cursor-pointer hover:bg-gray-100" onClick={() => handleOptionChange('OCR')}>
                <Image src={OCR} alt="OCR Icon" width={24} height={24} className="mr-2" />
                OCR
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileSection;
