import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const TopBar = () => {
    const [branding, setBranding] = useState({
        contact_email: 'support@inktrix.shop',
        phone: '+1 (555) 123-4567'
    });

    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        api.get(`/websites/${websiteId}`).then(res => setBranding(res.data)).catch(() => {});
    }, []);

    return (
        <div className="hidden md:block bg-neutral-900 text-brand-100 py-2 relative z-50 border-b border-white/5">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center text-[11px] font-medium tracking-widest uppercase">
                    
                    {/* Socials / Left */}
                    <div className="flex items-center gap-4 text-brand-300">
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={12}/></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={12}/></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={12}/></a>
                    </div>

                    {/* Center Promo */}
                    <div className="flex-1 text-center">
                        <span className="text-white/60">Exclusive Offer: </span>
                        <span className="text-gradient-gold font-bold ml-1">Get 20% Off Premium Printers</span>
                    </div>

                    {/* Right Contact */}
                    <div className="flex items-center gap-6">
                        <a href={`tel:${branding.phone}`} className="hover:text-white transition-colors flex items-center gap-2">
                             <Phone size={10} className="text-brand-400" />
                             {branding.phone}
                        </a>
                        <a href={`mailto:${branding.contact_email}`} className="hover:text-white transition-colors flex items-center gap-2">
                            <Mail size={10} className="text-brand-400" />
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
