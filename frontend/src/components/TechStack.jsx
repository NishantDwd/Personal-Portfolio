import React, { useState, useEffect } from 'react';
import { Code, Database, Settings, Layers } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const TechStack = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('tech-stack');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const techCategories = [
    {
      title: "Languages",
      icon: Code,
      items: data.techStack.languages,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Frameworks & Libraries",
      icon: Layers,
      items: data.techStack.frameworks,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Tools & Technologies",
      icon: Settings,
      items: data.techStack.tools,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Databases",
      icon: Database,
      items: data.techStack.databases,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section id="tech-stack" className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
            Tech <span className="text-indigo-600">Stack</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The technologies and tools I use to bring ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((category, index) => (
            <Card 
              key={index}
              className={`${category.bgColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                {/* Category Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
                </div>

                {/* Tech Items */}
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-md"
                    >
                      <div className={`w-3 h-3 bg-gradient-to-r ${category.color} rounded-full mr-3 flex-shrink-0`}></div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Summary */}
        <div className={`mt-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Full Stack Expertise</h3>
                  <p className="text-indigo-100 text-lg mb-6">
                    Proficient in modern web technologies with a focus on scalable, efficient solutions. 
                    From frontend frameworks to backend architectures, I build complete applications.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white/20 text-white">Real-time Applications</Badge>
                    <Badge className="bg-white/20 text-white">RESTful APIs</Badge>
                    <Badge className="bg-white/20 text-white">Database Design</Badge>
                    <Badge className="bg-white/20 text-white">UI/UX Design</Badge>
                  </div>
                </div>
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-3xl font-bold">3+</div>
                      <div className="text-indigo-200">Years Learning</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-3xl font-bold">15+</div>
                      <div className="text-indigo-200">Technologies</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-3xl font-bold">5+</div>
                      <div className="text-indigo-200">Frameworks</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-3xl font-bold">10+</div>
                      <div className="text-indigo-200">Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechStack;