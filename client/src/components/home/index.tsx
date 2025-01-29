import React from 'react';
import { Logo, Phone } from '../../assets';
import Image from 'next/image';
import LoginModal from 'components/modalLogin';
import { Button } from 'components/ui/button';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [showLoginModal, setShowLoginModal] = React.useState(false);
    const router = useRouter();
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-start">
    <header className="w-full h-[64px] flex justify-between items-center px-8 py-4 bg-white shadow-md fixed top-0 z-50">
      <div className="flex items-center space-x-8">
        <Image src={Logo} alt="Logo do ResumeAI" width={170} />
        <nav className="space-x-4">
        <a href="#features" className="text-gray-700 font-medium hover:text-[#4b52d1]">Ferramentas</a>
        <a href="#pricing" className="text-gray-700 font-medium hover:text-[#4b52d1]">Preços</a>
        <a href="#help" className="text-gray-700 font-medium hover:text-[#4b52d1]">Ajuda</a>
        </nav>
      </div>
    <div className="flex items-center space-x-4">
      <button className='bg-white text-black font-medium shadow-none' onClick={() => setShowLoginModal(true)}>Login</button>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      <Button className="text-white px-4 py-2 rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
      onClick={() => router.push('/chatbot')}>
        Comece a Usar Agora!
      </Button>
    </div>
    </header>

    <main className="flex items-center justify-center text-center mt-16 w-full px-[20px]">
    <div className="flex w-[600px] h-[500px] flex-col gap-[32px] items-start">
        <h2 className="text-[#4b52d1] text-center font-[Albert Sans] text-7xl font-extrabold">Teste Agora!</h2>
        <div className="bg-[#4b52d1] h-[18px] w-[400px] ml-16"></div>
        <ul className="text-xl text-[#4b52d1] space-y-4 font-[Arial] text-justify">
        <li>Economize tempo e energia deixando o ResumeAI resumir esses textos e documentos longos e cansativos para você!</li>
        <li>Realize análises profundas e significativas de textos e documentos com apenas um clique!</li>
        <li>Extraia texto de imagens e documentos usando nossa ferramenta OCR.</li>
        </ul>
      </div>
    <div className="">
      <Image src={Phone}
      alt="ResumAI Mockup"
      className="w-[440px] h-[700px]"
      />
    </div>
    </main>
    </div>
  );
};

export default Home;
