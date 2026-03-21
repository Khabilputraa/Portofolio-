import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const cyan   = '#00e5c4';
const red    = '#ff2d55';
const yellow = '#ffe100';
const white  = '#f5f0e8';
const dim    = 'rgba(245,240,232, 0.7)';

const tagColors = [cyan, red, yellow, 'rgba(245,240,232,0.5)'];

const projects = [
  {
    title: 'SIGAYAPATEN',
    description: 'Fullstack web application for managing village administration.',
    image: '/img/Beranda.png',
    tags: ['Bootstrap', 'Python', 'Django'],
    github: '#',
    demo: '#',
    index: '01',
  },
  {
    title: 'Online Musical Instrument Rental',
    description: 'Frontend for a musical instrument rental platform in Malang.',
    image: '/img/cagar_budaya.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Python', 'Django'],
    github: 'https://github.com/Khabilputraa/tugas-akhir-2025',
    demo: '#',
    index: '02',
  },
  {
    title: 'Rental Instrument Platform',
    description: 'Musical instrument rental platform — frontend implementation with clean, responsive UI.',
    image: '/img/Signup.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Python', 'Django'],
    github: '#',
    demo: '#',
    index: '03',
  },
  {
    title: 'Dharma Cipta Karya',
    description: 'Company profile website backend using Django — admin interface for content management and dynamic rendering.',
    image: '/img/dharma_cipta.png',
    tags: ['React.js', 'Django', 'Python'],
    github: '#',
    demo: 'http://dharmaciptakarya.com/',
    index: '04',
  },
  {
    title: 'Favor Indonesia',
    description: 'Backend system using Python and Django to manage and serve content for a company profile.',
    image: '/img/favor_indo.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Python', 'Django'],
    github: '#',
    demo: '#',
    index: '05',
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function ProjectCard({ project, delay }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr]   = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        border: `1px solid ${hovered ? cyan : 'rgba(245,240,232,0.07)'}`,
        background: '#050505',
        display: 'flex', flexDirection: 'column',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, border-color 0.3s ease`,
        overflow: 'hidden',
      }}
    >
      {/* corner accents */}
      {[['top:-1px','left:-1px','borderTop','borderLeft'],['bottom:-1px','right:-1px','borderBottom','borderRight']].map(([a,b,c,d], i) => (
        <div key={i} style={{
          position: 'absolute', [a.split(':')[0]]: a.split(':')[1], [b.split(':')[0]]: b.split(':')[1],
          width: hovered ? 24 : 12, height: hovered ? 24 : 12, zIndex: 3,
          [c]: `2px solid ${cyan}`, [d]: `2px solid ${cyan}`,
          transition: 'width 0.3s ease, height 0.3s ease',
        }} />
      ))}

      {/* image */}
      <div style={{ height: 180, overflow: 'hidden', position: 'relative', flexShrink: 0, background: '#0a0a0a' }}>
        {!imgErr ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hovered ? 'brightness(1)' : 'brightness(0.7) contrast(1.05)', transition: 'filter 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'rgba(245,240,232,0.15)', letterSpacing: '0.2em' }}>NO PREVIEW</span>
          </div>
        )}
        {/* scan sweep */}
        {hovered && (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${cyan}, transparent)`, opacity: 0.3, animation: 'scanSweep 1.8s linear infinite' }} />
          </div>
        )}
        {/* index overlay */}
        <div style={{ position: 'absolute', top: 10, left: 12, fontFamily: "'Space Mono',monospace", fontSize: 9, color: cyan, letterSpacing: '0.25em', background: 'rgba(5,5,5,0.7)', padding: '3px 8px', border: `1px solid rgba(0,229,196,0.25)` }}>
          {project.index}
        </div>
      </div>

      {/* content */}
      <div style={{ padding: '20px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(14px,2vw,17px)', color: white, letterSpacing: '-0.01em', lineHeight: 1.2, margin: 0 }}>
          {project.title}
        </h3>

        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: dim, lineHeight: 1.9, letterSpacing: '0.04em', flex: 1, margin: 0 }}>
          {project.description}
        </p>

        {/* tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map((tag, i) => (
            <span key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${tagColors[i % tagColors.length]}40`, color: tagColors[i % tagColors.length], }}>
              {tag}
            </span>
          ))}
        </div>

        {/* links */}
        <div style={{ display: 'flex', gap: 16, paddingTop: 4, borderTop: '1px solid rgba(245,240,232,0.06)' }}>
          {project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: dim, textDecoration: 'none', fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.15em', transition: 'color 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = cyan}
              onMouseLeave={e => e.currentTarget.style.color = dim}
            >
              <Github size={13} /><span>CODE</span>
            </a>
          )}
          {project.demo !== '#' && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: dim, textDecoration: 'none', fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.15em', transition: 'color 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = cyan}
              onMouseLeave={e => e.currentTarget.style.color = dim}
            >
              <ExternalLink size={13} /><span>LIVE</span>
            </a>
          )}
          {project.github === '#' && project.demo === '#' && (
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: 'rgba(245,240,232,0.15)', letterSpacing: '0.2em' }}>PRIVATE</span>
          )}
        </div>
      </div>

      <style>{`@keyframes scanSweep { from { top: -1px; } to { top: 100%; } }`}</style>
    </div>
  );
}

export default function Projects() {
  const [headRef, headVisible] = useInView(0.1);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,80px)', position: 'relative', overflow: 'hidden' }}>

      {/* scanlines */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)' }} />

      {/* ghost text */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(70px,16vw,200px)', color: 'transparent', WebkitTextStroke: '1px rgba(245,240,232,0.03)', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>WORK</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>

        {/* header */}
        <div ref={headRef} style={{ marginBottom: 64, opacity: headVisible ? 1 : 0, transform: headVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: cyan, letterSpacing: '0.3em', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: cyan }} />
            [ 03 ] — PROJECTS
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(32px,6vw,64px)', color: white, letterSpacing: '-0.03em', lineHeight: 0.95, margin: 0 }}>
              Selected Work<span style={{ color: cyan }}>.</span>
            </h2>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'rgba(245,240,232,0.2)', letterSpacing: '0.2em' }}>
              {String(projects.length).padStart(2,'0')} PROJECTS
            </span>
          </div>
        </div>

        {/* grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 16 }}>
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} delay={i * 80} />
          ))}
        </div>

      </div>
    </div>
  );
}
