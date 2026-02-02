import React, { useState, useEffect } from 'react';
import api from '../api/api';
import SEO from '../components/SEO';
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight, Search, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [filteredFaqs, setFilteredFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
                const res = await api.get('/faqs', { params: { website_id: websiteId } });
                setFaqs(res.data);
                setFilteredFaqs(res.data);
            } catch (error) {
                console.error("Failed to fetch FAQs");
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredFaqs(faqs);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredFaqs(faqs.filter(faq => 
                faq.question.toLowerCase().includes(lower) || 
                faq.answer.toLowerCase().includes(lower)
            ));
        }
    }, [searchTerm, faqs]);

    return (
        <div className="bg-white min-h-screen pb-20 font-sans selection:bg-brand-500 selection:text-white">
            <SEO 
                pageName="faq" 
                fallbackTitle="Knowledge Base | Premium Support" 
                fallbackDesc="Find technical specifications and enterprise support answers." 
            />

            {/* --- HERO HEADER --- */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-neutral-950 overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
                            <Sparkles className="text-brand-500" size={14} />
                            <span className="text-brand-500 font-black uppercase tracking-[0.3em] text-[10px]">Information Hub</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-10">
                            Knowledge <br />
                            <span className="italic text-brand-400">Simplified.</span>
                        </h1>
                        
                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto group">
                            <input 
                                type="text" 
                                placeholder="Search our technical database..." 
                                className="w-full pl-16 pr-8 py-6 bg-white border border-transparent rounded-[2rem] text-neutral-900 focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-all text-lg shadow-2xl"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-brand-600 transition-colors" size={24} />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ LIST --- */}
            <section className="py-24 relative z-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="space-y-6">
                        {loading ? (
                            <div className="flex flex-col items-center py-20 gap-4">
                                <div className="w-12 h-12 border-2 border-neutral-100 border-t-brand-600 rounded-full animate-spin"></div>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Synchronizing Database</p>
                            </div>
                        ) : filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <FAQItem 
                                    key={faq.id} 
                                    faq={faq} 
                                    isOpen={activeIndex === index} 
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)} 
                                />
                            ))
                        ) : (
                            <div className="text-center py-32 bg-neutral-50 rounded-[4rem] border border-dashed border-neutral-200">
                                <HelpCircle size={64} className="text-neutral-200 mx-auto mb-6" />
                                <h3 className="text-2xl font-serif text-neutral-900 mb-2">No Records Found</h3>
                                <p className="text-neutral-500 mb-8">Refine your search or contact our technical concierge.</p>
                                <button onClick={() => setSearchTerm('')} className="text-brand-600 font-bold hover:underline">Clear Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="container mx-auto px-6 pb-24">
                <div className="relative rounded-[4rem] bg-neutral-900 overflow-hidden p-10 md:p-24 text-center border border-white/5">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]"></div>
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand-500 mx-auto mb-10 border border-white/10 shadow-xl">
                            <MessageSquare size={32} />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight">Need Custom <span className="italic text-brand-400">Insight?</span></h2>
                        <p className="text-neutral-400 mb-12 text-lg font-light">Our dedicated team of hardware specialists is available for advanced troubleshooting and enterprise consulting.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link to="/contact" className="px-12 py-6 bg-brand-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-neutral-900 transition-all gold-shadow group">
                                Contact Support <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/" className="px-12 py-6 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">
                                Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- HELPER COMPONENT ---

const FAQItem = ({ faq, isOpen, onClick }) => (
    <div className={`group bg-white rounded-[2.5rem] border transition-all duration-500 ${isOpen ? 'border-brand-500 shadow-2xl shadow-brand-900/5' : 'border-neutral-100 hover:border-brand-200 shadow-sm'}`}>
        <button 
            onClick={onClick}
            className="w-full flex items-center justify-between p-8 md:p-10 text-left"
        >
            <span className={`font-bold text-lg md:text-xl pr-8 transition-colors duration-500 ${isOpen ? 'text-brand-600' : 'text-neutral-900 group-hover:text-neutral-950'}`}>
                {faq.question}
            </span>
            <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-brand-600 text-white rotate-180 shadow-lg gold-shadow' : 'bg-neutral-50 text-neutral-400 group-hover:bg-brand-50 group-hover:text-brand-600 shadow-inner'}`}>
                <ChevronDown size={24} />
            </div>
        </button>
        
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                >
                    <div className="px-10 pb-10">
                        <div className="pt-8 border-t border-neutral-100 text-neutral-500 text-lg leading-relaxed font-light">
                            {faq.answer}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default FAQ;
