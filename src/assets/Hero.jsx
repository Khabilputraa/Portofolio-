import React, { useState, useEffect, useRef } from 'react';
import profilePhoto from '../../public/img/wisuda_khabil.jpg';
import { Github, Linkedin, Instagram, Download } from 'lucide-react';

const cyan  = '#00e5c4';
const red   = '#ff2d55';
const white = '#f5f0e8';
const dim   = 'rgba(245,240,232,0.75)';

const roles = ['FullStack Developer', 'Django Backend Enthusiast'];

/* ── hook ── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

export default function Hero() {
  const [text, setText]             = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum]       = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [visible, setVisible]       = useState(false);
  const canvasRef                   = useRef(null);
  const isMobile                    = useIsMobile();

  /* reveal on mount */
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  /* typewriter */
  useEffect(() => {
    const i        = loopNum % roles.length;
    const fullText = roles[i];
    const timer = setTimeout(() => {
      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );
      setTypingSpeed(isDeleting ? 50 : 150);
      if (!isDeleting && text === fullText) setTimeout(() => setIsDeleting(true), 2000);
      else if (isDeleting && text === '') { setIsDeleting(false); setLoopNum(loopNum + 1); }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  /* canvas particle bg */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.3,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,229,196,0.25)'; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,229,196,${0.06 * (1 - d / 110)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const ro = new ResizeObserver(() => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  const fadeStyle = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  const socials = [
    { href: 'https://github.com/Khabilputraa',                        Icon: Github,   label: 'GH' },
    { href: 'https://www.linkedin.com/in/khabil-putra-405631279/',    Icon: Linkedin, label: 'LI' },
    { href: 'https://www.instagram.com/khabilputraa_/',               Icon: Instagram, label: 'IG' },
  ];

  return (
    <div style={{
      background: '#050505',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>

      {/* scanlines */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)',
      }} />

      {/* particle canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6,
      }} />

      {/* ghost text — hidden on very small screens to avoid overflow */}
      {!isMobile && (
        <div style={{
          position: 'absolute', bottom: '-4%', left: '-2%',
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: 'clamp(90px,20vw,260px)', color: 'transparent',
          WebkitTextStroke: '1px rgba(245,240,232,0.03)',
          whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.04em', lineHeight: 1,
        }}>
          KHABIL
        </div>
      )}

      {/* ghost text mobile — centered, smaller, clipped */}
      {isMobile && (
        <div style={{
          position: 'absolute', bottom: '2%', left: 0, right: 0, overflow: 'hidden',
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: 'clamp(72px,28vw,120px)', color: 'transparent',
          WebkitTextStroke: '1px rgba(245,240,232,0.04)',
          textAlign: 'center', userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.04em', lineHeight: 1,
        }}>
          KHABIL
        </div>
      )}

      {/* ── MAIN GRID ── */}
      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200,
        margin: '0 auto',
        padding: isMobile
          ? 'clamp(56px,12vw,80px) clamp(20px,6vw,40px) clamp(40px,8vw,64px)'
          : 'clamp(48px,8vw,96px) clamp(24px,6vw,80px)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)',
        gap: isMobile ? 'clamp(32px,8vw,48px)' : 'clamp(32px,5vw,64px)',
        alignItems: 'center',
      }}>

        {/* ── PHOTO (top on mobile, right on desktop) ── */}
        <div style={{
          ...fadeStyle(isMobile ? 200 : 400),
          display: 'flex', justifyContent: 'center',
          order: isMobile ? 1 : 2,
        }}>
          <div style={{ position: 'relative' }}>

            {/* outer border box */}
            <div style={{ position: 'absolute', inset: -14, border: `1px solid rgba(0,229,196,0.15)` }} />

            {/* corners */}
            <div style={{ position: 'absolute', top: -20, left: -20, width: 28, height: 28, borderTop: `2px solid ${cyan}`, borderLeft: `2px solid ${cyan}` }} />
            <div style={{ position: 'absolute', bottom: -20, right: -20, width: 28, height: 28, borderBottom: `2px solid ${cyan}`, borderRight: `2px solid ${cyan}` }} />
            <div style={{ position: 'absolute', top: -20, right: -20, width: 28, height: 28, borderTop: `2px solid ${red}`, borderRight: `2px solid ${red}` }} />
            <div style={{ position: 'absolute', bottom: -20, left: -20, width: 28, height: 28, borderBottom: `2px solid ${red}`, borderLeft: `2px solid ${red}` }} />

            {/* image container */}
            <div style={{
              width:  isMobile ? 'clamp(180px,52vw,240px)' : 'clamp(240px,28vw,320px)',
              height: isMobile ? 'clamp(220px,64vw,300px)' : 'clamp(300px,36vw,420px)',
              overflow: 'hidden', position: 'relative',
            }}>
              {/* glitch overlay */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                mixBlendMode: 'color-dodge', opacity: 0.04,
                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${cyan} 2px, ${cyan} 3px)`,
              }} />

              <img
                src={profilePhoto}
                alt="Khabil Putra Pratama"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'contrast(1.05) brightness(0.95)', display: 'block' }}
              />

              {/* bottom fade */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, #050505 0%, transparent 100%)', zIndex: 1 }} />

              {/* name tag */}
              <div style={{ position: 'absolute', bottom: 16, left: 16, zIndex: 3, fontFamily: "'Space Mono',monospace", fontSize: 9, color: cyan, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                KHABIL_PUTRA.jpg
              </div>
            </div>

            {/* scan line sweep */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${cyan}, transparent)`, opacity: 0.18, animation: 'scanSweep 4s linear infinite' }} />
            </div>
          </div>
        </div>

        {/* ── TEXT CONTENT ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 0,
          order: isMobile ? 2 : 1,
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left',
        }}>

          {/* eyebrow */}
          <div style={{
            ...fadeStyle(100),
            fontFamily: "'Space Mono',monospace", fontSize: 10, color: cyan,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            {!isMobile && <span style={{ display: 'inline-block', width: 20, height: 1, background: cyan }} />}
            [ 00 ] — HELLO, I'M
          </div>

          {/* name */}
          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <h1 style={{
              ...fadeStyle(250),
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: isMobile ? 'clamp(36px,11vw,56px)' : 'clamp(38px,6vw,76px)',
              color: white, letterSpacing: '-0.03em', lineHeight: 0.92, margin: 0,
            }}>
              Khabil<br />
              Putra<br />
              <span style={{ color: cyan }}>Pratama.</span>
            </h1>
          </div>

          {/* typewriter role */}
          <div style={{
            ...fadeStyle(450),
            marginTop: 24, marginBottom: 36, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: 0,
          }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 'clamp(11px,1.8vw,14px)', color: dim, letterSpacing: '0.12em' }}>
              {text}
            </span>
            <span style={{ display: 'inline-block', width: 2, height: 16, background: cyan, marginLeft: 3, animation: 'blink 1s step-end infinite' }} />
          </div>

          {/* divider */}
          <div style={{
            ...fadeStyle(550), height: 1,
            background: 'rgba(245,240,232,0.08)', marginBottom: 36,
            width: isMobile ? '60%' : '80%',
          }} />

          {/* CV button */}
          <div style={{ ...fadeStyle(650), marginBottom: 32 }}>
            <a
              href="https://drive.google.com/uc?export=download&id=1dBai4jQgJAeovIirn2G8vgDuQvGZZkLG"
              download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 28px', border: `1px solid ${white}`,
                color: white, fontFamily: "'Space Mono',monospace", fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none', position: 'relative', overflow: 'hidden',
                transition: 'color 0.4s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#050505';
                e.currentTarget.querySelector('.fill').style.transform = 'translateX(0)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = white;
                e.currentTarget.querySelector('.fill').style.transform = 'translateX(-101%)';
              }}
            >
              <span className="fill" style={{ position: 'absolute', inset: 0, background: white, transform: 'translateX(-101%)', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)', zIndex: 0 }} />
              <Download size={14} style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Download CV</span>
            </a>
          </div>

          {/* social links */}
          <div style={{ ...fadeStyle(750), display: 'flex', gap: 12 }}>
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{
                  width: 44, height: 44, border: '1px solid rgba(245,240,232,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: dim, textDecoration: 'none', transition: 'border-color 0.3s ease, color 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cyan; e.currentTarget.style.color = cyan; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.12)'; e.currentTarget.style.color = dim; }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes scanSweep { from { top: -2px; } to { top: 100%; } }
      `}</style>
    </div>
  );
}
