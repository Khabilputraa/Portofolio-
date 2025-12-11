import React, { useState, useEffect } from 'react';
import profilePhoto from '../../public/img/wisuda_khabil.jpg';
import { Github, Linkedin, Instagram, Download } from 'lucide-react';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ['Frontend Developer', 'Basic Backend Developer'];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);
  
  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="w-full max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-purple-400 text-lg font-medium">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Khabil Putra Pratama
              </h1>
              <p className="text-2xl md:text-3xl text-slate-300 h-10">
                {text}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://drive.google.com/uc?export=download&id=1dBai4jQgJAeovIirn2G8vgDuQvGZZkLG"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                download
              >
                <Download size={20} />
                Download CV
              </a>
            </div>
            
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/Khabilputraa" className="w-12 h-12 bg-slate-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Github className="text-white" size={20} />
              </a>
              <a href="https://www.linkedin.com/in/khabil-putra-405631279/" className="w-12 h-12 bg-slate-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="text-white" size={20} />
              </a>
              <a href="https://www.instagram.com/khabilputraa_/" className="w-12 h-12 bg-slate-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="text-white" size={20} />
              </a>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-blue-600/20 to-purple-600/20 blur-2xl"></div>
              <div className="relative w-72 h-96 md:w-80 md:h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-20 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-600 to-purple-600 opacity-20 rounded-3xl transform -rotate-6"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80"></div>
                  <img 
                    src={profilePhoto} 
                    alt="Khabil Porto" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}