import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { ChevronRight, RotateCcw, Mail, Phone, Package, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReturnPolicy = () => {
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
        { id: 'returns', label: 'Returns' },
        { id: 'process', label: 'Return Process' },
        { id: 'refunds', label: 'Refunds' },
        { id: 'exceptions', label: 'Exceptions' },
        { id: 'questions', label: 'Questions' },
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-500 selection:text-white">
            <SEO
                pageName="return-policy"
                fallbackTitle="Return Policy - InkTrix"
                fallbackDesc="Read the InkTrix Return Policy to understand our refund and return terms."
            />

            {/* --- SIMPLE HEADER --- */}
            <header className="bg-slate-50 border-b border-slate-200 pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
                        <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span>Return Policy</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Return Policy</h1>
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
                                <RotateCcw size={16} className="text-brand-600" /> Navigation
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
                                Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a <strong>refund only</strong>. Please see below for more information on our return policy.
                            </p>

                            <section id="returns">
                                <h2 className="text-2xl pt-4">RETURNS</h2>
                                <p>All returns must be postmarked within thirty (30) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.</p>
                            </section>

                            <section id="process">
                                <h2 className="text-2xl pt-4">RETURN PROCESS</h2>
                                <p>To return an item, please email customer service at <a href="mailto:Inktrixshop@outlook.com">Inktrixshop@outlook.com</a> to obtain an Return Merchandise Authorization (RMA) number. After receiving an RMA number, place the item securely in its original packaging and include your proof of purchase, then mail your return to the following address:</p>

                                <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl my-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-6 opacity-5"><Package size={120} /></div>
                                    <h4 className="mt-0 text-slate-900 font-bold mb-4">Mailing Address:</h4>
                                    <address className="not-italic text-slate-700 space-y-1">
                                        <p>InkTrix</p>
                                        <p>Attn: Returns</p>
                                        <p>RMA #</p>
                                        <p>203 Texas Ave</p>
                                        <p>Round Rock, TX 78664</p>
                                        <p>United States</p>
                                    </address>
                                </div>
                                <p>Return shipping charges will be paid or reimbursed by us.</p>
                            </section>

                            <section id="refunds">
                                <h2 className="text-2xl pt-4">REFUNDS</h2>
                                <p>After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least seven (7) days from the receipt of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.</p>
                            </section>

                            <section id="exceptions">
                                <h2 className="text-2xl pt-4">EXCEPTIONS</h2>
                                <p>For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.</p>
                            </section>

                            <section id="questions">
                                <h2 className="text-2xl pt-4">QUESTIONS</h2>
                                <p>If you have any questions concerning our return policy, please contact us at:</p>
                                <div className="bg-slate-900 text-slate-100 p-8 rounded-xl flex flex-col md:flex-row gap-8 justify-between mt-6">
                                    <div>
                                        <h4 className="text-white font-bold mb-4">Contact Details</h4>
                                        <div className="space-y-3 text-sm">
                                            <p className="flex items-center gap-2"><Mail size={14} className="text-brand-400" /> Inktrixshop@outlook.com</p>
                                            <p className="flex items-center gap-2"><Phone size={14} className="text-brand-400" /> +1-402-448-1627</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-4">Customer Support</h4>
                                        <p className="text-sm text-slate-300 max-w-xs">Our team is available to assist you with any return inquiries or technical questions regarding your purchase.</p>
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

export default ReturnPolicy;
