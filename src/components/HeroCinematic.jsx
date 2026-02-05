import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight, Sparkles, Search, ArrowUpRight, ShieldCheck } from 'lucide-react';

const HeroCinematic = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const slides = [
        {
            id: 1,
            image: "/banner/banner-1.jpg",
            subtitle: "The Gold Standard",
            title: "Performance.",
            highlight: "Redefined",
            description: "Experience the pinnacle of printing technology. Engineered for those who refuse to compromise on speed or quality.",
            cta: "Explore Collection"
        },
        {
            id: 2,
            image: "/banner/banner-2.jpg",
            subtitle: "Masterpiece Color",
            title: "Precision.",
            highlight: "Unmatched",
            description: "Capture every nuance with our professional-grade color engines. Designed for studios that demand perfection.",
            cta: "View Pro Series"
        },
        {
            id: 3,
            image: "/banner/banner-3.jpg",
            subtitle: "Sustainable Luxury",
            title: "Efficiency.",
            highlight: "Elevated",
            description: "Future-forward technology that respects the planet while delivering uncompromising results for your enterprise.",
            cta: "Discover EcoTank"
        },
        {
            id: 4,
            image: "/banner/banner-1.jpg", // Assuming same images or update paths if they differ
            subtitle: "Next Gen Printing",
            title: "Innovation.",
            highlight: "Advanced",
            description: "Smart features and cloud connectivity built for the modern workspace. Printing has never been this intuitive.",
            cta: "Shop New Tech"
        },
        {
            id: 5,
            image: "/banner/banner-2.jpg",
            subtitle: "Enterprise Solutions",
            title: "Reliability.",
            highlight: "Secured",
            description: "Heavy-duty performance that keeps your business running smoothly. Preferred by professionals worldwide.",
            cta: "Browse Solutions"
        }
    ];

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 6000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, slides.length]);

    const handleHeroSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="relative w-full h-[95vh] min-h-[750px] bg-neutral-900 overflow-hidden group">

            {/* --- BACKGROUND SLIDES --- */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <div className="absolute inset-0">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
                                currentSlide === index ? 'scale-100' : 'scale-110'
                            }`}
                        />
                        {/* Lightened Overlays */}
                        <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent"></div>
                    </div>
                </div>
            ))}

            {/* --- CONTENT CONTAINER --- */}
            <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">

                        {/* LEFT: TEXT CONTENT */}
                        <div className="lg:col-span-7">
                            <div key={currentSlide} className="animate-[fadeInUp_0.8s_ease-out]">
                                
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400">
                                        <Sparkles size={20} />
                                    </div>
                                    <div className="h-4 w-px bg-white/20"></div>
                                    <span className="text-brand-200 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                                        Professional Technology Solutions
                                    </span>
                                </div>

                                <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-serif font-light text-white leading-[0.85] tracking-tight mb-10">
                                    <span className="block opacity-70 text-4xl md:text-5xl lg:text-6xl mb-2 font-sans font-black uppercase tracking-tighter italic drop-shadow-lg">{slides[currentSlide].title}</span>
                                    <span className="relative drop-shadow-2xl">
                                        {slides[currentSlide].highlight}
                                        <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-transparent"></div>
                                    </span>
                                </h1>

                                <p className="text-white/80 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-12 border-l-2 border-brand-500 pl-8 drop-shadow-md">
                                    {slides[currentSlide].description}
                                </p>

                                <div className="flex flex-wrap items-center gap-8">
                                    <Link
                                        to="/products"
                                        className="relative px-12 py-5 bg-brand-600 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-500 transition-all duration-500 group overflow-hidden shadow-2xl gold-shadow"
                                    >
                                        <span className="relative z-10">{slides[currentSlide].cta}</span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    </Link>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-brand-400">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest leading-none mb-1">Authentic Gear</p>
                                            <p className="text-white/60 text-[9px] uppercase tracking-widest font-bold">100% Genuine Warranty</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: FLOATING DISCOVERY CARD */}
                        <div className="hidden lg:block lg:col-span-5 relative">
                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-500/20 rounded-full blur-[100px]"></div>

                            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 shadow-2xl animate-[fadeInRight_1s_ease-out_0.2s] transform hover:-translate-y-2 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-2xl font-serif text-white mb-1">Find Your Device</h3>
                                        <p className="text-white/70 text-sm">Search across 500+ premium products</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-400">
                                        <Search size={20} />
                                    </div>
                                </div>

                                <form onSubmit={handleHeroSearch} className="relative mb-8">
                                    <input 
                                        type="text" 
                                        placeholder="E.g. Wireless Laser Printer..." 
                                        className="w-full h-16 pl-6 pr-16 bg-neutral-900/60 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 outline-none transition-all"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button 
                                        type="submit"
                                        className="absolute right-3 top-3 w-10 h-10 bg-brand-500 text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors"
                                    >
                                        <ArrowUpRight size={20} />
                                    </button>
                                </form>

                                <div>
                                    <p className="text-brand-200 font-bold uppercase tracking-widest text-[10px] mb-4">Trending Collections</p>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { name: 'Laser Pro', link: '/products?search=laser' },
                                            { name: 'EcoTank', link: '/products?search=ecotank' },
                                            { name: '3D Filaments', link: '/products?search=filament' },
                                            { name: 'Photo Paper', link: '/products?search=paper' }
                                        ].map((tag) => (
                                            <Link 
                                                key={tag.name}
                                                to={tag.link}
                                                className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-white/80 text-xs font-medium hover:bg-white hover:text-neutral-900 hover:border-white transition-all"
                                            >
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="absolute bottom-12 left-0 right-0 z-30">
                <div className="container mx-auto px-6 md:px-12 flex justify-between items-end">
                    <div className="flex gap-4">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`group flex flex-col items-start gap-2 transition-all ${
                                    currentSlide === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                                }`}
                            >
                                <span className={`h-0.5 w-12 transition-all ${
                                    currentSlide === idx ? 'bg-brand-500' : 'bg-white'
                                }`}></span>
                                <span className="text-white font-mono text-xs font-bold">0{idx + 1}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                            className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                            className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default HeroCinematic;