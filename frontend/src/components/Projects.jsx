import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Projects = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const ProjectCard = ({ project, index }) => (
    <Card 
      className={`bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer group ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onClick={() => setSelectedProject(project)}
    >
      <CardContent className="p-0">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
            {project.name}
          </h3>
          <p className="text-slate-600 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <Badge key={techIndex} variant="secondary" className="bg-blue-100 text-blue-800">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                +{project.technologies.length - 3} more
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 flex-1"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveLink, '_blank');
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubLink, '_blank');
              }}
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProjectModal = ({ project, onClose }) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <Card className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <CardContent className="p-0">
          {/* Project Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{project.name}</h2>
            <p className="text-slate-600 text-lg mb-6">{project.details}</p>

            {/* Full Tech Stack */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex-1"
                onClick={() => window.open(project.liveLink, '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Live Project
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => window.open(project.githubLink, '_blank')}
              >
                <Github className="w-5 h-5 mr-2" />
                View Source Code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Showcasing my passion for creating impactful, scalable applications
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Want to see more?</h3>
              <p className="text-blue-200 mb-6">
                Check out my GitHub for more projects and contributions
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open(data.contact.github, '_blank')}
              >
                <Github className="w-5 h-5 mr-2" />
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;