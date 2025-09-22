import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            AI-Powered Traffic Analytics
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight animate-fade-in-up" data-testid="hero-title">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Vizag
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-gradient-x" style={{ animationDelay: '0.5s' }}>
              Traffic
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent animate-gradient-x" style={{ animationDelay: '1s' }}>
              Pulse
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }} data-testid="hero-subtitle">
            Predictive Dashboard for Urban Congestion
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }} data-testid="hero-description">
            Leveraging machine learning and real-time analytics to predict traffic patterns, identify congestion hotspots, and enable data-driven urban planning for smarter cities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <Button
              onClick={() => scrollToSection("results")}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 min-w-[200px]"
              data-testid="button-view-results"
            >
              <span className="flex items-center gap-3">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                View Live Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button
              onClick={() => scrollToSection("about")}
              variant="outline"
              className="group px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 hover:bg-white/20 text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105 min-w-[200px]"
              data-testid="button-learn-more"
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Explore Features
              </span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">99.2%</div>
              <div className="text-white/70 font-medium">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-white/70 font-medium">Real-time Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">10+</div>
              <div className="text-white/70 font-medium">Traffic Zones</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
  );
}