import React from 'react';
import { ArrowDown, Flame, ShieldAlert, Award } from 'lucide-react';

interface HeroProps {
  onOrderNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNowClick }) => {
  return (
    <section 
      id="home" 
      className="relative min-h-[92svh] flex items-center justify-center overflow-hidden bg-cover bg-center select-none"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 7, 15, 0.45), rgba(10, 7, 15, 0.85)), url('https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&auto=format&fit=crop&q=80')`
      }}
    >
      {/* Decorative colored glow orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-brand-red/25 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-purple/35 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Floating Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass mb-6 border border-brand-yellow/30 text-xs font-semibold text-brand-yellow animate-float">
          <Flame size={14} className="text-brand-red fill-brand-red animate-pulse" />
          <span>Bapatla's Favourite Culinary Junction</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 animate-slide-up drop-shadow-xl">
          Taste the Legacy of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-yellow to-brand-gold">
            Chilli's Restaurant
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base md:text-xl text-gray-200 font-normal leading-relaxed mb-8 drop-shadow-md">
          Savour the authentic dum biryanis, hot spicy tandoori kababs, and sizzling Chinese delights. Prepared in our highly hygienic kitchen using 100% fresh ingredients.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14 items-center justify-center">
          <button
            onClick={onOrderNowClick}
            className="w-full sm:w-auto px-8 py-4 bg-brand-red text-white text-base font-bold rounded-xl shadow-lg shadow-brand-red/35 hover:shadow-brand-red/50 hover:bg-brand-red/90 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
          >
            Order Delivery Now
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full sm:w-auto px-8 py-4 glass text-white hover:bg-white/10 text-base font-bold rounded-xl border border-white/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
          >
            View Menu Card
          </button>
        </div>

        {/* Floating feature highlights */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="glass p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10 hover:border-brand-yellow/30 transition-all duration-300">
            <Award className="text-brand-yellow mb-2" size={28} />
            <span className="text-white font-serif font-bold text-lg">4.8 ★ Rating</span>
            <span className="text-gray-300 text-xs mt-0.5">1,200+ Google Reviews</span>
          </div>

          <div className="glass p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10 hover:border-brand-yellow/30 transition-all duration-300">
            <Flame className="text-brand-red mb-2 animate-pulse" size={28} />
            <span className="text-white font-serif font-bold text-lg">120+ Dishes</span>
            <span className="text-gray-300 text-xs mt-0.5">Indian, Chinese, Tandoori</span>
          </div>

          <div className="col-span-2 md:col-span-1 glass p-4 rounded-2xl flex flex-col items-center justify-center border border-white/10 hover:border-brand-yellow/30 transition-all duration-300">
            <ShieldAlert className="text-green-400 mb-2" size={28} />
            <span className="text-white font-serif font-bold text-lg">100% Hygienic</span>
            <span className="text-gray-300 text-xs mt-0.5">Super Safe Kitchen Protocols</span>
          </div>
        </div>
      </div>

      {/* Down arrow link indicator */}
      <div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => {
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      >
        <ArrowDown size={24} />
      </div>
    </section>
  );
};
