import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { 
    Filter, Search, Star, Heart, ShoppingBag, X, 
    CheckCircle2, ChevronDown, SlidersHorizontal, ArrowUpRight, Zap, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // State
    const [priceRange, setPriceRange] = useState(100000);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categorySEO, setCategorySEO] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Filters State
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(location.search).get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(new URLSearchParams(location.search).get('category') || 'All');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        if (selectedCategory !== 'All') {
            const cat = categories.find(c => c.slug === selectedCategory);
            if (cat) setCategorySEO(cat);
        } else {
            setCategorySEO(null);
        }
    }, [selectedCategory, categories]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (selectedCategory !== 'All') params.append('category', selectedCategory);
                if (searchTerm) params.append('search', searchTerm);
                if (priceRange < 100000) params.append('maxPrice', priceRange);
                if (sortBy) params.append('sort', sortBy);
                
                const res = await api.get(`/products?${params.toString()}`);
                setProducts(res.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory, searchTerm, priceRange, sortBy]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const catRes = await api.get('/categories');
                setCategories(catRes.data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setSearchTerm(queryParams.get('search') || '');
        setSelectedCategory(queryParams.get('category') || 'All');
    }, [location.search]);

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setPriceRange(100000);
        setSortBy('newest');
        navigate('/products');
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-500 selection:text-white">
            {categorySEO ? (
                <Helmet>
                    <title>{categorySEO.meta_title || `${categorySEO.name} | Elite Collection`}</title>
                    <meta name="description" content={categorySEO.meta_description || `Shop our best collection of ${categorySEO.name}.`} />
                </Helmet>
            ) : (
                <SEO pageName="shop" fallbackTitle="Elite Collection | Professional Hardware" fallbackDesc="Browse our curated selection of high-performance enterprise technology." />
            )}

            {/* --- PREMIUM DARK HEADER --- */}
            <header className="bg-neutral-950 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 text-brand-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6">
                                <span className="w-8 h-px bg-brand-500"></span>
                                Digital Showroom
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight tracking-tighter mb-6">
                                {selectedCategory !== 'All' ? categories.find(c => c.slug === selectedCategory)?.name : 'The Full'} <br/>
                                <span className="italic text-brand-400">Archive.</span>
                            </h1>
                            <p className="text-neutral-400 text-lg font-light leading-relaxed border-l border-white/10 pl-8 max-w-lg">
                                Explore a curated ecosystem of enterprise hardware designed for uncompromising professionals.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                                <span className="text-white font-serif text-2xl tracking-tighter">{products.length}</span>
                                <span className="text-neutral-500 font-bold uppercase tracking-widest text-[9px]">Units Discovered</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* --- REFINED SIDEBAR --- */}
                    <aside className={`fixed inset-0 z-[100] lg:sticky lg:top-32 lg:z-0 lg:w-80 lg:h-auto bg-white lg:bg-transparent lg:inset-auto transition-all duration-500 lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                        <div className="h-full overflow-y-auto lg:overflow-visible bg-white lg:bg-transparent p-8 lg:p-0 shadow-2xl lg:shadow-none">
                            
                            {/* Mobile Close */}
                            <div className="flex lg:hidden justify-between items-center mb-12">
                                <h3 className="text-2xl font-serif tracking-tight">Refine Search</h3>
                                <button onClick={() => setIsSidebarOpen(false)} className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center"><X size={20}/></button>
                            </div>

                            {/* Search */}
                            <div className="mb-12">
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        placeholder="Identify product..." 
                                        className="w-full bg-neutral-50 border border-neutral-100 px-6 py-4 rounded-2xl text-sm font-medium focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-brand-600 transition-colors" size={18} />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-12">
                                <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-6 flex items-center justify-between">
                                    Ecosystems <ChevronDown size={14}/>
                                </h4>
                                <div className="space-y-1">
                                    <CategoryButton 
                                        label="All Collections" 
                                        isActive={selectedCategory === 'All'} 
                                        onClick={() => setSelectedCategory('All')} 
                                    />
                                    {categories.map((cat) => (
                                        <CategoryButton 
                                            key={cat.id}
                                            label={cat.name}
                                            isActive={selectedCategory === cat.slug}
                                            onClick={() => setSelectedCategory(cat.slug)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Price Slider */}
                            <div className="mb-12 p-8 rounded-[2.5rem] bg-neutral-50 border border-neutral-100">
                                <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-[0.3em] mb-6">Budget Cap</h4>
                                <input 
                                    type="range" min="0" max="100000" step="1000"
                                    value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-600 mb-4"
                                />
                                <div className="flex justify-between items-center font-serif">
                                    <span className="text-neutral-400 text-sm">$0</span>
                                    <span className="text-brand-600 text-lg font-bold">${priceRange}</span>
                                </div>
                            </div>

                            <button onClick={clearAllFilters} className="w-full py-5 border border-dashed border-neutral-200 text-neutral-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 transition-all duration-500">
                                Reset Parameters
                            </button>
                        </div>
                    </aside>

                    {/* --- MAIN GRID --- */}
                    <main className="flex-1 w-full">
                        
                        {/* Mobile Filter Toggle */}
                        <div className="flex lg:hidden justify-between items-center mb-8 bg-neutral-900 p-4 rounded-2xl">
                            <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest"
                            >
                                <SlidersHorizontal size={18} className="text-brand-500"/> Filter Results
                            </button>
                        </div>

                        {/* Sorting */}
                        <div className="flex justify-between items-center mb-12">
                            <div className="hidden md:flex gap-2">
                               {['newest', 'price-low', 'price-high'].map(s => (
                                   <button 
                                        key={s}
                                        onClick={() => setSortBy(s)}
                                        className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === s ? 'bg-neutral-900 text-white shadow-lg' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}
                                   >
                                       {s.replace('-', ' ')}
                                   </button>
                               ))}
                            </div>
                            <div className="h-px flex-1 bg-neutral-100 mx-8 hidden lg:block"></div>
                            <p className="text-neutral-400 text-xs font-medium italic">Displaying {products.length} elite results</p>
                        </div>

                        {/* Product Grid */}
                        <AnimatePresence mode='wait'>
                            {loading ? (
                                <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                                >
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="aspect-[4/5] bg-neutral-50 rounded-[3rem] animate-pulse"></div>
                                    ))}
                                </motion.div>
                            ) : products.length > 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12"
                                >
                                    {products.map((product) => (
                                        <ShopProductCard key={product.id} product={product} />
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="py-32 text-center">
                                    <ShoppingBag size={64} className="text-neutral-100 mx-auto mb-6" />
                                    <h3 className="text-3xl font-serif text-neutral-900 mb-2">No Matches Found</h3>
                                    <p className="text-neutral-500 mb-8 max-w-sm mx-auto font-light">The combination of parameters provided did not yield any results in our current archive.</p>
                                    <button onClick={clearAllFilters} className="text-brand-600 font-bold hover:underline underline-offset-8">Expand Search Parameters</button>
                                </div>
                            )}
                        </AnimatePresence>

                    </main>
                </div>
            </div>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const CategoryButton = ({ label, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full group flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 ${isActive ? 'bg-neutral-950 text-white shadow-xl gold-shadow' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
    >
        <span className={`text-sm font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
        <ChevronRight size={14} className={`transition-transform duration-500 ${isActive ? 'translate-x-0 opacity-100 text-brand-500' : '-translate-x-2 opacity-0'}`} />
    </button>
);

const ShopProductCard = ({ product }) => {
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

    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="group flex flex-col relative"
        >
            <div className="relative aspect-[4/5] bg-neutral-50 rounded-[3rem] overflow-hidden m-1 p-10 flex items-center justify-center transition-all duration-700 group-hover:bg-neutral-100 group-hover:shadow-2xl group-hover:shadow-neutral-200/50">
                {parseFloat(product.mrp) > parseFloat(product.price) && (
                    <span className="absolute top-8 left-8 px-3 py-1 bg-neutral-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg z-10">
                        Archive Deal
                    </span>
                )}
                
                <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center relative z-0">
                    <img 
                        src={imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[2000ms] group-hover:scale-110" 
                    />
                </Link>

                <div className="absolute top-8 right-8 flex flex-col gap-3 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10">
                    <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-xl ${
                            activeWishlist ? 'bg-brand-500 text-white' : 'bg-white text-neutral-400 hover:text-brand-600'
                        }`}
                    >
                        <Heart size={18} className={activeWishlist ? 'fill-current' : ''} />
                    </button>
                    <Link to={`/product/${product.slug}`} className="w-11 h-11 rounded-full bg-white text-neutral-400 hover:text-brand-600 flex items-center justify-center transition-all shadow-xl">
                        <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div className="absolute inset-x-8 bottom-8 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                    <button 
                        onClick={handleAddToCart}
                        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all ${
                            isAdded ? 'bg-green-500 text-white shadow-green-200' : 'bg-brand-600 text-white hover:bg-brand-500 gold-shadow'
                        }`}
                    >
                        {isAdded ? <CheckCircle2 size={16} /> : <><ShoppingBag size={16} /> Acquire Unit</>}
                    </button>
                </div>
            </div>

            <div className="mt-6 px-4 flex flex-col items-center text-center">
                <p className="text-[9px] font-black text-brand-600 uppercase tracking-[0.3em] mb-2">{product.category_name}</p>
                <Link to={`/product/${product.slug}`}>
                    <h3 className="text-xl font-serif text-neutral-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-3">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-neutral-900 tracking-tighter">${product.price}</span>
                    {parseFloat(product.mrp) > parseFloat(product.price) && <span className="text-xs text-neutral-300 line-through font-bold">${product.mrp}</span>}
                </div>
            </div>
        </motion.div>
    );
};

export default Shop;
