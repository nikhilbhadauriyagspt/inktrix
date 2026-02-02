import React, { useState, useEffect } from 'react';
import api from '../api/api';
import SEO from '../components/SEO';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [branding, setBranding] = useState({
        name: 'Inktrix',
        contact_email: '',
        contact_address: '',
        phone: '',
        logo_url: ''
    });

    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        const fetchBranding = async () => {
            try {
                const res = await api.get(`/websites/${websiteId}`);
                if (res.data) {
                    setBranding(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch contact branding");
            }
        };
        fetchBranding();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website_id: import.meta.env.VITE_WEBSITE_ID || 1
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/contact', formData);
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '', website_id: import.meta.env.VITE_WEBSITE_ID || 1 });
        } catch (error) {
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-500 selection:text-white pb-20">
            <SEO
                pageName="contact"
                fallbackTitle={`Contact Us | ${branding.name}`}
                fallbackDesc="Get in touch with our team for professional support and inquiries."
            />

            {/* --- SIMPLE HEADER --- */}
            <div className="bg-neutral-950 border-b border-white/5 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold uppercase tracking-widest mb-6">
                        <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-neutral-300">Contact Us</span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                        {branding.logo_url && (
                            <img 
                                src={branding.logo_url} 
                                alt={branding.name} 
                                className="h-16 w-auto object-contain bg-white/5 p-3 rounded-2xl backdrop-blur-md"
                            />
                        )}
                        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight tracking-tight">
                            Let's Start a <span className="italic text-brand-400">Conversation.</span>
                        </h1>
                    </div>
                    
                    <p className="text-lg md:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed border-l border-brand-500/20 pl-8">
                        Have questions about our hardware or need technical support? Our expert team is here to provide the solutions you need.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* LEFT: CONTACT DETAILS */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="space-y-8">
                            {branding.contact_email && (
                                <ContactInfoItem 
                                    icon={<Mail size={24} />} 
                                    title="Digital Support" 
                                    value={branding.contact_email} 
                                />
                            )}
                            {branding.phone && (
                                <ContactInfoItem 
                                    icon={<Phone size={24} />} 
                                    title="Call Us" 
                                    value={branding.phone} 
                                />
                            )}
                            {branding.contact_address && (
                                <ContactInfoItem 
                                    icon={<MapPin size={24} />} 
                                    title="Headquarters" 
                                    value={branding.contact_address} 
                                />
                            )}
                        </div>

                        {(branding.phone || branding.contact_email) && (
                            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100">
                                <h4 className="text-neutral-900 font-bold mb-4 flex items-center gap-2">
                                    <Clock size={18} className="text-brand-600" /> Availability
                                </h4>
                                <div className="space-y-3 text-sm text-neutral-500">
                                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                                        <span>Monday - Friday</span>
                                        <span className="text-neutral-900 font-medium">09:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday - Sunday</span>
                                        <span className="text-brand-600 font-bold uppercase tracking-widest text-[10px]">On Appointment</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: CONTACT FORM */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 shadow-xl shadow-neutral-200/20">
                            {success ? (
                                <div className="py-16 text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h2 className="text-3xl font-serif text-neutral-900 mb-2">Message Sent!</h2>
                                    <p className="text-neutral-500 mb-8">We've received your query and will respond shortly.</p>
                                    <button onClick={() => setSuccess(false)} className="text-brand-600 font-bold hover:underline underline-offset-4">Send another message</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input 
                                                type="text" required 
                                                className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" 
                                                placeholder="e.g. Alex Vane"
                                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <input 
                                                type="email" required 
                                                className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" 
                                                placeholder="e.g. alex@example.com"
                                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Subject</label>
                                        <input 
                                            type="text" required 
                                            className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" 
                                            placeholder="How can we help?"
                                            value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Message</label>
                                        <textarea 
                                            rows="5" required 
                                            className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all resize-none" 
                                            placeholder="Tell us more about your inquiry..."
                                            value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                                        ></textarea>
                                    </div>
                                    <button 
                                        disabled={loading}
                                        className="w-full md:w-auto px-12 py-5 bg-brand-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-900 transition-all gold-shadow flex items-center justify-center gap-3 disabled:bg-neutral-200 shadow-xl"
                                    >
                                        {loading ? 'Sending...' : 'Send Message'} 
                                        {!loading && <Send size={16} />}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- HELPER COMPONENT ---

const ContactInfoItem = ({ icon, title, value }) => {
    if (!value) return null;
    return (
        <div className="flex gap-6 group animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shrink-0 shadow-sm">
                {icon}
            </div>
            <div>
                <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{title}</h4>
                <p className="text-lg font-bold text-neutral-900 leading-tight">{value}</p>
            </div>
        </div>
    );
};

export default Contact;