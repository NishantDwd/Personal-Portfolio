import React, { useState, useEffect } from 'react';
import { User, MapPin, Briefcase, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const About = ({ data }) => {
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

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "500+", label: "Concurrent Users Supported" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "40%", label: "Performance Improvement" },
    { number: "3+", label: "Major Projects" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
              About <span className="text-blue-600">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Info */}
            <div className="space-y-8">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <User className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-slate-800">Who I Am</h3>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {data.personal.bio}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-800 mb-2">Role</h4>
                    <p className="text-slate-600">{data.personal.title}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-800 mb-2">Location</h4>
                    <p className="text-slate-600">{data.personal.location}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Heart className="w-8 h-8 mr-3" />
                    <h3 className="text-2xl font-bold">My Passion</h3>
                  </div>
                  <p className="text-blue-100 text-lg">
                    Tech isn't just my job—it's my playground. I love turning complex problems into elegant solutions and building applications that make a real difference.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                      <div className="text-slate-600 text-sm">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Achievement Highlights */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Key Achievements</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <p className="text-slate-600">Built scalable applications supporting 500+ concurrent users</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <p className="text-slate-600">Reduced message delivery latency to under 20ms with Socket.IO</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <p className="text-slate-600">Improved user interaction time by 40% with responsive UI design</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <p className="text-slate-600">Enhanced backend efficiency by 30% through optimization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;