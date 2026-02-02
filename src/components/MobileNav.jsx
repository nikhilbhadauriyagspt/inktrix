import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MobileSearchOverlay from './MobileSearchOverlay';

const MobileNav = () => {
    const location = useLocation();
    const { cartItems } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div className="md:hidden fixed bottom-4 left-4 right-4 bg-neutral-900/90 backdrop-blur-md border border-white/10 px-6 py-3 z-[60] flex justify-between items-center shadow-2xl rounded-2xl">
                <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-brand-400' : 'text-white/40'}`}>
                    <Home size={20} className={isActive('/') ? 'fill-current' : ''} />
                </Link>
                
                <Link to="/products" className={`flex flex-col items-center gap-1 ${isActive('/products') ? 'text-brand-400' : 'text-white/40'}`}>
                    <ShoppingBag size={20} className={isActive('/products') ? 'fill-current' : ''} />
                </Link>

                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="flex flex-col items-center gap-1 -mt-8 bg-gradient-gold p-3 rounded-full text-white shadow-lg shadow-brand-500/30 border-4 border-neutral-900"
                >
                    <Search size={20} strokeWidth={3} />
                </button>

                <Link to="/cart" className={`flex flex-col items-center gap-1 relative ${isActive('/cart') ? 'text-brand-400' : 'text-white/40'}`}>
                    <div className="relative">
                        <ShoppingBag size={20} className={isActive('/cart') ? 'fill-current' : ''} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </div>
                </Link>

                <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') || isActive('/login') ? 'text-brand-400' : 'text-white/40'}`}>
                    <User size={20} className={isActive('/profile') ? 'fill-current' : ''} />
                </Link>
            </div>

            <MobileSearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default MobileNav;
