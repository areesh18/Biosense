import React, { useState } from 'react';
import { Activity, Shield, Brain, Users, ArrowRight, Menu, X } from 'lucide-react';

export default function BioSenseLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-Time Monitoring",
      description: "Track vital signs continuously with ISAAC sensor integration"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy-First",
      description: "Federated learning ensures your data stays secure and private"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Get intelligent health predictions and anomaly detection"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Care",
      description: "Seamless connection between patients and healthcare providers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">BioSense</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition">How It Works</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition">About</a>
              <a href="/login" className="px-4 py-2 text-blue-600 hover:text-blue-700 transition">
                Login
              </a>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5">
                Get Started
              </button>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-slate-600 hover:text-blue-600 transition">Features</a>
              <a href="#how-it-works" className="block text-slate-600 hover:text-blue-600 transition">How It Works</a>
              <a href="#about" className="block text-slate-600 hover:text-blue-600 transition">About</a>
              <a href="/login" className="block w-full text-left text-blue-600 hover:text-blue-700 transition">
                Login
              </a>
              <button className="block w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="whitespace-nowrap">Privacy-Preserving Healthcare Monitoring</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight px-4">
              Your Health,
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Intelligently Monitored</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed px-4">
              Real-time vital signs monitoring powered by federated AI. 
              Secure, private, and intelligent healthcare at your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm sm:text-base">
                <span>Start Monitoring</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-700 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition text-sm sm:text-base">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-12 sm:mt-16 md:mt-20 relative px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-3xl"></div>
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-6 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">72 BPM</div>
                  <div className="text-sm sm:text-base text-slate-600">Heart Rate</div>
                  <div className="mt-3 sm:mt-4 h-12 sm:h-16 flex items-end space-x-1">
                    {[40, 65, 55, 70, 60, 75, 72].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-400 rounded-t" style={{height: `${h}%`}}></div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">98%</div>
                  <div className="text-sm sm:text-base text-slate-600">SpO₂ Level</div>
                  <div className="mt-3 sm:mt-4 flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 sm:border-8 border-green-200 flex items-center justify-center">
                      <span className="text-lg sm:text-2xl font-bold text-green-600">Normal</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 rounded-xl sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">36.7°C</div>
                  <div className="text-sm sm:text-base text-slate-600">Temperature</div>
                  <div className="mt-3 sm:mt-4 flex items-center justify-center">
                    <div className="w-full max-w-xs h-3 sm:h-4 bg-gradient-to-r from-blue-300 via-green-300 to-red-300 rounded-full relative">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 sm:border-4 border-white shadow-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 px-4">
              Powerful Features for Modern Healthcare
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 px-4">
              Everything you need to monitor and understand your health
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-5 sm:p-6 rounded-xl border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center text-blue-600 mb-3 sm:mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 px-4">
              How BioSense Works
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 px-4">
              Simple, secure, and intelligent monitoring in three steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-8">
            <div className="text-center px-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">Connect Sensors</h3>
              <p className="text-sm sm:text-base text-slate-600">Link your ISAAC sensors to collect real-time vital signs</p>
            </div>
            <div className="text-center px-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">AI Analysis</h3>
              <p className="text-sm sm:text-base text-slate-600">Federated AI models analyze your data locally and privately</p>
            </div>
            <div className="text-center px-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">Get Insights</h3>
              <p className="text-sm sm:text-base text-slate-600">Receive personalized health insights and anomaly alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users monitoring their health with BioSense
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transition transform hover:-translate-y-1">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">BioSense</span>
              </div>
              <p className="text-sm">Privacy-first healthcare monitoring powered by federated AI</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">HIPAA</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
            © 2025 BioSense. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}