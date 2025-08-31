import React from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "João Silva",
    role: "Estudante de Engenharia de Produção",
    content: "A plataforma do NUBEEP revolucionou minha forma de estudar. Os quizzes interativos e a gamificação tornaram o aprendizado muito mais envolvente e eficaz. Recomendo para todos os estudantes!",
    image: "/Menina1.png"
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "Membro do NUBEEP",
    content: "Fazer parte do NUBEEP e ter acesso a essa plataforma foi uma experiência incrível. A integração entre teoria e prática através dos desafios é excepcional.",
    image: "/Group 5.png"
  },
  {
    id: 3,
    name: "Pedro Costa",
    role: "Ex-aluno",
    content: "Graças ao NUBEEP e sua plataforma inovadora, consegui me preparar melhor para o mercado de trabalho. A abordagem gamificada tornou o estudo muito mais divertido.",
    image: "/Logo Nubeep.png"
  }
];

export const Testemunhos: React.FC = () => {
  return (
    <section id="testemunhos" className="bg-gray-50 py-32">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-nubeep-blue mb-4">
            Testemunhos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos estudantes e membros têm a dizer sobre a NUBEEP
          </p>
        </div>

        {/* Grid de Testemunhos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              {/* Imagem e Informações */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>

                             {/* Conteúdo do Testemunho */}
               <blockquote className="text-gray-700 leading-relaxed mb-4">
                 &ldquo;{testimonial.content}&rdquo;
               </blockquote>

              {/* Estrelas de Avaliação */}
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Botão para Adicionar Mais Testemunhos */}
        
      </div>
    </section>
  );
};
