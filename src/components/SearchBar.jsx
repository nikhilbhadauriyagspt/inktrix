import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, Package, TrendingUp, ArrowRight, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import api from '../api/api';

const SearchBar = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Small delay to ensure render before focusing
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setSuggestions([]);
            setError(null);
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim().length > 1) {
                setLoading(true);
                setError(null);
                try {
                    const res = await api.get(`/products?search=${query}`);
                    if (Array.isArray(res.data)) {
                        setSuggestions(res.data);
                    } else if (res.data && Array.isArray(res.data.data)) {
                        setSuggestions(res.data.data);
                    } else {
                        setSuggestions([]);
                    }
                } catch (err) {
                    setError("Could not load results.");
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
                setError(null);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSearch = (e) => {
        e?.preventDefault();
        if (query.trim()) {
            onClose();
            navigate(`/products?search=${encodeURIComponent(query.trim())}`);
        }
    };

    // We use CSS classes for visibility to keep the DOM present for transitions if we wanted, 
    // but for simplicity with React conditional rendering, we'll just render when open.
    // To make it "slide in", we can use a simple CSS animation keyframe or just standard classes if the parent is always mounted.
    // Here we strictly follow: "Left se slide oke full screen".

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* 1. Backdrop (Fades In) */}
            <div 
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" 
                onClick={onClose}
            />

            {/* 2. Sliding Panel (Slides from Left) */}
            <div className="absolute top-0 bottom-0 left-0 w-full md:w-[550px] bg-white shadow-2xl flex flex-col animate-[slideInLeft_0.4s_cubic-bezier(0.16,1,0.3,1)]">
                
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100">
                    <h2 className="text-2xl font-serif font-bold text-neutral-900">Search</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Input Area */}
                <div className="p-8 pb-4">
                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-600 transition-colors" size={24} />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Type to search..."
                            className="w-full pl-10 pr-4 py-4 text-3xl font-bold text-neutral-900 placeholder:text-neutral-300 border-b-2 border-neutral-100 focus:border-brand-600 outline-none transition-colors bg-transparent"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {loading && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                <Loader2 className="animate-spin text-brand-600" size={20} />
                            </div>
                        )}
                    </form>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                    
                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 text-red-600 flex items-center gap-3">
                            <AlertCircle size={20} />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    {!loading && !error && query.length > 1 && suggestions.length === 0 && (
                        <div className="mt-12 text-center opacity-50">
                            <Package size={48} className="mx-auto mb-4 text-neutral-300" />
                            <p className="text-lg font-medium text-neutral-400">No products found</p>
                        </div>
                    )}

                    {!loading && !error && suggestions.length > 0 && (
                        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Top Results</p>
                            {suggestions.map((item) => (
                                <Link 
                                    key={item.id} 
                                    to={`/product/${item.slug}`}
                                    onClick={onClose}
                                    className="flex items-center gap-4 group p-2 -mx-2 rounded-xl hover:bg-neutral-50 transition-colors"
                                >
                                    <div className="w-16 h-16 bg-white border border-neutral-100 rounded-lg flex items-center justify-center p-1 shrink-0 group-hover:border-brand-200 transition-colors">
                                        <img 
                                            src={item.image_url?.startsWith('http') ? item.image_url : `/products/${item.image_url}`} 
                                            alt={item.name}
                                            className="max-h-full object-contain mix-blend-multiply"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/64?text=IMG'}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-neutral-900 group-hover:text-brand-600 transition-colors truncate text-lg">{item.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm font-medium text-neutral-500">{item.category_name}</span>
                                            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                                            <span className="text-sm font-bold text-brand-600">${item.price}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-neutral-300 group-hover:text-brand-600 -translate-x-2 group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100" />
                                </Link>
                            ))}
                             <button 
                                onClick={handleSearch}
                                className="w-full py-4 mt-4 text-center text-brand-600 font-bold text-sm hover:underline"
                            >
                                See all matching products
                            </button>
                        </div>
                    )}

                    {!loading && query.length < 2 && (
                        <div className="mt-4">
                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Trending Now</p>
                            <div className="flex flex-wrap gap-3">
                                {['Laser Printers', 'Ink Cartridges', 'Glossy Paper', 'Wireless', 'Canon', 'Epson'].map(tag => (
                                    <button 
                                        key={tag}
                                        onClick={() => setQuery(tag)}
                                        className="px-5 py-2.5 bg-neutral-50 text-neutral-600 font-medium rounded-full hover:bg-brand-600 hover:text-white transition-all text-sm"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Ad */}
                <div className="p-6 bg-brand-900 text-white mt-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-brand-200 text-xs font-bold uppercase tracking-wider mb-1">New Arrival</p>
                            <p className="font-bold text-lg">Pro Series X1</p>
                        </div>
                        <Link to="/products" onClick={onClose} className="bg-white text-brand-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-100 transition-colors">
                            Shop Now
                        </Link>
                    </div>
                </div>

            </div>

            {/* Tailwind Custom Animations (Inline for simplicity) */}
            <style>{`
                @keyframes slideInLeft {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default SearchBar;