import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, ShoppingCart, MoveRight, ChevronRight } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 49;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="bg-white min-h-screen">
                {/* Mini Hero for Navbar Visibility */}
                <div className="bg-slate-950 h-24 w-full"></div>
                
                <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-10">
                    <div className="w-40 h-40 bg-brand-50 rounded-full flex items-center justify-center text-brand-200 mb-8 border border-brand-100/50 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-100/30 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                        <ShoppingBag size={56} strokeWidth={1.5} className="relative z-10 text-brand-600/50 group-hover:text-brand-600 transition-colors duration-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight text-center">Your cart is empty</h2>
                    <p className="text-slate-500 mb-12 text-center max-w-sm font-medium leading-relaxed">
                        Looks like you haven't added any printers or accessories yet.
                    </p>
                    <Link to="/products" className="group flex items-center gap-3 bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 hover:-translate-y-1">
                        Start Shopping <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Mini Hero for Navbar Visibility */}
            <div className="bg-slate-950 h-32 w-full absolute top-0 left-0 right-0 z-0"></div>

            <div className="container mx-auto px-4 lg:px-12 relative z-10 pt-36">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-widest mb-3">
                            <span className="w-8 h-[2px] bg-brand-600"></span>
                            Your Bag
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Shopping Cart</h1>
                    </div>
                    <p className="text-slate-500 font-medium text-sm">
                        You have {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    
                    {/* Items List */}
                    <div className="flex-1 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="group relative flex flex-col sm:flex-row gap-6 p-5 sm:p-6 bg-white border border-slate-100 rounded-3xl transition-all hover:border-brand-200 hover:shadow-lg hover:shadow-slate-200/40">
                                {/* Image */}
                                <div className="w-full sm:w-32 h-32 bg-slate-50 rounded-2xl flex items-center justify-center p-4 flex-shrink-0">
                                    <img 
                                        src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/products/${item.image_url}`) : 'https://via.placeholder.com/100'} 
                                        alt={item.name} 
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" 
                                    />
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div className="pr-8 sm:pr-0">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">{item.category_name}</span>
                                        <Link to={`/product/${item.slug}`}>
                                            <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-2 hover:text-brand-600 transition-colors line-clamp-2">{item.name}</h3>
                                        </Link>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                                        <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 p-1">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="font-bold text-slate-900 text-xl tracking-tight">${(item.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-xs font-medium text-slate-400">${item.price} each</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Remove item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}

                        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors py-4">
                            <ArrowLeft size={18} /> Continue Shopping
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="bg-slate-50/80 backdrop-blur-sm p-6 sm:p-8 rounded-[2rem] border border-slate-100 lg:sticky lg:top-28">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight flex items-center gap-2">
                                <ShoppingBag size={20} className="text-brand-600" /> Order Summary
                            </h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Subtotal</span>
                                    <span className="text-slate-900 font-bold tracking-tight">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Shipping Estimate</span>
                                    <span className="text-green-600 font-bold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                {shipping > 0 && (
                                    <div className="text-[10px] text-slate-400 text-right">Free shipping on orders over $500</div>
                                )}
                                <div className="h-px bg-slate-200 my-4"></div>
                                <div className="flex justify-between items-center">
                                    <span className="font-black text-slate-900 text-lg">Total</span>
                                    <span className="text-2xl font-black text-brand-600 tracking-tighter">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-brand-600 transition-all shadow-lg shadow-slate-900/10 hover:shadow-brand-600/20 mb-6 flex items-center justify-center gap-3 active:scale-[0.98] group"
                            >
                                Checkout Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100/50">
                                <ShieldCheck size={20} className="text-brand-600 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                        Secure Checkout
                                    </p>
                                    <p className="text-[10px] font-medium text-slate-400 leading-relaxed">
                                        Your transaction is protected by 128-bit SSL encryption.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Bottom Bar (Sticky) */}
            <div className="md:hidden fixed bottom-[80px] left-4 right-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 z-40 flex items-center justify-between rounded-2xl shadow-2xl">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total</p>
                    <p className="text-xl font-black text-white tracking-tight">${total.toFixed(2)}</p>
                </div>
                <button 
                    onClick={() => navigate('/checkout')}
                    className="bg-brand-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-brand-500/20"
                >
                    Checkout <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Cart;