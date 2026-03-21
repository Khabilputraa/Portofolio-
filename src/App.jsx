import React, { useState, useEffect, useRef } from 'react';
import Navbar from './assets/Navbar';
import About from './assets/About';
import Contact from './assets/Contact';
import Hero from './assets/Hero';
import Projects from './assets/Projects';
import Skills from './assets/Skills';
import PortfolioSplash from './assets/Splash';

const cyan = '#00e5c4';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showSplash, setShowSplash]       = useState(true);
  const [splashOut, setSplashOut]         = useState(false);
  const cursorRef = useRef(null);

  /* splash timing — match loader duration */
  useEffect(() => {
    const t1 = setTimeout(() => setSplashOut(true), 4200);
    const t2 = setTimeout(() => setShowSplash(false), 4900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* global custom cursor */
  useEffect(() => {
    const move = (e) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = (e.clientX - 7) + 'px';
      cursorRef.current.style.top  = (e.clientY - 7) + 'px';
    };
    const down = () => { if (cursorRef.current) cursorRef.current.style.transform = 'scale(2.5)'; };
    const up   = () => { if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)'; };
    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup',   up);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup',   up);
    };
  }, []);

  /* active section tracker */
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [showSplash]);

  if (showSplash) {
    return (
      <div style={{
        opacity: splashOut ? 0 : 1,
        transform: splashOut ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        position: 'fixed', inset: 0, zIndex: 9999,
      }}>
        <PortfolioSplash />
      </div>
    );
  }

  return (
    <div style={{ background: '#050505', minHeight: '100vh', position: 'relative' }}>

      {/* global custom cursor */}
      <div ref={cursorRef} style={{
        position: 'fixed', zIndex: 9999,
        width: 14, height: 14,
        background: cyan,
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        transition: 'transform 0.12s ease',
      }} />

      {/* global scanlines */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.055) 3px,rgba(0,0,0,0.055) 4px)',
      }} />

      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* footer */}
      <footer style={{
        borderTop: '1px solid rgba(245,240,232,0.06)',
        padding: '28px clamp(24px,6vw,80px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
        background: '#050505',
      }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'rgba(245,240,232)', letterSpacing: '0.2em' }}>
          © 2026 KHABIL PUTRA PRATAMA
        </span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'rgba(245,240,232)', letterSpacing: '0.15em' }}>
          BUILT WITH REACT &amp; ♥
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: cyan, display: 'inline-block', boxShadow: `0 0 6px ${cyan}`, animation: 'footerPulse 1.8s ease-in-out infinite' }} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: cyan, letterSpacing: '0.2em' }}>
            AVAILABLE FOR WORK
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes footerPulse {
          0%,100% { opacity:1; box-shadow:0 0 6px #00e5c4; }
          50%      { opacity:0.5; box-shadow:0 0 12px #00e5c4; }
        }
      `}</style>
    </div>
  );
}
