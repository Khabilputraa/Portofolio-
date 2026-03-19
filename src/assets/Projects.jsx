import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'SIGAYAPATEN',
      description: 'Description for your first project - what it does and technologies used',
      image: '/img/Beranda.png',
      tags: ['Boostrap', 'Python', 'Django'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Online Musical Instrument Rental Platform',
      description: 'Description for your second project - what it does and technologies used',
      image: '/img/cagar_budaya.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'Python', 'Django'],
      github: 'https://github.com/Khabilputraa/tugas-akhir-2025',
      demo: '#'
    },
    {
      title: 'Rental Musical Instrument platform in Malang',
      description: 'Description for your second project - what it does and technologies used',
      image: '/img/Signup.png',
      tags: ['HTML', 'CSS', 'JavaScript'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Dharma Cipta Karya',
      description: 'Backend for a company profile website using Django, providing an admin interface for content management and dynamic rendering of company information.',
      image: '/img/dharma_cipta.png',
      tags: ['react.js, django, python'],
      github: '#',
      demo: 'http://dharmaciptakarya.com/'
    },
    {
      title: 'Favor Indonesia',
      description: 'Developing a backend system using Python and the Django framework to manage and serve content for a company profile.',
      image: '/img/favor_indo.png',
      tags: ['HTML, CSS, JavaScript'],
      github: '#',
      demo: '#'
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          My <span className="text-purple-400">Projects</span>
        </h2>
        <div className="w-24 h-1 bg-purple-600 mx-auto mb-4"></div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Some of my recent work and side projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700 hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105 flex flex-col h-full"
          >
            <div className="h-48 bg-slate-900 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-slate-400 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
                <a
                  href={project.github}
                  className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors"
                >
                  <Github size={20} />
                  <span>Code</span>
                </a>
                <a
                  href={project.demo}
                  className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors"
                >
                  <ExternalLink size={20} />
                  <span>Demo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
