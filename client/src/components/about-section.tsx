import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, BarChart3, Building2, Sparkles, ArrowRight } from "lucide-react";

export default function AboutSection() {
  const objectives = [
    { 
      icon: Target, 
      title: "Predict Congestion", 
      description: "AI-powered traffic prediction algorithms",
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      icon: Eye, 
      title: "Identify Hotspots", 
      description: "Real-time accident and congestion detection",
      color: "from-purple-500 to-pink-500" 
    },
    { 
      icon: BarChart3, 
      title: "Interactive Dashboard", 
      description: "Modern analytics and visualization platform",
      color: "from-green-500 to-emerald-500" 
    },
    { 
      icon: Building2, 
      title: "Smart Planning", 
      description: "Data-driven urban development insights",
      color: "from-orange-500 to-red-500" 
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              About the Project
            </div>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent" data-testid="about-title">
              Revolutionizing Urban Traffic
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed" data-testid="about-description">
              Visakhapatnam's rapid growth has led to increasing traffic congestion, delays, and accidents. Traditional systems are reactive rather than predictive, making it difficult for commuters and planners to take proactive measures.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Vision */}
            <div className="space-y-8">
              <Card className="group bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900" data-testid="project-vision-title">
                        Our Vision
                      </h3>
                      <p className="text-gray-600 leading-relaxed" data-testid="project-vision-description">
                        This project leverages Python-based data processing, statistical analysis, and machine learning models to generate actionable insights. By consolidating these elements into a single interactive dashboard, we aim to support data-driven decisions and improve traffic management efficiency.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Objectives Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {objectives.map((objective, index) => {
                  const IconComponent = objective.icon;
                  return (
                    <Card
                      key={index}
                      className="group bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 card-hover"
                      data-testid={`objective-card-${index}`}
                    >
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-r ${objective.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">{objective.title}</h4>
                          <p className="text-sm text-gray-600">{objective.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            {/* Right Column - Analytics Preview */}
            <div className="relative">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-2xl overflow-hidden">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-white">Live Analytics</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">Real-time</span>
                    </div>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Traffic Flow</span>
                      <span className="text-white font-semibold">87%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-[87%] animate-pulse"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Congestion Level</span>
                      <span className="text-white font-semibold">Medium</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full w-[65%] animate-pulse"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Prediction Accuracy</span>
                      <span className="text-white font-semibold">94.2%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-[94%] animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-black text-blue-400 mb-1">10+</div>
                      <div className="text-xs text-gray-400">Zones</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-purple-400 mb-1">24/7</div>
                      <div className="text-xs text-gray-400">Monitoring</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-green-400 mb-1">99%</div>
                      <div className="text-xs text-gray-400">Uptime</div>
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
}