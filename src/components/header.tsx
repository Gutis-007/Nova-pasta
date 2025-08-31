'use client';

import { useState } from 'react';

export default function Header() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSobreOpen, setIsSobreOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-nubeep-blue text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-8 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="../Logo Nubeep.png" 
              alt="Nubeep Logo" 
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Quiz Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 hover:text-blue-200 transition-colors py-2"
                onMouseEnter={() => setIsQuizOpen(true)}
                onMouseLeave={() => setIsQuizOpen(false)}
              >
                <span>Quiz</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50 transition-all duration-200 ${
                  isQuizOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setIsQuizOpen(true)}
                onMouseLeave={() => setIsQuizOpen(false)}
              >
                <a href="/quiz" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                  🧠 Fazer Quiz de Logística
                </a>
                <a href="/quiz" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                  📊 Ver Resultados
                </a>
                <a href="/quiz" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                  🎯 Escolher Nível
                </a>
              </div>
            </div>

            {/* Sobre Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 hover:text-blue-200 transition-colors py-2"
                onMouseEnter={() => setIsSobreOpen(true)}
                onMouseLeave={() => setIsSobreOpen(false)}
              >
                <span>Sobre</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50 transition-all duration-200 ${
                  isSobreOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setIsSobreOpen(true)}
                onMouseLeave={() => setIsSobreOpen(false)}
              >
                <button 
                  onClick={() => scrollToSection('proposito')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  🎯 Nosso Propósito
                </button>
                <button 
                  onClick={() => scrollToSection('time')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  👥 Nosso Time
                </button>
                <button 
                  onClick={() => scrollToSection('como-funciona')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  ⚙️ Como Funciona
                </button>
                <button 
                  onClick={() => scrollToSection('testemunhos')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  💬 Testemunhos
                </button>
              </div>
            </div>

            {/* Contato */}
            <button 
              onClick={() => scrollToSection('contato')}
              className="hover:text-blue-200 transition-colors"
            >
              Contato
            </button>

            {/* Quiz Direto */}
            <a 
              href="/quiz"
              className="bg-white text-nubeep-blue px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              🧠 Quiz
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
} 