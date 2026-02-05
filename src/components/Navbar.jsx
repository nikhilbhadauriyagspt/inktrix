import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import api from '../api/api';
import SearchBar from './SearchBar';
import {
    ShoppingCart,
    User,
    Heart,
    Menu,
    Search,
    LogOut,
    Package,
    LayoutDashboard,
    Zap,
    ChevronDown,
    X
} from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [branding, setBranding] = useState({ name: 'Inktrix' });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        api.get(`/websites/${websiteId}`).then(res => setBranding(res.data)).catch(() => { });
    }, []);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const isPolicyPage = ['/privacy-policy', '/terms-of-service', '/shipping-policy', '/refund-policy'].includes(location.pathname);
    const showSolidNav = isScrolled || isPolicyPage;

    return (
        <>
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <div className={`fixed inset-0 z-[100] ${isMenuOpen ? 'visible' : 'invisible'}`}>
                <div
                    className={`absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                />
                <div className={`absolute top-0 left-0 w-[280px] h-full bg-neutral-900 border-r border-white/10 shadow-2xl transform transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <span className="text-xl font-bold text-white tracking-wide">{branding.name}</span>
                        <button onClick={() => setIsMenuOpen(false)} className="text-white/50 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="p-4 space-y-2">
                        <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                        <MobileNavLink to="/products" onClick={() => setIsMenuOpen(false)}>Shop</MobileNavLink>
                        <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
                        <MobileNavLink to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</MobileNavLink>
                        <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
                    </nav>
                </div>
            </div>

            <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-4 md:px-6 py-4 ${showSolidNav ? 'top-0 py-2' : 'top-0'
                }`}>
                <div className={`container mx-auto transition-all duration-500 rounded-2xl ${showSolidNav
                    ? 'bg-neutral-900/90 backdrop-blur-xl shadow-2xl border border-white/10 py-2 px-6'
                    : 'bg-transparent py-2 px-4'
                    }`}>
                    <div className="flex items-center justify-between">

                                                <Link to="/" className="flex items-center gap-2 group">

                                                    {branding.logo_url ? (

                                                        <img 

                                                            src={branding.logo_url} 

                                                            alt={branding.name} 

                                                            className="h-10 w-auto object-contain transition-all duration-500"

                                                        />

                                                    ) : (

                                                        <>

                                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ${

                                                                showSolidNav ? 'bg-gradient-gold text-white gold-shadow' : 'bg-brand-600 text-white shadow-lg gold-shadow'

                                                            }`}>

                                                                <Zap size={18} fill="currentColor" />

                                                            </div>

                                                            <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${

                                                                showSolidNav ? 'text-white' : 'text-white drop-shadow-md'

                                                            }`}>

                                                                {branding.name}

                                                            </span>

                                                        </>

                                                    )}

                                                </Link>

                        <nav className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
                            <NavLink to="/" isActive={location.pathname === '/'}>Home</NavLink>
                            <NavLink to="/products" isActive={location.pathname === '/products'}>Collection</NavLink>
                            <NavLink to="/about" isActive={location.pathname === '/about'}>About</NavLink>
                            <NavLink to="/faq" isActive={location.pathname === '/faq'}>FAQ</NavLink>
                            <NavLink to="/contact" isActive={location.pathname === '/contact'}>Contact</NavLink>
                        </nav>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className={`hidden sm:flex items-center gap-2 px-4 py-3 w-56 rounded-full border transition-all duration-300 group ${showSolidNav
                                    ? 'border-white/10 hover:border-brand-500/50 bg-white/5 hover:bg-white/10'
                                    : 'border-white/20 hover:border-white/40 bg-black/20 hover:bg-black/30'
                                    }`}
                            >
                                <Search size={16} className="text-brand-400 group-hover:text-brand-300 transition-colors" />
                                <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors">Search...</span>
                            </button>

                            <button onClick={() => setIsSearchOpen(true)} className="sm:hidden p-2 text-white hover:text-brand-400">
                                <Search size={20} />
                            </button>

                            <Link to="/wishlist" className="hidden sm:block p-2 relative group text-white/80 hover:text-brand-400 transition-colors">
                                <Heart size={20} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full px-1 ring-2 ring-neutral-900">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>

                            <Link to="/cart" className="p-2 relative group text-white/80 hover:text-brand-400 transition-colors">
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full px-1 ring-2 ring-neutral-900">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <div className="relative pl-1">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all overflow-hidden ${showSolidNav ? 'border-white/10 hover:border-brand-500' : 'border-white/30 hover:border-white'
                                        }`}
                                >
                                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white">
                                        <User size={14} />
                                    </div>
                                </button>

                                {isProfileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                        <div className="absolute top-full right-0 mt-3 w-56 bg-neutral-900 border border-white/10 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                                            {user ? (
                                                <>
                                                    <div className="px-4 py-2 border-b border-white/5">
                                                        <p className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">Signed In</p>
                                                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                                    </div>
                                                    <DropdownLink to="/orders" icon={<Package size={14} />} text="Orders" />
                                                    <DropdownLink to="/wishlist" icon={<Heart size={14} />} text="Wishlist" />
                                                    {user.role === 'admin' && <DropdownLink to="/admin" icon={<LayoutDashboard size={14} />} text="Admin" highlight />}
                                                    <div className="h-px bg-white/5 my-1" />
                                                    <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-2 text-xs text-red-400 hover:bg-white/5">
                                                        <LogOut size={14} /> Sign Out
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="p-2 space-y-1">
                                                    <Link to="/login" className="block text-center py-2 bg-brand-600 text-white text-xs font-bold rounded-lg hover:bg-brand-500">Log In</Link>
                                                    <Link to="/register" className="block text-center py-2 bg-white/5 text-white text-xs font-bold rounded-lg hover:bg-white/10">Register</Link>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-white hover:text-brand-400">
                                <Menu size={24} />
                            </button>

                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

const NavLink = ({ to, children, isActive }) => (
    <Link
        to={to}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
            ? 'bg-brand-600 text-white shadow-sm gold-shadow'
            : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
    >
        {children}
    </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
    >
        {children}
    </Link>
);

const DropdownLink = ({ to, icon, text, highlight }) => (
    <Link to={to} className={`flex items-center gap-3 px-4 py-2 text-xs font-medium transition-colors ${highlight ? 'text-brand-400' : 'text-white/70 hover:text-white hover:bg-white/5'
        }`}>
        {icon} {text}
    </Link>
);

export default Navbar;