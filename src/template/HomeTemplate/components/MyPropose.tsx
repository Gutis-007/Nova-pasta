import React from 'react';

interface PurposeCardProps {
    image: string;
    title: string;
    description: string;
  }
  
  export const PurposeCard: React.FC<PurposeCardProps> = ({ image, title, description }) => {
    return (
      <article className="flex flex-col text-center max-w-sm">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-2xl"
        />
        <h3 className="text-2xl font-bold mt-4 text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
          {description}
        </p>
      </article>
    );
  };
  

export const PurposeSection: React.FC = () => {
  const purposes = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/6ca9a5ebfabc8607b432233dc2a110c8a0a11bc8?placeholderIfAbsent=true",
      title: "Missão",
      description: "Conectar pessoas, ideias e oportunidades. Ser ponte entre estudantes e o mercado, promovendo crescimento, aprendizado e experiências transformadoras."
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a25c7948a883eab0730710cfd9852feb04673c6a?placeholderIfAbsent=true",
      title: "Visão",
      description: "Ser reconhecido na Bahia como um núcleo que fortalece e valoriza a Engenharia de Produção por meio de ações que gerem conhecimento e oportunidades."
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/79b9c4fc3042006f6db289f52dee133d780f9f8e?placeholderIfAbsent=true",
      title: "Valores",
      description: "Garra para enfrentar desafios\nUnião e colaboração\nComprometimento\nTransparência\nRespeito e ética"
    }
  ];

  return (
    <section id="proposito" className="py-32 mb-16 bg-background">
      <div className="container mx-auto px-8 lg:px-16">
        <h2 className="text-4xl font-bold text-center text-foreground mb-16">
          Nosso Propósito
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {purposes.map((purpose, index) => (
            <PurposeCard key={index} {...purpose} />
          ))}
        </div>
      </div>
    </section>
  );
};
