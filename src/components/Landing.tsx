import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/category/search-engines");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-950 text-center px-4 overflow-hidden w-full">
      {/* Massive Purple Light Background */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-3xl animate-glow-move -z-30 -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2"></div>
      
      {/* Rotating Light Sphere */}
      <div className="absolute w-[600px] h-[600px] bg-radial-gradient(from 50% 50% at 50% 50%, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 100%) animate-spin-slow -z-20 -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2"></div>

      {/* Book Container with Intensive Glow */}
      <div className="relative z-10 group">
        {/* Concentric Purple Halos */}
        <div className="absolute -inset-32 bg-radial-gradient(from 50% 50% at 50% 50%, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0) 70%) rounded-full blur-2xl animate-pulse-slow -z-10"></div>
        <div className="absolute -inset-48 bg-radial-gradient(from 50% 50% at 50% 50%, rgba(147, 51, 234, 0.15) 0%, rgba(147, 51, 234, 0) 80%) rounded-full blur-3xl animate-glow-expand -z-20"></div>
        
        {/* Bouncing Book */}
        <img 
          src="/media/astracodex1.png" 
          alt="AstraCodex Logo" 
          className="w-48 h-48 md:w-64 md:h-64 mb-6 animate-bounce-slow transform-gpu relative z-30 hover:rotate-[5deg] transition-all duration-300 cursor-pointer drop-shadow-purple"
        />
      </div>

      {/* Text Content */}
      <h1 className="text-4xl font-bold text-white mb-3 animate-fade-in-up">
        Welcome to AstraCodex
      </h1>
      
      <p className="text-lg text-gray-300 max-w-xl mb-8 animate-fade-in-up delay-100">
        A curated collection of OSINT & cybersecurity resources. Start exploring by selecting a category.
      </p>

      {/* Explore Button */}
      <button
        onClick={handleExplore}
        className="flex items-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-950 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
      >
        Explore Resources
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Made with love credit with glowing heart */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm mt-8 font-semibold">
        Crafted with  
        <span className="relative mx-1.5">
          <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur-[3px] opacity-75 animate-pulse"></span>
          <span className="relative">❤️</span>
        </span>
        by IQLIP
      </div>
    </div>
  );
};

export default Landing;
