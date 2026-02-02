import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { ShieldCheck, Target, Zap, ArrowRight, Quote, Sparkles, ChevronRight, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const [branding, setBranding] = useState({ name: 'Inktrix' });
    
    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        api.get(`/websites/${websiteId}`).then(res => setBranding(res.data)).catch(() => { });
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-500 selection:text-white">
            <SEO
                pageName="about"
                fallbackTitle={`Our Story | ${branding.name}`}
                fallbackDesc={`Discover the vision and commitment to excellence behind ${branding.name}.`}
            />

            {/* --- CLEAN HERO SECTION --- */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-neutral-950 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold uppercase tracking-widest mb-8">
                        <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-neutral-300">About Us</span>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-3/5 text-left">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
                                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
                                    <span className="text-brand-500 font-black uppercase tracking-[0.3em] text-[10px]">The Gold Standard</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight tracking-tight mb-8">
                                    Engineering Excellence for <br />
                                    <span className="italic text-brand-400 font-medium">Modern Enterprises.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl border-l border-white/10 pl-8">
                                    At <strong>{branding.name}</strong>, we bridge the gap between high-performance hardware and artisanal reliability. Our mission is to provide the tools that empower your professional legacy.
                                </p>
                            </motion.div>
                        </div>
                        <div className="w-full lg:w-2/5">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5 relative group">
                                    <img src="/about-us.jpg" className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt="Our Team" />
                                    <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors duration-700"></div>
                                </div>
                                {/* Subtle Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-brand-600 text-white p-6 rounded-2xl shadow-xl gold-shadow hidden md:block z-20">
                                    <p className="text-3xl font-black leading-none mb-1">10</p>
                                    <p className="text-[8px] font-bold uppercase tracking-widest leading-tight">Years of <br/>Expertise</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PHILOSOPHY SECTION --- */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="bg-neutral-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
                                <Quote className="text-brand-500 mb-6 opacity-50" size={40} />
                                <p className="text-2xl font-serif leading-relaxed mb-8 italic">
                                    "We curate the instruments of professional efficiency, ensuring that quality is never a variable, but a constant."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold">JD</div>
                                    <p className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Founding Vision</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <span className="text-brand-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">The Atelier Standards</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 leading-tight mb-8">Curating the <span className="italic text-brand-500">Gold Standard.</span></h2>
                            <p className="text-neutral-500 leading-relaxed font-light mb-8 text-lg">
                                We believe technology should be invisible yet impactful. Our selection process is rigorous, identifying only the most resilient hardware capable of handling high-stakes environments.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <Award className="text-brand-600" size={24} />
                                    <h4 className="font-bold text-neutral-900">Certified Quality</h4>
                                    <p className="text-xs text-neutral-400">100% genuine sourcing only.</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Globe className="text-brand-600" size={24} />
                                    <h4 className="font-bold text-neutral-900">Global Reach</h4>
                                    <p className="text-xs text-neutral-400">Enterprise logistics support.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CORE DNA --- */}
            <section className="py-32 bg-neutral-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-brand-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Core Values</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 leading-tight">Built on <span className="italic text-brand-500">Integrity.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <DNACard 
                            number="01" 
                            title="Pure Sourcing" 
                            desc="We maintain direct relationships with global manufacturers to ensure every component is authentic."
                        />
                        <DNACard 
                            number="02" 
                            title="Radical Precision" 
                            desc="Accuracy is our standard, from DPI resolutions to our logistics and technical support turnaround times."
                        />
                        <DNACard 
                            number="03" 
                            title="Futurist Vision" 
                            desc="We curate hardware that isn't just powerful today, but remains relevant for the professional decade ahead."
                        />
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-32 container mx-auto px-6">
                <div className="relative rounded-[4rem] bg-neutral-900 overflow-hidden p-10 md:p-24 text-center border border-white/5">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]"></div>
                    
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-7xl font-serif text-white leading-tight mb-12 tracking-tight">
                            Elevate your <br/><span className="italic text-brand-400">Professional</span> Workspace.
                        </h2>
                        <Link to="/products" className="inline-flex items-center gap-6 px-12 py-6 bg-brand-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-neutral-900 transition-all gold-shadow group">
                            Explore The Collection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const DNACard = ({ number, title, desc }) => (
    <div className="p-12 rounded-[2.5rem] bg-white border border-neutral-100 hover:border-brand-500 transition-all duration-500 shadow-sm hover:shadow-2xl group">
        <span className="text-4xl font-serif text-neutral-100 group-hover:text-brand-500/30 transition-colors duration-500 block mb-6">{number}</span>
        <h3 className="text-xl font-bold text-neutral-900 mb-4">{title}</h3>
        <p className="text-neutral-500 leading-relaxed font-light text-sm">{desc}</p>
    </div>
);

export default AboutUs;
