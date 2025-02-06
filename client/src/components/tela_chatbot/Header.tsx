import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';  // Importando o useRouter e usePathname
import { Logo } from '../../assets';
import ProfileModal from '../modalProfile';
import LoginModal from '../modalLogin';
import LogoutModal from '../modalLogout';

const Header: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showProfileModal, setShowProfileModal] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const { data: session } = useSession();
  const router = useRouter(); // Utilizando o useRouter para acessar a rota atual
  const pathname = usePathname(); // Utilizando o usePathname para acessar o caminho atual

  const handleChatbotClick = () => {
    router.push('/chatbot'); // Navega para a página de chatbot
  };

  return (
    <header className="w-full h-[64px] flex justify-between items-center px-8 py-4 bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center space-x-8">
        <a href="/">
          <Image src={Logo} alt="Logo do ResumeAI" width={170} />
        </a>
        <nav className="space-x-4">
          <a href="#pricing" className="text-gray-700 font-medium hover:text-[#4b52d1]">Preços</a>
          <a href="#help" className="text-gray-700 font-medium hover:text-[#4b52d1]">Ajuda</a>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {pathname === '/mydocuments' && (
          <button
            onClick={handleChatbotClick} // Redireciona para a página de chatbot
         className="text-black font-medium hover:text-zinc-700">
            Chatbot
          </button>
        )}

        {session ? (
          <>
            {pathname === '/' && (
              <button
          onClick={handleChatbotClick} // Redireciona para a página de chatbot
          className="text-black font-medium hover:text-zinc-700"
              >
          Chatbot
              </button>
            )}
            <button
              onClick={() => setShowProfileModal(true)}
              className="px-4 py-2 rounded-[24px] text-white font-medium bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA] hover:opacity-90"
            >
              Meu Perfil
            </button>
            {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
            
            <button
              onClick={() => setShowLogoutModal(true)}
              className="text-gray-700 font-medium hover:text-[#a219ca]"
            >
              Sair
            </button>
            {showLogoutModal && <LogoutModal onClose={() => setShowLogoutModal(false)} />}
          </>
        ) : (
          <>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 rounded-[24px] text-white font-medium bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA] hover:opacity-90"
            >
              Login
            </button>
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
