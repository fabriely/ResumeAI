import React from 'react';
import Image from 'next/image';
import { Header } from 'components/';
import { Back } from '../../assets';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  return (
    <main className="relative bg-[#F4F0FF] flex flex-col md:flex-row items-center justify-between px-6 py-20 w-full min-h-screen">
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

      {/* Texto principal */}
      <div className="z-0 mt-16 md:mt-0  w-full px-6 sm:px-12 md:px-20 xl:px-32">
        <h2 className="text-[#000000] max-w-5xl text-4xl sm:text-4xl lg:text-5xl 2xl:max-w-4xl xl:max-w-3xl xl:text-6xl font-light leading-tight">
          <span className="text-[#5331CF] font-black">Nós ajudamos</span> a transformar textos detalhados em resumos claros e gráficos visuais impactantes.
        </h2>
        <p className="mt-4 max-w-4xl 2xl:max-w-3xl text-lg 2xl:text-xl text-[#5331CF] text-opacity-65 font-semibold">
          Com nossa ferramenta, você pode transformar textos longos e técnicos em resumos objetivos, fáceis de entender. 
          Além disso, oferecemos a possibilidade de criar gráficos visuais que tornam qualquer dado mais acessível e memorável.
        </p>
        <button 
          className="mt-8 px-6 py-3 rounded-[24px] text-white font-medium bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA] hover:opacity-90"
          onClick={() => router.push("/chatbot")}>
          Comece Agora!
        </button>
      </div>

      <div className="hidden 2xl:block lg:w-[700px] xl:w-[800px]  absolute right-0 bottom-0 md:top-10 lg:top-0 w-full z-0">
        <Image 
          src={Back} 
          alt="Ilustração de uma mulher no computador" 
          className="w-full h-auto"
          layout="responsive" 
          width={900} 
          height={900}
        />
      </div>
    </main>
  );
};

export default Home;
