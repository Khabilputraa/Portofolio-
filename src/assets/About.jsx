import React, { useEffect, useRef, useState } from 'react';

const cyan = '#00e5c4';
const red = '#ff2d55';
const yellow = '#ffe100';
const white = '#f5f0e8';
const dimWhite = 'rgba(245,240,232,0.7)';

const features = [
  {
    tag: '01',
    color: cyan,
    title: 'Clean Code',
    description: 'Writing maintainable and scalable code following best practices and modern standards.',
  },
  {
    tag: '02',
    color: yellow,
    title: 'Creative Solutions',
    description: 'Innovative approaches to solve complex problems with elegant and efficient logic.',
  },
  {
    tag: '03',
    color: red,
    title: 'Fast Performance',
    description: 'Optimized applications built for speed and seamless user experience.',
  },
  {
    tag: '04',
    color: cyan,
    title: 'Dedicated Work',
    description: 'Committed to delivering quality results on time, every time.',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FeatureCard({ tag, color, title, description, delay }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? color : 'rgba(245,240,232,0.08)'}`,
        padding: '28px 24px',
        position: 'relative',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        transitionProperty: 'border-color, transform, opacity',
        background: hovered ? `${color}08` : 'transparent',
        cursor: 'default',
      }}
    >
      {/* corner accent */}
      <div style={{
        position: 'absolute', top: -1, left: -1,
        width: 16, height: 16,
        borderTop: `2px solid ${color}`,
        borderLeft: `2px solid ${color}`,
        transition: 'width 0.3s ease, height 0.3s ease',
        ...(hovered ? { width: 28, height: 28 } : {}),
      }} />
      <div style={{
        position: 'absolute', bottom: -1, right: -1,
        width: 16, height: 16,
        borderBottom: `2px solid ${color}`,
        borderRight: `2px solid ${color}`,
        transition: 'width 0.3s ease, height 0.3s ease',
        ...(hovered ? { width: 28, height: 28 } : {}),
      }} />

      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color, letterSpacing: '0.28em', marginBottom: 14 }}>
        [ {tag} ]
      </div>
      <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: white, letterSpacing: '-0.01em', marginBottom: 10 }}>
        {title}
      </h4>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: dimWhite, lineHeight: 1.9, letterSpacing: '0.04em' }}>
        {description}
      </p>
    </div>
  );
}

export default function About() {
  const [headRef, headVisible] = useInView(0.1);
  const [textRef, textVisible] = useInView(0.1);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,80px)', position: 'relative', overflow: 'hidden' }}>

      {/* scanlines */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
      }} />

      {/* ghost text bg */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: 'clamp(80px, 18vw, 220px)',
        color: 'transparent', WebkitTextStroke: '1px rgba(245,240,232,0.035)',
        whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.04em',
      }}>ABOUT</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>

        {/* ── HEADER ── */}
        <div ref={headRef} style={{
          marginBottom: 72,
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: cyan, letterSpacing: '0.3em', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: cyan }} />
            [ 01 ] — ABOUT
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(32px,6vw,64px)', color: white, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
            Who I Am<span style={{ color: cyan }}>.</span>
          </h2>
        </div>

        {/* ── BODY GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px), 1fr))', gap: 64, alignItems: 'start' }}>

          {/* LEFT — text */}
          <div ref={textRef} style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}>
            <div style={{ borderLeft: `2px solid ${cyan}`, paddingLeft: 24, marginBottom: 36 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(18px,2.8vw,26px)', color: white, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 20 }}>
                Passionate Web<br />Developer.
              </h3>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 'clamp(10px,1.4vw,12px)', color: dimWhite, lineHeight: 2, letterSpacing: '0.05em' }}>
                I'm a Frontend Developer who enjoys creating beautiful, responsive, and meaningful digital experiences.
                With basic backend skills, I build applications that are not only visually appealing but also functional and reliable.
              </p>
            </div>

            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 'clamp(10px,1.4vw,12px)', color: dimWhite, lineHeight: 2, letterSpacing: '0.05em', marginBottom: 40 }}>
              I build clean, fast, and easy-to-use interfaces powered by well-structured code.
              My goal is to deliver smooth user experiences through simple yet effective design.
            </p>

            {/* inline stats */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                { label: 'Based in', value: 'Yogyakarta, ID' },
                { label: 'Focus', value: 'Frontend + Backend' },
                { label: 'Status', value: 'Open to Work', dot: true },
              ].map(({ label, value, dot }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'rgba(245,240,232,0.25)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: dot ? cyan : white, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: cyan, display: 'inline-block', boxShadow: `0 0 6px ${cyan}` }} />}
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 80} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
