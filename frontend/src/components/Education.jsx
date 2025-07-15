import React, { useState, useEffect } from 'react';
import { GraduationCap, Calendar, School, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const Education = ({ data }) => {
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

    const element = document.getElementById('education');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Education & <span className="text-indigo-400">Learning</span>
          </h2>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
            My academic journey and continuous learning path
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto">
          {data.education.map((edu, index) => (
            <Card 
              key={edu.id}
              className={`bg-white/10 backdrop-blur-sm border-white/20 mb-8 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2 md:mb-0">
                        {edu.degree}
                      </h3>
                      <Badge className="bg-indigo-500 text-white self-start">
                        {edu.status}
                      </Badge>
                    </div>

                    <div className="flex items-center text-indigo-200 mb-3">
                      <School className="w-5 h-5 mr-2" />
                      <span className="text-lg">{edu.institution}</span>
                    </div>

                    <div className="flex items-center text-indigo-200 mb-4">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Expected Graduation: {edu.graduationYear}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                        <CardContent className="p-4">
                          <div className="flex items-center mb-2">
                            <Award className="w-5 h-5 text-indigo-400 mr-2" />
                            <span className="text-white font-semibold">Focus Areas</span>
                          </div>
                          <ul className="text-indigo-200 space-y-1">
                            <li>• Data Structures & Algorithms</li>
                            <li>• Web Development</li>
                            <li>• Database Systems</li>
                            <li>• Software Engineering</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                        <CardContent className="p-4">
                          <div className="flex items-center mb-2">
                            <Award className="w-5 h-5 text-purple-400 mr-2" />
                            <span className="text-white font-semibold">Key Skills</span>
                          </div>
                          <ul className="text-indigo-200 space-y-1">
                            <li>• Problem Solving</li>
                            <li>• System Design</li>
                            <li>• Project Management</li>
                            <li>• Team Collaboration</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Philosophy */}
        <div className={`mt-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Continuous Learning</h3>
                <p className="text-indigo-100 text-lg mb-6 max-w-2xl mx-auto">
                  Education doesn't stop in the classroom. I'm constantly learning new technologies, 
                  exploring innovative solutions, and staying updated with industry trends.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge className="bg-white/20 text-white">Self-Directed Learning</Badge>
                  <Badge className="bg-white/20 text-white">Open Source Contributor</Badge>
                  <Badge className="bg-white/20 text-white">Tech Community Member</Badge>
                  <Badge className="bg-white/20 text-white">Always Curious</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Education;