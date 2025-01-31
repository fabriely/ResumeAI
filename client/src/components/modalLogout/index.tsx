import React from 'react';
import { signOut } from 'next-auth/react';

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const handleSignOut = () => {
    signOut();  
    onClose();  
  };

  return (
    <div className="fixed -inset-4 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-80">
        <h3 className="text-xl font-semibold mb-4">Deseja sair?</h3>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
            Cancelar
          </button>
          <button onClick={handleSignOut} className="px-4 py-2 text-white bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA] rounded-lg hover:opacity-90">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
