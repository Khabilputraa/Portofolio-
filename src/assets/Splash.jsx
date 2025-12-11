import React, { useState, useEffect } from 'react';
import { Code, Server, Headphones, Rocket, AlertCircle } from 'lucide-react';

export default function PortfolioSplash() {
  const [loading, setLoading] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorLines, setErrorLines] = useState([]);
  const [rocketLaunched, setRocketLaunched] = useState(false);

  const errorCodes = [
    "Error: Module not found at line 42",
    "Warning: Deprecated function call",
    "TypeError: Cannot read property",
    "Syntax Error: Unexpected token",
    "Debug: Connecting to server...",
    "Success: All tests passed ✓",
    "Building production bundle...",
    "Optimizing assets..."
  ];

  useEffect(() => {
    const errorInterval = setInterval(() => {
      if (loading < 100) {
        const randomError = errorCodes[Math.floor(Math.random() * errorCodes.length)];
        setErrorLines(prev => {
          const newLines = [...prev, randomError];
          return newLines.slice(-5);
        });
        
        setShowError(true);
        setTimeout(() => setShowError(false), 100);
      }
    }, 800);

    const interval = setInterval(() => {
      setLoading(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(errorInterval);
          setRocketLaunched(true);
          setTimeout(() => setFadeOut(true), 2000);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => {
      clearInterval(interval);
      clearInterval(errorInterval);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'} overflow-hidden`}>
      <div className="text-center space-y-8 relative z-10">
        <div className="relative">
          <div className={`w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50 transition-all duration-300 ${showError ? 'scale-95 shadow-red-500/50' : 'scale-100'}`}>
            <Code className="w-16 h-16 text-white" strokeWidth={2} />
          </div>
          
          {showError && (
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-red-500/30 rounded-2xl animate-ping" />
          )}
          
          <div className="absolute -left-12 top-8 animate-bounce" style={{animationDelay: '0.2s'}}>
            <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-blue-400/30">
              <Server className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          
          <div className="absolute -right-12 top-8 animate-bounce" style={{animationDelay: '0.4s'}}>
            <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-green-400/30">
              <Headphones className="w-6 h-6 text-green-400" />
            </div>
          </div>

          {showError && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <AlertCircle className="w-8 h-8 text-red-400 animate-pulse" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Welcome
          </h1>
          <p className="text-xl text-purple-300">Frontend Web Developer</p>
          <p className="text-sm text-slate-400">Backend & Support Specialist</p>
        </div>

        <div className="w-full max-w-md mx-auto bg-slate-950/80 backdrop-blur-sm rounded-lg border border-slate-700 p-4 font-mono text-xs text-left h-32 overflow-hidden">
          <div className="space-y-1">
            {errorLines.map((line, index) => (
              <div 
                key={index} 
                className={`transition-all duration-300 ${
                  line.includes('Error') ? 'text-red-400' : 
                  line.includes('Warning') ? 'text-yellow-400' : 
                  line.includes('Success') ? 'text-green-400' : 
                  'text-blue-400'
                }`}
              >
                <span className="text-slate-500">{'>'} </span>
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="w-64 mx-auto space-y-2">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ease-out ${
                loading === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
              style={{ width: `${loading}%` }}
            />
          </div>
          <p className="text-sm text-slate-400">{loading}%</p>
        </div>

        <p className="text-slate-400 text-sm max-w-md mx-auto">
          {loading === 100 ? '🚀 Ready to launch!' : 'Building digital experiences with creativity and precision'}
        </p>
      </div>

      <div 
        className={`fixed transition-all duration-2000 ${
          rocketLaunched 
            ? 'bottom-full left-1/2 -translate-x-1/2 scale-150 rotate-0' 
            : 'bottom-8 left-1/2 -translate-x-1/2 scale-100 rotate-12'
        }`}
      >
        <Rocket 
          className={`w-16 h-16 text-orange-400 ${rocketLaunched ? '' : 'animate-bounce'}`}
          fill="currentColor"
        />
        {rocketLaunched && (
          <>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-2 h-12 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-yellow-400 to-transparent animate-pulse" style={{animationDelay: '0.1s'}} />
          </>
        )}
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        
        {rocketLaunched && (
          <>
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-ping" />
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.3s'}} />
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.6s'}} />
          </>
        )}
      </div>
    </div>
  );
}