import { Link, useLocation } from 'react-router-dom';
import { Activity, ClipboardList, Search, CreditCard, Menu, X, Hospital, MapPin } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const tabs = [
        { name: 'Queue', path: '/queue', icon: <Activity size={18} /> },
        { name: 'Medicines', path: '/medicines', icon: <Search size={18} /> },
        { name: 'Hospitals', path: '/hospitals', icon: <MapPin size={18} /> },
        { name: 'Admin', path: '/admin', icon: <ClipboardList size={18} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 shrink-0">
                        <div className="bg-[#001B39] text-white p-2 rounded-xl">
                            <Hospital size={22} />
                        </div>
                        <span className="text-xl font-extrabold text-[#001B39] tracking-tight">
                            Seva<span className="text-blue-600">Setu</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.path}
                                to={tab.path}
                                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                    isActive(tab.path)
                                        ? 'bg-[#001B39] text-white shadow'
                                        : 'text-slate-500 hover:bg-[#E3F2FD] hover:text-[#001B39]'
                                }`}
                            >
                                {tab.icon}
                                <span>{tab.name}</span>
                            </Link>
                        ))}

                        {/* ABHA Card CTA */}
                        <Link
                            to="/abha"
                            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold text-sm border-2 transition-all duration-200 ml-1 ${
                                isActive('/abha')
                                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                            }`}
                        >
                            <CreditCard size={18} />
                            <span>ABHA</span>
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-2 shadow-lg">
                    {[...tabs, { name: 'ABHA Card', path: '/abha', icon: <CreditCard size={18} /> }].map((tab) => (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${
                                isActive(tab.path)
                                    ? 'bg-[#001B39] text-white'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {tab.icon}
                            {tab.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
