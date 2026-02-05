import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { ChevronRight, Truck, Mail, Phone, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
    const lastUpdated = "February 05, 2026";
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [
        { id: 'options', label: 'Shipping Options' },
        { id: 'international', label: 'International Shipping' },
        { id: 'delays', label: 'Order Delays' },
        { id: 'contact', label: 'Contact Us' },
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-500 selection:text-white">
            <SEO
                pageName="shipping-policy"
                fallbackTitle="Shipping & Delivery Policy - InkTrix"
                fallbackDesc="Read the InkTrix Shipping & Delivery Policy to understand our delivery options and terms."
            />

            {/* --- SIMPLE HEADER --- */}
            <header className="bg-slate-50 border-b border-slate-200 pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
                        <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span>Shipping & Delivery Policy</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Shipping & Delivery Policy</h1>
                    <p className="text-slate-500 text-sm font-medium">Last updated: {lastUpdated}</p>
                </div>
            </header>

            {/* --- CONTENT LAYOUT --- */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- SIDE NAVIGATION --- */}
                    <aside className="lg:w-1/4">
                        <div className="sticky top-32 bg-white border border-slate-200 rounded-xl p-6 hidden lg:block">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Truck size={16} className="text-brand-600" /> Navigation
                            </h3>
                            <nav className="space-y-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`block text-left w-full text-xs py-2 px-3 rounded-lg transition-all ${activeSection === item.id
                                                ? 'bg-brand-50 text-brand-700 font-bold'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* --- MAIN CONTENT --- */}
                    <main className="lg:w-3/4">
                        <div className="prose prose-slate max-w-none 
                            prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                            prose-p:text-slate-600 prose-p:leading-relaxed
                            prose-strong:text-slate-900 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
                            [&>section]:mb-16"
                        >
                            <p className="text-lg text-slate-700 mb-10">
                                This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms: <Link to="/terms-of-service">https://inktrix.shop/terms-of-service</Link>.
                            </p>

                            <p className="text-slate-600 mb-10">
                                Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.
                            </p>

                            <section id="options">
                                <h2 className="text-2xl pt-4">WHAT ARE MY SHIPPING DELIVERY OPTIONS?</h2>
                                <p>We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.</p>

                                <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl my-8">
                                    <h3 className="mt-0 text-slate-900 font-bold flex items-center gap-2">
                                        <Info size={20} className="text-brand-600" /> Free Shipping
                                    </h3>
                                    <p className="mb-0 font-medium text-slate-700">We offer free Standard shipping on all orders.</p>
                                </div>
                            </section>

                            <section id="international">
                                <h2 className="text-2xl pt-4">DO YOU DELIVER INTERNATIONALLY?</h2>
                                <p>We do not offer international shipping.</p>
                            </section>

                            <section id="delays">
                                <h2 className="text-2xl pt-4">WHAT HAPPENS IF MY ORDER IS DELAYED?</h2>
                                <p>If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.</p>
                            </section>

                            <section id="contact">
                                <h2 className="text-2xl pt-4">HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h2>
                                <p>If you have any further questions or comments, you may contact us by:</p>
                                <div className="bg-slate-900 text-slate-100 p-8 rounded-xl flex flex-col md:flex-row gap-8 justify-between mt-6">
                                    <div>
                                        <h4 className="text-white font-bold mb-4">Contact Details</h4>
                                        <div className="space-y-3 text-sm">
                                            <p className="flex items-center gap-2"><Mail size={14} className="text-brand-400" /> Inktrixshop@outlook.com</p>
                                            <p className="flex items-center gap-2"><Phone size={14} className="text-brand-400" /> +1-402-448-1627</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-4">Mailing Address</h4>
                                        <address className="not-italic text-sm text-slate-300">
                                            InkTrix<br />
                                            203 Texas Ave<br />
                                            Round Rock, TX 78664<br />
                                            United States
                                        </address>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
