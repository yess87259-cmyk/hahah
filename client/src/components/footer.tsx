import { Zap, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { id: "about", label: "About" },
    { id: "methodology", label: "Methodology" },
    { id: "results", label: "Results" },
    { id: "impact", label: "Impact" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-black">
                  <span className="text-white">Vizag</span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Traffic</span>
                  <span className="text-white">Pulse</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed" data-testid="footer-description">
                Revolutionizing urban traffic management through predictive analytics and machine learning for smarter, safer cities.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white" data-testid="footer-quick-links-title">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group"
                      data-testid={`footer-link-${link.id}`}
                    >
                      <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Live Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Active Zones</span>
                  <span className="text-white font-semibold">10+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Accuracy</span>
                  <span className="text-green-400 font-semibold">99.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Uptime</span>
                  <span className="text-blue-400 font-semibold">24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left" data-testid="footer-copyright">
                © 2025 Vizag Traffic Pulse. All rights reserved.
              </p>
              
              {/* Back to Top */}
              <Button
                onClick={scrollToTop}
                variant="ghost"
                className="group text-gray-400 hover:text-white transition-all duration-300"
              >
                <span className="mr-2">Back to top</span>
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}