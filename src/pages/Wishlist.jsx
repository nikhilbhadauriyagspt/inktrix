import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, Heart, ArrowLeft, MoveRight, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = (item) => {
        addToCart(item);
        removeFromWishlist(item.id);
        toast.success("Moved to cart");
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="bg-white min-h-screen">
                {/* Mini Hero for Navbar Visibility */}
                <div className="bg-slate-950 h-24 w-full"></div>
                
                <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-10">
                    <div className="w-40 h-40 bg-red-50 rounded-full flex items-center justify-center text-red-200 mb-8 border border-red-100/50 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-red-100/30 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                        <Heart size={56} className="relative z-10 text-red-500/50 group-hover:text-red-500 transition-colors duration-500 fill-current" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight text-center">Your wishlist is empty</h2>
                    <p className="text-slate-500 mb-12 text-center max-w-sm font-medium leading-relaxed">
                        Save items you love to revisit later.
                    </p>
                    <Link to="/products" className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/20 hover:-translate-y-1">
                        Start Exploring <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-32 font-sans">
            {/* Mini Hero for Navbar Visibility */}
            <div className="bg-slate-950 h-32 w-full absolute top-0 left-0 right-0 z-0"></div>

            <div className="container mx-auto px-4 lg:px-12 relative z-10 pt-36">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-brand-500 uppercase tracking-widest mb-3 hover:text-brand-400 transition-colors">
                            <ArrowLeft size={14} /> Back to Home
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">My Wishlist</h1>
                    </div>
                    <p className="text-slate-500 font-medium text-sm">
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-brand-100 transition-all duration-300 flex flex-col">
                            {/* Image Area */}
                            <div className="relative aspect-square bg-slate-50 p-8 flex items-center justify-center overflow-hidden">
                                <img 
                                    src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/products/${item.image_url}`) : 'https://via.placeholder.com/400'} 
                                    alt={item.name} 
                                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                                />
                                <button 
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white rounded-xl text-slate-300 shadow-sm border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all z-10"
                                    title="Remove from Wishlist"
                                >
                                    <Trash2 size={18} />
                                </button>
                                
                                {/* Quick Add Overlay */}
                                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4 flex-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">{item.category_name || 'Printer'}</span>
                                    <Link to={`/product/${item.slug}`}>
                                        <h3 className="font-bold text-slate-900 text-lg mb-2 hover:text-brand-600 transition-colors line-clamp-2 leading-tight">{item.name}</h3>
                                    </Link>
                                    <p className="text-xl font-black text-slate-900 tracking-tight">${item.price}</p>
                                </div>

                                <button 
                                    onClick={() => handleMoveToCart(item)}
                                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-600 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 group/btn"
                                >
                                    <ShoppingCart size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
