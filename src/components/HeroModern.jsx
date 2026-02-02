import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShoppingCart, Star, Clock, Zap, MoveRight } from 'lucide-react';

const HeroModern = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 10, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-slate-50 pt-32 pb-20 px-4 md:px-8 overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-200/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          
          {/* --- MAIN HERO CARD (Left - Spans 8 cols) --- */}
          <div className="lg:col-span-8 relative group rounded-[2.5rem] overflow-hidden bg-white shadow-2xl shadow-slate-200/50 h-[500px] lg:h-full">
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500 z-10"></div>
            <img 
              src="/banner/banner-1.jpg" 
              alt="Main Hero" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent">
              <div className="max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-4 py-1.5 bg-brand-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                  New Arrival
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                  Enterprise Laser <br />
                  <span className="text-brand-300">Pro Series X1.</span>
                </h1>
                <p className="text-slate-300 text-sm md:text-base font-medium max-w-md mb-8 line-clamp-2">
                  Experience the future of business printing with ultra-fast speeds and eco-tank efficiency.
                </p>
                <div className="flex gap-4">
                  <Link 
                    to="/products" 
                    className="px-8 py-4 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 hover:text-white transition-all flex items-center gap-2"
                  >
                    Shop Now <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* --- SIDE COLUMN (Right - Spans 4 cols) --- */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full">
            
            {/* Top Card: FLASH SALE */}
            <div className="flex-1 rounded-[2.5rem] bg-slate-900 relative overflow-hidden p-8 flex flex-col justify-between group">
              {/* Abstract decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-brand-400 font-black tracking-widest text-[10px] uppercase flex items-center gap-2">
                        <Zap size={14} fill="currentColor" /> Flash Deal
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold rounded-full border border-white/10">
                        -40% OFF
                    </span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">Smart Tank <br/> Wireless</h3>
                <p className="text-slate-400 text-xs font-medium">Limited stock available for this offer.</p>
              </div>

              {/* Countdown Timer */}
              <div className="relative z-10 mt-4">
                  <div className="flex items-center gap-2 mb-2 text-white/50 text-[10px] font-bold uppercase tracking-wider">
                      <Clock size={12} /> Ends In
                  </div>
                  <div className="flex gap-2">
                      <TimeBox val={timeLeft.hours} label="HRS" />
                      <span className="text-white/20 text-xl font-light">:</span>
                      <TimeBox val={timeLeft.minutes} label="MIN" />
                      <span className="text-white/20 text-xl font-light">:</span>
                      <TimeBox val={timeLeft.seconds} label="SEC" />
                  </div>
                  <Link to="/products" className="mt-6 w-full py-3 bg-brand-600 text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
                      Grab Deal
                  </Link>
              </div>
            </div>

            {/* Bottom Card: DISCOVER CATEGORY */}
            <div className="flex-1 rounded-[2.5rem] bg-white border border-slate-100 relative overflow-hidden p-8 flex items-center group shadow-xl shadow-slate-200/20">
               <div className="w-1/2 relative z-10">
                  <span className="text-slate-400 font-black tracking-widest text-[10px] uppercase mb-2 block">Trending</span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-4">
                      All-in-One <br/> <span className="text-brand-600">Series.</span>
                  </h3>
                  <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-brand-600 transition-colors uppercase tracking-wider group-hover:gap-3 duration-300">
                      View <MoveRight size={14} />
                  </Link>
               </div>
               <div className="absolute right-[-20px] bottom-[-20px] w-[60%] h-[120%]">
                   <img 
                    src="/category/Inkjet.jpg" 
                    alt="Product" 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500"
                   />
               </div>
            </div>

          </div>
        </div>

        {/* --- BOTTOM STATS BAR --- */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox icon={<ShoppingCart size={18} />} title="Free Shipping" subtitle="On all orders > $500" />
            <StatBox icon={<Star size={18} />} title="4.9/5 Rating" subtitle="Verified Reviews" />
            <StatBox icon={<Zap size={18} />} title="Fast Delivery" subtitle="24h Dispatch" />
            <StatBox icon={<Clock size={18} />} title="24/7 Support" subtitle="Expert Assistance" />
        </div>

      </div>
    </section>
  );
};

const TimeBox = ({ val, label }) => (
    <div className="flex flex-col items-center">
        <span className="text-2xl font-black text-white tabular-nums tracking-tight">
            {val.toString().padStart(2, '0')}
        </span>
        <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest">{label}</span>
    </div>
);

const StatBox = ({ icon, title, subtitle }) => (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-all cursor-default">
        <div className="w-10 h-10 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">{title}</h4>
            <p className="text-[10px] text-slate-500 font-medium">{subtitle}</p>
        </div>
    </div>
);

export default HeroModern;