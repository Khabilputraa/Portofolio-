import React from 'react';
import { Code, Coffee, Lightbulb, Rocket } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Code className="text-purple-400" size={32} />,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code following best practices'
    },
    {
      icon: <Lightbulb className="text-purple-400" size={32} />,
      title: 'Creative Solutions',
      description: 'Innovative approaches to solve complex problems'
    },
    {
      icon: <Rocket className="text-purple-400" size={32} />,
      title: 'Fast Performance',
      description: 'Optimized applications for the best user experience'
    },
    {
      icon: <Coffee className="text-purple-400" size={32} />,
      title: 'Dedicated Work',
      description: 'Committed to delivering quality results on time'
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          About <span className="text-purple-400">Me</span>
        </h2>
        <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white">
            I'm a Passionate Web Developer
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            I’m a Frontend Developer who enjoys creating beautiful, responsive, and meaningful digital experiences.
            With basic backend skills, I’m able to build applications that are not only visually appealing but also functional and reliable.
            I love exploring new ideas and technologies, and I’m always excited to learn and improve my craft.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            I build clean, fast, and easy-to-use interfaces powered by well-structured code.
            My goal is to deliver smooth user experiences through simple yet effective design.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h4>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}