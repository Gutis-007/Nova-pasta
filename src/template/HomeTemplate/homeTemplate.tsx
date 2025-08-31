import React from 'react';
import Header from "@/components/header";
import { HeroSection } from "@/template/HomeTemplate/components/HeroSection"; 
import {PurposeSection} from "@/template/HomeTemplate/components/MyPropose"
import { TeamSection } from './components/Team';
import { HowWorks } from './components/HowWorks';
import { Testemunhos } from './components/Testemunhos';
import { ContactSection } from './components/contact';
import { Footer } from './components/Footer';
export const HomeTemplate: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <PurposeSection/>
      <TeamSection/>
      <HowWorks/>
      <Testemunhos/>
      <ContactSection/>
      <Footer/>
    </div>
  );
};
  