import Image from "next/image";
import Link from 'next/link';
export const HowWorks: React.FC = () => {
    return (
      <section id="como-funciona" className="bg-background min-h-screen flex items-center justify-center py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-left flex flex-col items-center lg:items-start">
              <h2 className="text-4xl lg:text-5xl font-black text-foreground">
                Como funciona?
              </h2>
              <p className="text-lg text-foreground leading-relaxed max-w-lg">
                Nossa plataforma gamificada transforma o estudo em uma jornada com desafios e recompensas. Aqui, o aprendizado acontece através de quizzes interativos e níveis de dificuldade, que ajudam você a testar e aprofundar seus conhecimentos de forma leve e divertida.
              </p>
              <Link 
                href="/quiz"
                className="bg-primary text-primary-foreground border-nubeep-blue border-2 cursor-pointer hover:bg-nubeep-blue hover:text-white text-xl font-semibold px-16 py-4 rounded-xl hover:bg-primary/90 transition-colors inline-block"
              >
                🧠 Fazer Quiz de Logística
              </Link>
            </div>
            <div className="relative flex justify-center items-center min-h-96">
              
                    <Image
                        src="/MaskGroup.png"
                        alt="Team Background"
                        width={500}
                        height={300}
                        className="object-cover"
                    />
            </div>
          </div>
        </div>
      </section>
    );
  };
  