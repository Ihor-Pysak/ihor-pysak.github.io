'use client';
import React from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import MarqueeStrip from '../components/MarqueeStrip';
import CaseStudy from '../components/CaseStudy';
import Ralice from '../components/Ralice';
import Work from '../components/Work';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <MarqueeStrip />
      <CaseStudy />
      <Ralice />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
