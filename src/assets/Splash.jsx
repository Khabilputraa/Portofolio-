import React, { useState, useEffect, useRef } from 'react';

const cyan   = '#00e5c4';
const red    = '#ff2d55';
const yellow = '#ffe100';
const white  = '#f5f0e8';

const bootLines = [
  { text: '> npm run portfolio',                cls: 'green',  delay: 0,    pct: 8   },
  { text: '> Allocating memory...',             cls: 'dim',    delay: 520,  pct: 22  },
  { text: '> Runtime environment ready',        cls: 'green',  delay: 980,  pct: 38  },
  { text: '> Loading assets & fonts',           cls: 'green',  delay: 1380, pct: 52  },
  { text: '> Resolving dependencies...',        cls: 'yellow', delay: 1750, pct: 65  },
  { text: '> Dependencies resolved',            cls: 'green',  delay: 2180, pct: 78  },
  { text: '> Building portfolio modules',       cls: 'green',  delay: 2520, pct: 90  },
  { text: '> System ready — Welcome, Khabil ♥', cls: 'white', delay: 3050, pct: 100 },
];

function typeLine(el, text, speed = 36) {
  return new Promise((resolve) => {
    let i = 0;
    const cur = document.createElement('span');
    cur.style.cssText = `display:inline-block;width:7px;height:1em;background:${cyan};vertical-align:text-bottom;margin-left:1px;animation:blinkCur 1s step-end infinite`;
    el.appendChild(cur);
    const tick = () => {
      if (i < text.length) {
        el.textContent = text.slice(0, ++i);
        el.appendChild(cur);
        setTimeout(tick, speed + Math.random() * 18);
      } else {
        cur.remove();
        resolve();
      }
    };
    tick();
  });
}

export default function PortfolioSplash() {
  const [pct, setPct]         = useState(0);
  const [status, setStatus]   = useState('BOOTING...');
  const [exiting, setExiting] = useState(false);
  const logRef   = useRef(null);
  const fillRef  = useRef(null);
  const pctRef   = useRef(null);
  const canvasRef = useRef(null);

  /* particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.1 + 0.3,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,229,196,0.22)'; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,229,196,${0.06*(1-d/100)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  /* boot sequence */
  useEffect(() => {
    let lastPct = 0;

    const animPct = (from, to, duration) => new Promise(resolve => {
      const start = Date.now();
      const tick = () => {
        const p   = Math.min((Date.now() - start) / duration, 1);
        const val = Math.round(from + (to - from) * p);
        if (fillRef.current) fillRef.current.style.width = val + '%';
        if (pctRef.current)  pctRef.current.textContent  = val + '%';
        if (p < 1) requestAnimationFrame(tick); else resolve();
      };
      tick();
    });

    const run = async () => {
      for (let i = 0; i < bootLines.length; i++) {
        const line = bootLines[i];
        await new Promise(r => setTimeout(r, i === 0 ? line.delay : line.delay - bootLines[i-1].delay));

        if (!logRef.current) return;
        const span = document.createElement('span');
        span.className = 'boot-line boot-' + line.cls;
        logRef.current.appendChild(span);
        logRef.current.scrollTop = logRef.current.scrollHeight;

        const isLast = i === bootLines.length - 1;
        await Promise.all([
          typeLine(span, line.text),
          animPct(lastPct, line.pct, isLast ? 600 : 380),
        ]);
        lastPct = line.pct;

        if (isLast) {
          if (fillRef.current) {
            fillRef.current.style.width = '100%';
            fillRef.current.style.background = cyan;
          }
          if (pctRef.current) pctRef.current.textContent = '100%';
          setStatus('LAUNCH READY');
          await new Promise(r => setTimeout(r, 900));
          setExiting(true);
        }
      }
    };

    run();
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#050505', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: exiting ? 0 : 1,
      transform: exiting ? 'translateY(-3%)' : 'translateY(0)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>

      {/* aurora orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,196,0.20) 0%, transparent 70%)", animation: "orb1 8s ease-in-out infinite alternate", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", top: "-10%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,45,85,0.15) 0%, transparent 70%)", animation: "orb2 10s ease-in-out infinite alternate", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "30%", width: "60vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,225,0,0.11) 0%, transparent 70%)", animation: "orb3 12s ease-in-out infinite alternate", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", top: "40%", left: "55%", width: "35vw", height: "35vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)", animation: "orb4 9s ease-in-out infinite alternate", filter: "blur(1px)" }} />
      </div>

      {/* particle bg */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.8 }} />

      {/* scanlines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 4px)" }} />

      {/* vignette */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,5,0.78) 100%)" }} />

      {/* corner marks */}
      {[
        { top: 28, left: 28, bt: 'borderTop', bl: 'borderLeft' },
        { top: 28, right: 28, bt: 'borderTop', bl: 'borderRight' },
        { bottom: 28, left: 28, bt: 'borderBottom', bl: 'borderLeft' },
        { bottom: 28, right: 28, bt: 'borderBottom', bl: 'borderRight' },
      ].map((c, i) => (
        <div key={i} style={{ position: 'absolute', ...c, width: 28, height: 28, [c.bt]: `1px solid rgba(0,229,196,0.35)`, [c.bl]: `1px solid rgba(0,229,196,0.35)` }} />
      ))}

      {/* main card */}
      <div style={{ width: 'min(500px, 90vw)', position: 'relative', zIndex: 1 }}>

        {/* eyebrow */}
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: cyan, letterSpacing: '0.3em', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp 0.6s ease 0.1s both' }}>
          <span style={{ display: 'inline-block', width: 20, height: 1, background: cyan }} />
          INITIALIZING SYSTEM
        </div>

        {/* big name */}
        <div style={{ overflow: 'hidden', marginBottom: 36 }}>
          {['Khabil', 'Putra', 'Pratama.'].map((word, i) => (
            <div key={word} style={{ overflow: 'hidden', lineHeight: 1 }}>
              <span style={{
                display: 'block',
                fontFamily: "'Syne',sans-serif", fontWeight: 800,
                fontSize: 'clamp(40px, 8vw, 72px)',
                color: i === 2 ? cyan : white,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                animation: `riseUp 0.9s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.12}s both`,
              }}>{word}</span>
            </div>
          ))}
        </div>

        {/* boot log */}
        <div ref={logRef} style={{
          fontFamily: "'Space Mono',monospace", fontSize: 'clamp(10px,1.6vw,12px)',
          lineHeight: 2, marginBottom: 28, height: 112, overflowY: 'hidden',
          display: 'flex', flexDirection: 'column', gap: 0,
        }} />

        {/* progress bar */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ height: 2, background: 'rgba(245,240,232,0.07)', position: 'relative', overflow: 'hidden' }}>
            <div ref={fillRef} style={{
              position: 'absolute', left: 0, top: 0, height: '100%', width: '0%',
              background: `linear-gradient(90deg, ${cyan}, rgba(0,229,196,0.6))`,
              transition: 'width 0.06s linear',
            }}>
              <div style={{ position: 'absolute', right: 0, top: -3, width: 2, height: 8, background: cyan, boxShadow: `0 0 8px ${cyan}` }} />
            </div>
          </div>
        </div>

        {/* pct + status row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span ref={pctRef} style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: cyan, letterSpacing: '0.08em' }}>0%</span>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: status === 'LAUNCH READY' ? cyan : 'rgba(245,240,232,0.25)', letterSpacing: '0.28em', transition: 'color 0.4s ease' }}>{status}</span>
        </div>

      </div>

      <style>{`
        @keyframes riseUp { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blinkCur { 50% { opacity:0; } }
        @keyframes orb1 { from { transform:translate(0,0) scale(1); } to { transform:translate(6vw,4vh) scale(1.15); } }
        @keyframes orb2 { from { transform:translate(0,0) scale(1); } to { transform:translate(-5vw,6vh) scale(1.1); } }
        @keyframes orb3 { from { transform:translate(0,0) scale(1); } to { transform:translate(-4vw,-5vh) scale(1.08); } }
        @keyframes orb4 { from { transform:translate(0,0) scale(1); } to { transform:translate(3vw,-4vh) scale(1.12); } }
        .boot-line { display:block; min-height:1.8em; white-space:nowrap; }
        .boot-green  { color:${cyan}; }
        .boot-yellow { color:${yellow}; }
        .boot-dim    { color:rgba(245,240,232,0.25); }
        .boot-white  { color:${white}; }
        .boot-red    { color:${red}; }
      `}</style>
    </div>
  );
}
