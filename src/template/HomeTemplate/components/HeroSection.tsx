import React from 'react';
import { Cards } from "@/components/Cards";
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  const stats = [
    {
      icon: "instagram",
      value: "+2060",
      label: "Seguidores no Instagram"
    },
    {
      icon: "team",
      value: "14",
      label: "Membros na equipe"
    },
    {
      icon: "location",
      value: "+6 ",
      label: "Cidades da Bahia"
    }
  ];
  return (
    <section className="relative flex flex-col items-start pt-20 pb-16">
      {/* Background Image */}
      <svg 
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 1322 455" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path 
          d="M0 0L1522 4.64916e-06V555C1393.96 454.808 1011.33 396.102 520.671 396.102C128.142 396.102 10.0033 250.251 0 177.325V0Z" 
          fill="#0352A3"
        />
      </svg>
      <div className="relative z-2 container mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="flex justify-center lg:justify-start">
            <img
              src="../Menina1.png"
              alt="NUBEEP Logo"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
          <div className="text-white space-y-8 px-4 lg:px-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Núcleo Baiano de Estudantes de Engenharia de Produção - NUBEEP
              </h1>
              <p className="text-lg leading-relaxed max-w-lg">
                Somos uma entidade estudantil sem fins lucrativos, apoiada pela ABEPRO Jovem, que conecta estudantes da Engenharia de Produção com o mercado e com oportunidades transformadoras.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/quiz"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  🧠 Fazer Quiz de Logística
                </Link>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>
        </div>
        <Cards stats={stats} />
      </div>
    </section>
  );
};
