import { Link } from 'react-router-dom';
import { Hospital, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#001B39] text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-white/10 p-2 rounded-xl">
                                <Hospital size={22} className="text-white" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight">
                                Seva<span className="text-blue-400">Setu</span>
                            </span>
                        </div>
                        <p className="text-blue-200/60 text-sm leading-relaxed mb-6">
                            Bridging the gap between patients and healthcare services across India.
                        </p>
                        <div className="space-y-2">
                            <a href="mailto:contact@sevasetu.in" className="flex items-center gap-2 text-sm text-blue-200/60 hover:text-white transition">
                                <Mail size={14} /> contact@sevasetu.in
                            </a>
                            <a href="tel:+911800001234" className="flex items-center gap-2 text-sm text-blue-200/60 hover:text-white transition">
                                <Phone size={14} /> 1800-001-1234 (Toll Free)
                            </a>
                            <span className="flex items-center gap-2 text-sm text-blue-200/60">
                                <MapPin size={14} /> New Delhi, India
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'Join Queue', path: '/queue' },
                                { name: 'Find Medicine', path: '/medicines' },
                                { name: 'Admin Portal', path: '/admin' },
                                { name: 'ABHA Card', path: '/abha' },
                            ].map((l) => (
                                <li key={l.path}>
                                    <Link to={l.path} className="text-sm text-blue-200/60 hover:text-white transition">
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-5">Legal</h4>
                        <ul className="space-y-3">
                            {[
                                'Privacy Policy',
                                'Terms & Conditions',
                                'Refund Policy',
                                'Data Protection',
                                'Accessibility',
                            ].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-blue-200/60 hover:text-white transition">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-5">Contact Us</h4>
                        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will get back to you.'); }}>
                            <input
                                type="email"
                                placeholder="Your email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-blue-200/40 focus:outline-none focus:border-blue-400 transition"
                            />
                            <textarea
                                placeholder="Your message"
                                rows={3}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-blue-200/40 focus:outline-none focus:border-blue-400 transition resize-none"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm transition shadow"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-blue-200/40">
                        © {new Date().getFullYear()} SevaSetu. All rights reserved. A Digital India Initiative.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-xs text-blue-200/40 hover:text-white transition">Privacy Policy</a>
                        <span className="text-blue-200/20">|</span>
                        <a href="#" className="text-xs text-blue-200/40 hover:text-white transition">Terms & Conditions</a>
                        <span className="text-blue-200/20">|</span>
                        <a href="#" className="text-xs text-blue-200/40 hover:text-white transition">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
