import React, { useState, useEffect } from 'react';
import Navbar from './assets/Navbar';
import About from './assets/About';
import Contact from './assets/Contact';
import Hero from './assets/Hero';
import Projects from './assets/Projects';
import Skills from './assets/Skills';
import PortfolioSplash from './assets/Splash';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4500); // Splash akan hilang setelah 4.5 detik

    return () => clearTimeout(timer);
  }, []);

  // Jika splash masih tampil, return splash screen
  if (showSplash) {
    return <PortfolioSplash />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>
      
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="container mx-auto px-4 relative z-10">
        <section id="home" className="min-h-screen flex items-center">
          <Hero />
        </section>
        
        <section id="about" className="min-h-screen flex items-center py-20">
          <About />
        </section>
        
        <section id="skills" className="min-h-screen flex items-center py-20">
          <Skills />
        </section>
        
        <section id="projects" className="min-h-screen flex items-center py-20">
          <Projects />
        </section>
        
        <section id="contact" className="min-h-screen flex items-center py-20">
          <Contact />
        </section>
      </main>
      
      <footer className="bg-slate-950 text-slate-400 py-8 text-center">
        <p>&copy; 2025 Khabil. All rights reserved.</p>
      </footer>
    </div>
  );
}