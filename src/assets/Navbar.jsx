import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const cyan = '#00e5c4';
const white = '#f5f0e8';
const dim = 'rgba(245,240,232)';

export default function Navbar({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home',     label: 'Home',     index: '00' },
    { id: 'about',    label: 'About',    index: '01' },
    { id: 'skills',   label: 'Skills',   index: '02' },
    { id: 'projects', label: 'Projects', index: '03' },
    { id: 'contact',  label: 'Contact',  index: '04' },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setIsOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,240,232,0.06)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}>
        {/* scanline strip */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.05) 3px,rgba(0,0,0,0.05) 4px)',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'relative' }}>

          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 1, padding: 0 }}
          >
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: cyan, letterSpacing: '-0.03em', lineHeight: 1 }}>K</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: white, letterSpacing: '-0.03em', lineHeight: 1 }}>habil</span>
          </button>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
            {navItems.map(({ id, label, index }) => {
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    position: 'relative',
                  }}
                >
                  <span style={{
                    fontFamily: "'Space Mono',monospace", fontSize: 9,
                    color: active ? cyan : 'rgba(245,240,232,0.2)',
                    letterSpacing: '0.2em',
                    transition: 'color 0.3s ease',
                  }}>{index}</span>
                  <span style={{
                    fontFamily: "'Space Mono',monospace", fontSize: 11,
                    color: active ? white : dim,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    transition: 'color 0.3s ease',
                  }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = white; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = dim; }}
                  >{label}</span>
                  {/* active underline */}
                  <span style={{
                    position: 'absolute', bottom: -2, left: 0, right: 0, height: 1,
                    background: cyan,
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                    transformOrigin: 'left',
                  }} />
                </button>
              );
            })}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'none', border: `1px solid rgba(245,240,232,0.15)`, color: white, cursor: 'pointer', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = cyan}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)'}
            className="mobile-burger"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div style={{
          overflow: 'hidden', maxHeight: isOpen ? 400 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
          background: 'rgba(5,5,5,0.97)',
          borderTop: isOpen ? '1px solid rgba(245,240,232,0.06)' : '1px solid transparent',
        }}>
          <div style={{ padding: '12px clamp(24px,5vw,80px) 20px' }}>
            {navItems.map(({ id, label, index }, i) => {
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '12px 0',
                    borderBottom: i < navItems.length - 1 ? '1px solid rgba(245,240,232,0.05)' : 'none',
                  }}
                >
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: active ? cyan : 'rgba(245,240,232,0.2)', letterSpacing: '0.2em', minWidth: 20 }}>{index}</span>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: active ? cyan : dim, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</span>
                  {active && <span style={{ marginLeft: 'auto', width: 20, height: 1, background: cyan }} />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <style>{`
        @media (min-width: 768px) { .mobile-burger { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
