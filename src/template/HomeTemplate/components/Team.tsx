import React from 'react';
import Image from 'next/image';
export const TeamSection: React.FC = () => {
    return (
        <section id="time" className="bg-nubeep-blue py-32">

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-30 container mx-auto lg:py-0 lg:h-full px-8 lg:px-16">
                <div className="flex items-center justify-center order-1 lg:order-1">
                <Image
                        src="/Group 5.png"
                        alt="Team Background"
                        width={700}
                        height={700}
                    />
                </div>
                <div className="flex items-center justify-center lg:justify-end order-2 lg:order-2">
                    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-4 sm:px-6 lg:px-8 text-left lg:text-left">
                        <div className="text-white space-y-4 sm:space-y-6">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                                Conheça Nosso Time - Gestão 2025
                            </h2>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
                                Núcleo Baiano de Estudantes de Engenharia de Produção
                            </h3>
                            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                                Com uma nova equipe formada por estudantes engajados, o NUBEEP retorna com ainda mais força, buscando promover integração, troca de conhecimentos e desenvolvimento acadêmico e profissional no campo da Engenharia de Produção.
                            </p>
                            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                                Nossa missão é fortalecer o protagonismo estudantil, impulsionar projetos de extensão, pesquisa e eventos, e contribuir para a construção de uma rede sólida entre estudantes, profissionais e instituições.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
