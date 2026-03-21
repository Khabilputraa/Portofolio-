import React, { useState, useEffect, useRef } from 'react';
import { Send, Github, Linkedin, Instagram, MapPin } from 'lucide-react';

const cyan   = '#00e5c4';
const red    = '#ff2d55';
const white  = '#f5f0e8';
const dim    = 'rgba(245,240,232,0.7)';

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

function CyberpunkInput({ label, index, type = 'text', name, value, onChange, placeholder, multiline = false }) {
  const [focused, setFocused] = useState(false);
  const Tag = multiline ? 'textarea' : 'input';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: focused ? cyan : 'rgba(245,240,232,0.2)', letterSpacing: '0.2em', transition: 'color 0.3s ease' }}>{index}</span>
        <label style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: focused ? white : dim, letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'color 0.3s ease' }}>{label}</label>
      </div>
      <div style={{ position: 'relative' }}>
        {/* left accent bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: focused ? cyan : 'rgba(245,240,232,0.08)', transition: 'background 0.3s ease' }} />
        <Tag
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={multiline ? 5 : undefined}
          style={{
            width: '100%',
            background: focused ? 'rgba(0,229,196,0.03)' : 'transparent',
            border: 'none',
            borderBottom: `1px solid ${focused ? cyan : 'rgba(245,240,232)'}`,
            color: white,
            fontFamily: "'Space Mono',monospace",
            fontSize: 12,
            letterSpacing: '0.06em',
            padding: multiline ? '14px 14px 14px 16px' : '12px 14px 12px 16px',
            outline: 'none',
            resize: 'none',
            transition: 'border-color 0.3s ease, background 0.3s ease',
            lineHeight: 1.8,
          }}
          {...{ style: {
            width: '100%',
            background: focused ? 'rgba(0,229,196,0.09)' : 'transparent',
            border: 'none',
            borderBottom: `1px solid ${focused ? cyan : 'rgba(245,240,232,0.1)'}`,
            color: white,
            fontFamily: "'Space Mono',monospace",
            fontSize: 12,
            letterSpacing: '0.06em',
            paddingTop: multiline ? 14 : 12,
            paddingRight: 14,
            paddingBottom: multiline ? 14 : 12,
            paddingLeft: 16,
            outline: 'none',
            resize: 'none',
            transition: 'border-color 0.3s ease, background 0.3s ease',
            lineHeight: 1.8,
          }}}
        />
      </div>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus]     = useState(''); // '' | 'sending' | 'sent' | 'error'
  const [headRef, headVisible]  = useInView(0.1);
  const [formRef, formVisible]  = useInView(0.1);
  const [infoRef, infoVisible]  = useInView(0.1);
  const [btnHovered, setBtnHovered] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        setStatus('');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1200);
  };

  const socials = [
    { href: 'https://github.com/Khabilputraa',                        Icon: Github,    label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/khabil-putra-405631279/',    Icon: Linkedin,  label: 'LinkedIn' },
    { href: 'https://www.instagram.com/khabilputraa_/',               Icon: Instagram, label: 'Instagram' },
  ];

  return (
    <div style={{ background: '#050505', minHeight: '100vh', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,80px)', position: 'relative', overflow: 'hidden' }}>

      {/* scanlines */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)' }} />

      {/* ghost text */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(60px,14vw,180px)', color: 'transparent', WebkitTextStroke: '1px rgba(245,240,232,0.03)', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>CONTACT</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>

        {/* header */}
        <div ref={headRef} style={{ marginBottom: 64, opacity: headVisible ? 1 : 0, transform: headVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: cyan, letterSpacing: '0.3em', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: cyan }} />
            [ 04 ] — CONTACT
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(32px,6vw,64px)', color: white, letterSpacing: '-0.03em', lineHeight: 0.95, margin: 0 }}>
            Let's Build<br />Something<span style={{ color: cyan }}>.</span>
          </h2>
        </div>

        {/* body grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px), 1fr))', gap: 64, alignItems: 'start' }}>

          {/* form */}
          <div ref={formRef} style={{ opacity: formVisible ? 1 : 0, transform: formVisible ? 'none' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s', display: 'flex', flexDirection: 'column', gap: 28 }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <CyberpunkInput label="Name"  index="01" name="name"  value={formData.name}  onChange={handleChange} placeholder="Your name" />
              <CyberpunkInput label="Email" index="02" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" />
            </div>

            <CyberpunkInput label="Subject" index="03" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" />
            <CyberpunkInput label="Message" index="04" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." multiline />

            {/* status messages */}
            {status === 'error' && (
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: red, letterSpacing: '0.15em', padding: '10px 14px', border: `1px solid ${red}40`, background: `${red}08` }}>
                ✕ &nbsp;FILL IN ALL FIELDS BEFORE SENDING
              </div>
            )}
            {status === 'sent' && (
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: cyan, letterSpacing: '0.15em', padding: '10px 14px', border: `1px solid ${cyan}40`, background: `${cyan}08` }}>
                ✓ &nbsp;MESSAGE TRANSMITTED SUCCESSFULLY
              </div>
            )}

            {/* submit btn */}
            <button
              onClick={handleSubmit}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              disabled={status === 'sending' || status === 'sent'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '15px 32px',
                border: `1px solid ${btnHovered ? white : 'rgba(245,240,232)'}`,
                background: btnHovered ? white : 'transparent',
                color: btnHovered ? '#050505' : white,
                fontFamily: "'Space Mono',monospace",
                fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                cursor: status === 'sending' || status === 'sent' ? 'not-allowed' : 'pointer',
                opacity: status === 'sending' || status === 'sent' ? 0.5 : 1,
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {status === 'sending' ? (
                <>
                  <span style={{ display: 'inline-block', width: 12, height: 12, border: `1px solid currentColor`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  TRANSMITTING...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Send Message
                </>
              )}
            </button>
          </div>

          {/* info panel */}
          <div ref={infoRef} style={{ opacity: infoVisible ? 1 : 0, transform: infoVisible ? 'none' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s', display: 'flex', flexDirection: 'column', gap: 40 }}>

            {/* blurb */}
            <div style={{ borderLeft: `2px solid ${cyan}`, paddingLeft: 20 }}>
              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: dim, lineHeight: 2, letterSpacing: '0.05em', margin: 0 }}>
                Have a project in mind? I'm always open to discussing new opportunities, creative collaborations, or just a good tech conversation.
              </p>
            </div>

            {/* contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'EMAIL', value: 'khabilputra@gmail.com', color: cyan },
                { label: 'LOCATION', value: 'Yogyakarta, Indonesia', color: 'rgba(245,240,232,0.5)', Icon: MapPin },
                { label: 'STATUS', value: 'Available for work', color: cyan, dot: true },
              ].map(({ label, value, color, dot, Icon }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: 'rgba(245,240,232,0.2)', letterSpacing: '0.3em' }}>{label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: cyan, flexShrink: 0, boxShadow: `0 0 6px ${cyan}` }} />}
                    {Icon && <Icon size={12} color={color} />}
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color, letterSpacing: '0.08em' }}>{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* divider */}
            <div style={{ height: 1, background: 'rgba(245,240,232,0.06)' }} />

            {/* socials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: 'rgba(245,240,232,0.2)', letterSpacing: '0.3em' }}>// SOCIALS</span>
              <div style={{ display: 'flex', gap: 12 }}>
                {socials.map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ width: 42, height: 42, border: '1px solid rgba(245,240,232,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dim, textDecoration: 'none', transition: 'border-color 0.3s ease, color 0.3s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = cyan; e.currentTarget.style.color = cyan; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.1)'; e.currentTarget.style.color = dim; }}
                    title={label}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: rgba(245,240,232,0.15); font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.06em; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #050505 inset; -webkit-text-fill-color: #f5f0e8; }
      `}</style>
    </div>
  );
}
