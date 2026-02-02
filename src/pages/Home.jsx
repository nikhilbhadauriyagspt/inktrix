import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import HeroCinematic from '../components/HeroCinematic';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';
import Skeleton from '../components/Skeleton';
import {
    Star, Heart, Truck, ShieldCheck, Mail,
    ChevronLeft, ChevronRight, Zap, Quote, Sparkles,
    MoveRight, Headphones, CreditCard, ShoppingBag, Plus, ArrowUpRight, Play, CheckCircle2, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState('New Arrivals');
    const [deal, setDeal] = useState(null);
    const { addToCart } = useCart();
    const [email, setEmail] = useState('');
    
    const [isProductsLoading, setIsProductsLoading] = useState(true);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = 350;
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        let interval;
        if (!isHovered && categories.length > 0) {
            interval = setInterval(() => {
                if (scrollRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                    if (scrollLeft + clientWidth >= scrollWidth - 10) {
                        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                }
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isHovered, categories]);

    useEffect(() => {
        const fetchFastData = async () => {
            try {
                const [catRes, dealRes, blogRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/settings/deal'),
                    api.get('/blogs')
                ]);
                setCategories(catRes.data);
                setDeal(dealRes.data);
                setBlogs(blogRes.data);
            } catch (error) {
                console.error("Error fetching fast data:", error);
            } finally {
                setIsInitialLoading(false);
            }
        };
        fetchFastData();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const prodRes = await api.get('/products');
                setProducts(prodRes.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsProductsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const getTabProducts = () => {
        if (activeTab === 'New Arrivals') return [...products].sort((a, b) => b.id - a.id).slice(0, 8);
        if (activeTab === 'Best Sellers') return products.filter(p => p.is_best_selling).slice(0, 8);
        if (activeTab === 'On Sale') return products.filter(p => parseFloat(p.mrp) > parseFloat(p.price)).slice(0, 8);
        return products.slice(0, 8);
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        toast.success("Successfully Subscribed!");
        setEmail('');
    };

    const tabProducts = getTabProducts();

    return (
        <div className="bg-white min-h-screen relative font-sans selection:bg-brand-500 selection:text-white">
            <SEO pageName="home" fallbackTitle="Home - Inktrix" fallbackDesc="Shop premium technology." />

            <HeroCinematic />

            {/* --- SECTION 1: QUICK STATS --- */}
            <section className="py-12 bg-white border-b border-neutral-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <span className="text-3xl font-serif text-neutral-900 mb-1 tracking-tighter">5k+</span>
                            <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Active Clients</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-3xl font-serif text-neutral-900 mb-1 tracking-tighter">99.9%</span>
                            <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Uptime Guarantee</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-3xl font-serif text-neutral-900 mb-1 tracking-tighter">24h</span>
                            <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Global Support</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-3xl font-serif text-neutral-900 mb-1 tracking-tighter">0%</span>
                            <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Interest EMI</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: CURATED SELECTION (Seasonal Essentials) --- */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12">
                        <div className="max-w-xl">
                            <p className="text-brand-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Curated Gear</p>
                            <h2 className="text-5xl md:text-7xl font-serif font-medium text-neutral-900 leading-[0.85] tracking-tight mb-8">
                                Seasonal <br/><span className="italic text-brand-500">Essentials.</span>
                            </h2>
                        </div>

                        <div className="flex flex-col items-end gap-8 self-end">
                            <div className="flex p-1 bg-neutral-50 rounded-full border border-neutral-200">
                                {['New Arrivals', 'Best Sellers', 'On Sale'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === tab
                                            ? 'bg-brand-600 text-white shadow-xl scale-105 gold-shadow'
                                            : 'text-neutral-400 hover:text-neutral-600'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {isProductsLoading ? (
                             Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-96 rounded-3xl" />)
                        ) : (
                            tabProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: CATEGORY SLIDER (Discovery Hub) --- */}
            <section className="py-24 bg-neutral-900 overflow-hidden relative">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                             <p className="text-brand-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Discovery Hub</p>
                             <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight tracking-tight">Browse Our <span className="italic text-brand-400">Ecosystems.</span></h2>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <button 
                                onClick={() => scroll('left')}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all shadow-sm"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button 
                                onClick={() => scroll('right')}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all shadow-sm"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div 
                        ref={scrollRef}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="flex overflow-x-auto gap-5 pb-12 no-scrollbar snap-x snap-mandatory"
                    >
                        {isInitialLoading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 80px) / 5.5)' }}>
                                    <Skeleton className="h-full aspect-[4/5] rounded-[2.5rem] bg-white/5" />
                                </div>
                            ))
                        ) : (
                            categories.map((cat, i) => (
                                <motion.div
                                    key={cat.id}
                                    whileHover={{ y: -8 }}
                                    className="snap-start flex-shrink-0"
                                    style={{ width: 'calc((100% - 80px) / 5.5)' }}
                                >
                                    <Link 
                                        to={`/products?category=${cat.slug}`}
                                        className="group relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 hover:border-brand-500 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/10 block"
                                    >
                                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                                            <div className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur shadow-sm flex items-center justify-center text-white/40 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                                                <ArrowUpRight size={20} />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-2xl leading-tight mb-2 tracking-tight">{cat.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-4 h-[1px] bg-brand-400"></span>
                                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Explore Gear</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                        <img 
                                            src={cat.image?.startsWith('http') ? cat.image : `/category/${cat.image}`} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                                            alt={cat.name}
                                        />
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: PRO SERIES SPOTLIGHT --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="bg-neutral-900 rounded-[4rem] border border-white/5 p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-600/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>

                        <div className="lg:w-1/2 relative z-10">
                            <span className="text-brand-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Elite Collection 2026</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-8 tracking-tight">Precision in <br/><span className="italic text-brand-400">Every Pixel.</span></h2>
                            <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-lg font-light">
                                Experience the future of enterprise printing. The LaserCore Pro series combines artisanal aesthetics with pure, uncompromising performance.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div className="flex items-start gap-4 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-500 group-hover/item:bg-brand-500 group-hover/item:text-white transition-all duration-500">
                                        <Zap size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-1">Ultra Speed</h4>
                                        <p className="text-white/30 text-[9px] uppercase font-black tracking-widest">120 Pages Per Minute</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-500 group-hover/item:bg-brand-500 group-hover/item:text-white transition-all duration-500">
                                        <Sparkles size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-1">Color Logic</h4>
                                        <p className="text-white/30 text-[9px] uppercase font-black tracking-widest">99.9% Color Accuracy</p>
                                    </div>
                                </div>
                            </div>

                            <Link to="/products" className="inline-flex items-center gap-4 px-10 py-5 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-neutral-900 transition-all gold-shadow group">
                                Explore Pro Series <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>

                        <div className="lg:w-1/2 relative group">
                            <div className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl z-20 hidden md:block animate-bounce duration-[3000ms]">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-xs">Quality Certified</p>
                                        <p className="text-white/40 text-[9px] uppercase tracking-widest">Enterprise Grade</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <img 
                                    src="/products/image_1.png" 
                                    className="relative z-10 w-full h-auto object-contain transform group-hover:scale-110 transition-transform duration-1000 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                    alt="Pro Series Spotlight"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: TRENDING SPOTLIGHT --- */}
            <section className="py-24 bg-neutral-50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                         <h2 className="text-5xl md:text-6xl font-serif text-neutral-900 tracking-tight">Trending <span className="italic text-brand-500">Spotlight</span></h2>
                         <Link to="/products" className="text-xs font-black uppercase tracking-widest text-brand-600 hover:text-neutral-900 transition-colors mb-2">See All Trending Gear</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {isProductsLoading ? (
                            Array(2).fill(0).map((_, i) => <Skeleton key={i} className="h-96 rounded-3xl" />)
                        ) : (
                            products.filter(p => p.is_best_selling).slice(0, 2).map((product) => (
                                <Link to={`/product/${product.slug}`} key={product.id} className="group relative h-[450px] rounded-[3.5rem] overflow-hidden bg-white flex items-center p-12 hover:shadow-2xl transition-all duration-700 border border-neutral-100">
                                    <div className="w-1/2 relative z-10">
                                        <span className="inline-block px-3 py-1 bg-brand-600 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg mb-6">Flagship</span>
                                        <h3 className="text-3xl font-serif text-neutral-900 mb-4 group-hover:text-brand-600 transition-colors leading-tight">{product.name}</h3>
                                        <p className="text-2xl font-black text-neutral-900 mb-10 tracking-tighter">${product.price}</p>
                                        <div className="w-12 h-12 rounded-2xl border border-neutral-200 flex items-center justify-center text-neutral-300 group-hover:bg-neutral-900 group-hover:border-neutral-900 group-hover:text-white transition-all">
                                            <ArrowUpRight size={20}/>
                                        </div>
                                    </div>
                                    <div className="w-1/2 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000">
                                        <img
                                            src={product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`}
                                            alt={product.name}
                                            className="max-w-full max-h-[300px] object-contain mix-blend-multiply"
                                        />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* --- SECTION 6: THE ATELIER STORY --- */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative order-2 lg:order-1">
                             <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl relative z-10">
                                <img src="/home/middle-bg.jpg" className="w-full h-full object-cover" alt="Atelier" />
                             </div>
                             <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-500 rounded-full blur-[80px] opacity-20 animate-pulse"></div>
                             <div className="absolute -bottom-12 -right-12 p-10 bg-neutral-900 text-white rounded-[2rem] shadow-2xl z-20 hidden md:block max-w-xs">
                                <Quote className="text-brand-500 mb-4" size={32} />
                                <p className="font-serif italic text-lg opacity-80 leading-relaxed">"True technology doesn't just work; it inspires."</p>
                             </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-brand-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Our Philosophy</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-neutral-900 leading-tight mb-8 tracking-tight">Engineering a <br/><span className="text-brand-500 italic">Sharper Future.</span></h2>
                            <p className="text-neutral-500 text-lg leading-relaxed mb-12 font-light">
                                At Inktrix, we believe hardware should be invisible, letting your creativity take center stage. Every device in our collection is hand-selected for precision and longevity.
                            </p>
                            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-neutral-100">
                                <div>
                                    <p className="text-5xl font-serif text-neutral-900 mb-2 tracking-tighter">99%</p>
                                    <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Color Accuracy</p>
                                </div>
                                <div>
                                    <p className="text-5xl font-serif text-neutral-900 mb-2 tracking-tighter">24h</p>
                                    <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Global Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 7: EDITORIAL JOURNAL (BLOGS) --- */}
            <section className="py-24 bg-neutral-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                             <p className="text-brand-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Editorial Journal</p>
                             <h2 className="text-5xl md:text-6xl font-serif text-neutral-900 leading-tight tracking-tight">The Future of <br/><span className="italic text-brand-500">Tech Insights.</span></h2>
                        </div>
                        <Link to="/blogs" className="text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-brand-600 transition-colors flex items-center gap-2 mb-2">Read Full Journal <ArrowRight size={14}/></Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {isInitialLoading ? (
                             Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-[450px] rounded-[3rem]" />)
                        ) : (
                            blogs.slice(0, 3).map((blog) => (
                                <Link key={blog.id} to={`/blog/${blog.slug}`} className="group flex flex-col bg-white rounded-[3rem] overflow-hidden border border-neutral-100 hover:shadow-2xl transition-all duration-500">
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <img 
                                            src={blog.image_url?.startsWith('http') ? blog.image_url : `/blogs/${blog.image_url}`} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            alt={blog.title}
                                        />
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-900">
                                            Insight
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col flex-1">
                                        <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4">
                                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <h3 className="text-2xl font-serif text-neutral-900 mb-6 group-hover:text-brand-600 transition-colors leading-tight line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <div className="mt-auto flex items-center gap-2 text-neutral-400 font-black text-[10px] uppercase tracking-widest group-hover:text-neutral-900 transition-colors">
                                            Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* --- SECTION 8: WHY CHOOSE US --- */}
            <section className="py-24 bg-white border-t border-neutral-100">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-16">
                        <BenefitCard
                            icon={<ShieldCheck size={28} />}
                            title="Authentic Sourcing"
                            desc="Direct partnerships with global manufacturers ensure 100% genuine hardware."
                        />
                        <BenefitCard
                            icon={<Truck size={28} />}
                            title="Secured Logistics"
                            desc="Specialized handling and global express shipping for high-value equipment."
                        />
                        <BenefitCard
                            icon={<Headphones size={28} />}
                            title="Priority Concierge"
                            desc="24/7 technical assistance for all premium members and enterprise partners."
                        />
                    </div>
                </div>
            </section>

            {/* --- SECTION 9: TESTIMONIALS (Premium Wall) --- */}
            <section className="py-24 bg-neutral-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <p className="text-brand-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Client Feedback</p>
                        <h2 className="text-4xl md:text-6xl font-serif text-neutral-900 tracking-tight">Voices of <span className="italic text-brand-500">Excellence.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Alexander Wright", role: "CEO, TechFlow", text: "The precision of their Laser Pro series is unmatched. It's not just a printer; it's a centerpiece of our office efficiency." },
                            { name: "Sarah Jenkins", role: "Studio Director", text: "Exceptional color accuracy. As a design studio, we require perfection, and Inktrix delivers every single time." },
                            { name: "Michael Chen", role: "Operations Lead", text: "The priority support is what sets them apart. Any issue is resolved within hours, keeping our workflow seamless." }
                        ].map((t, i) => (
                            <div key={i} className="bg-white p-10 rounded-[3rem] border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                                <Quote className="text-brand-500/20 group-hover:text-brand-500 transition-colors mb-8" size={40} />
                                <p className="text-neutral-600 text-lg leading-relaxed mb-8 font-light italic">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-brand-600 font-bold">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-neutral-900 font-bold text-sm">{t.name}</h4>
                                        <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 10: NEWSLETTER --- */}
            <section className="container mx-auto px-6 py-24">
                <div className="relative rounded-[5rem] bg-neutral-900 overflow-hidden px-8 py-24 text-center">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Mail size={40} className="text-brand-500 mx-auto mb-10" />
                        <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-10 tracking-tight">
                            Stay in the <span className="italic text-brand-400">Loop.</span>
                        </h2>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Professional email address"
                                className="flex-1 px-8 py-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-brand-500 transition-all font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="px-10 py-6 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-neutral-900 transition-all gold-shadow">
                                Join
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const activeWishlist = isInWishlist(product.id);
    const imageUrl = product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        navigate('/checkout');
    };

    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 relative"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-neutral-50/50 flex items-center justify-center overflow-hidden m-2 rounded-[2rem]">
                <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center p-10 transform group-hover:scale-110 transition-transform duration-700 ease-out">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                    />
                </Link>
                
                {/* Floating Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${activeWishlist ? 'bg-brand-500 text-white' : 'bg-white text-neutral-400 hover:text-brand-600'}`}
                    >
                        <Heart size={16} fill={activeWishlist ? 'currentColor' : 'none'} />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/product/${product.slug}`); }}
                        className="w-10 h-10 rounded-full bg-white text-neutral-400 hover:text-brand-600 flex items-center justify-center transition-all shadow-lg"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                {/* Badge */}
                {parseFloat(product.mrp) > parseFloat(product.price) && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-neutral-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                        Sale
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-6 pt-2 flex flex-col flex-1">
                <div className="mb-4">
                    <p className="text-neutral-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{product.category_name}</p>
                    <Link to={`/product/${product.slug}`}>
                        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-600 transition-colors line-clamp-1 tracking-tight">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-neutral-900 tracking-tighter">${product.price}</span>
                        {parseFloat(product.mrp) > parseFloat(product.price) && (
                            <span className="text-[10px] text-neutral-400 line-through font-bold">${product.mrp}</span>
                        )}
                    </div>
                    <div className="flex text-amber-400">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} className="text-neutral-200" />
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`h-12 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-2 border ${isAdded
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'bg-white border-neutral-200 text-neutral-900 hover:border-brand-500 hover:text-brand-600'
                        }`}
                    >
                        {isAdded ? <CheckCircle2 size={14} /> : <><ShoppingBag size={14} /> Cart</>}
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="h-12 bg-neutral-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-brand-600 transition-all gold-shadow flex items-center justify-center gap-2"
                    >
                        <Zap size={14} fill="currentColor" /> Buy Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const BenefitCard = ({ icon, title, desc }) => (
    <div className="flex flex-col group">
        <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-brand-600 mb-8 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-4">{title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default Home;
