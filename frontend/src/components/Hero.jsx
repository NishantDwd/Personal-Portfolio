import React, { useEffect, useState } from 'react';
import { ChevronDown, Code, Sparkles, Globe } from 'lucide-react';
import { Button } from './ui/button';

const Hero = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);

  const titles = [
    "Full Stack Developer",
    "Problem Solver",
    "Code Architect",
    "Innovation Driver"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={data.personal.heroBackground} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-50"></div>
      </div>

      {/* Content */}
      <div className={`relative z-20 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Profile Image */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm">
            <img 
              src={data.personal.profileImage} 
              alt={data.personal.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Name and Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          {data.personal.name}
        </h1>
        
        <div className="h-16 mb-6 flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-light text-blue-300 transition-all duration-500">
            {titles[currentTitle]}
          </h2>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center mb-8 text-white/80">
          <Globe className="w-5 h-5 mr-2" />
          <span className="text-lg">{data.personal.location}</span>
        </div>

        {/* Bio */}
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          {data.personal.bio}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            onClick={() => scrollToSection('projects')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Code className="w-5 h-5 mr-2" />
            View My Work
          </Button>
          <Button 
            onClick={() => scrollToSection('contact')}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            Get In Touch
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <ChevronDown 
            className="w-8 h-8 text-white/60 mx-auto cursor-pointer hover:text-white transition-colors"
            onClick={() => scrollToSection('about')}
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
    </div>
  );
};

export default Hero;