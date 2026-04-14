import { Link } from 'react-router-dom';
import { Activity, Search, MapPin, CreditCard, ChevronRight, Heart, Shield, Stethoscope, ArrowRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

/* ─── HERO SECTION ─────────────────────────────────────────────────────────── */
const Hero = () => (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#001B39] via-[#002952] to-[#003d7a] text-white">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-[150px]"></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold">
                    <Heart size={14} className="text-red-400" />
                    <span>Trusted by 10,000+ patients across India</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                    Your Health,<br />
                    <span className="bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">Our Priority.</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl leading-relaxed">
                    Skip the wait. Find medicines. Locate hospitals nearby. SevaSetu brings healthcare to your fingertips.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link to="/queue" className="bg-white text-[#001B39] font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-lg">
                        Join Queue <ArrowRight size={20} />
                    </Link>
                    <Link to="/medicines" className="border-2 border-white/30 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-2xl transition-all flex items-center gap-2 text-lg">
                        Find Medicine
                    </Link>
                </div>
            </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,60 C360,20 720,80 1440,40 L1440,80 L0,80 Z" fill="#F8F9FA"/>
            </svg>
        </div>
    </section>
);

/* ─── FEATURE CARDS ────────────────────────────────────────────────────────── */
const features = [
    {
        title: 'Queue Ticketing',
        desc: 'Get an instant token (Q1, Q2...) and track your position live. Priority for seniors, pregnant & disabled patients.',
        icon: <Activity size={28} />,
        color: 'from-blue-500 to-blue-600',
        link: '/queue',
        cta: 'Join Queue'
    },
    {
        title: 'Medicine Finder',
        desc: 'Search any medicine and instantly find nearby pharmacies with current stock availability.',
        icon: <Search size={28} />,
        color: 'from-emerald-500 to-teal-600',
        link: '/medicines',
        cta: 'Search Now'
    },
    {
        title: 'Nearby Hospitals',
        desc: 'Locate hospitals, clinics, and dispensaries around you with directions via Google Maps.',
        icon: <MapPin size={28} />,
        color: 'from-orange-500 to-red-500',
        link: '/hospitals',
        cta: 'Find Hospitals'
    }
];

const FeatureCards = () => (
    <section className="container mx-auto px-4 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
                <Link to={f.link} key={i} className="group bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center shadow-lg mb-6`}>
                        {f.icon}
                    </div>
                    <h3 className="text-xl font-extrabold text-[#001B39] mb-3">{f.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-6 text-sm">{f.desc}</p>
                    <span className="flex items-center gap-1 text-sm font-bold text-blue-600 group-hover:gap-2 transition-all">
                        {f.cta} <ChevronRight size={16} />
                    </span>
                </Link>
            ))}
        </div>
    </section>
);

/* ─── NEARBY HOSPITALS (Mock) ──────────────────────────────────────────────── */
const hospitals = [
    { name: 'AIIMS Delhi', type: 'Government', dist: '2.1 km', link: 'https://maps.google.com/?q=AIIMS+Delhi' },
    { name: 'Safdarjung Hospital', type: 'Government', dist: '3.5 km', link: 'https://maps.google.com/?q=Safdarjung+Hospital' },
    { name: 'Apollo Hospital', type: 'Private', dist: '4.2 km', link: 'https://maps.google.com/?q=Apollo+Hospital+Delhi' },
    { name: 'Ram Manohar Lohia Hospital', type: 'Government', dist: '5.0 km', link: 'https://maps.google.com/?q=RML+Hospital+Delhi' },
];

const NearbyHospitals = () => (
    <section id="hospitals" className="container mx-auto px-4 mb-20">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#001B39] mb-3">Nearby Hospitals</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Find hospitals and clinics near you with quick directions.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hospitals.map((h, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] flex items-center justify-center">
                            <Stethoscope size={20} className="text-[#001B39]" />
                        </div>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md ${h.type === 'Government' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-600'}`}>
                            {h.type}
                        </span>
                    </div>
                    <h4 className="font-bold text-[#001B39] mb-1">{h.name}</h4>
                    <p className="text-slate-400 text-sm mb-4">{h.dist} away</p>
                    <a href={h.link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
                        Get Directions <ChevronRight size={14} />
                    </a>
                </div>
            ))}
        </div>
    </section>
);

/* ─── GOVT CAMPAIGNS SLIDER ────────────────────────────────────────────────── */
const campaigns = [
    {
        title: 'Ayushman Bharat Yojana',
        desc: 'Free treatment up to ₹5 lakh per family per year at empanelled hospitals across India.',
        color: 'from-[#001B39] to-[#003d7a]',
        badge: 'Health Insurance'
    },
    {
        title: 'Pradhan Mantri Jan Arogya Yojana',
        desc: 'World\'s largest health assurance scheme covering 50 crore+ beneficiaries for secondary & tertiary care.',
        color: 'from-emerald-700 to-teal-600',
        badge: 'PM-JAY'
    },
    {
        title: 'National Digital Health Mission',
        desc: 'Create your ABHA ID and maintain digital health records. One nation, one health ecosystem.',
        color: 'from-indigo-700 to-blue-600',
        badge: 'NDHM'
    },
    {
        title: 'Mission Indradhanush',
        desc: 'Full immunization for children under 2 years and pregnant women against 12 vaccine-preventable diseases.',
        color: 'from-orange-600 to-red-500',
        badge: 'Immunization'
    },
    {
        title: 'Janani Suraksha Yojana',
        desc: 'Cash incentive for institutional delivery to reduce maternal and infant mortality.',
        color: 'from-pink-600 to-rose-500',
        badge: "Women's Health"
    }
];

const CampaignSlider = () => {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % campaigns.length);
        }, 4000);
        return () => clearInterval(intervalRef.current);
    }, []);

    const goTo = (idx) => {
        setCurrent(idx);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % campaigns.length);
        }, 4000);
    };

    const prev = () => goTo((current - 1 + campaigns.length) % campaigns.length);
    const next = () => goTo((current + 1) % campaigns.length);

    return (
        <section className="container mx-auto px-4 mb-20">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-[#001B39] mb-3">Government Health Campaigns</h2>
                <p className="text-slate-500 max-w-lg mx-auto">Stay informed about active government healthcare schemes and policies.</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
                {/* Slider */}
                <div className="overflow-hidden rounded-3xl shadow-xl">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {campaigns.map((c, i) => (
                            <div key={i} className={`min-w-full bg-gradient-to-br ${c.color} text-white p-10 md:p-14`}>
                                <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                                    {c.badge}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">{c.title}</h3>
                                <p className="text-white/80 text-lg max-w-xl leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001B39] w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001B39] w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition">
                    <ChevronRight size={20} />
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {campaigns.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#001B39]' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── ABHA CARD CTA ────────────────────────────────────────────────────────── */
const AbhaCTA = () => (
    <section className="container mx-auto px-4 mb-20">
        <div className="bg-gradient-to-br from-[#001B39] to-[#002952] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-20 w-48 h-48 bg-teal-400/10 rounded-full blur-[60px]"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield size={24} className="text-teal-300" />
                        <span className="text-xs font-bold uppercase tracking-widest text-teal-300">National Digital Health Mission</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                        Link Your ABHA Card
                    </h2>
                    <p className="text-blue-200 text-lg mb-8 max-w-md leading-relaxed">
                        Connect your Ayushman Bharat Health Account for seamless digital health records, prescriptions, and insurance claims.
                    </p>
                    <Link to="/abha" className="inline-flex items-center gap-2 bg-white text-[#001B39] font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all text-lg">
                        <CreditCard size={20} />
                        Connect ABHA Card
                    </Link>
                </div>

                {/* Mock Card Visual */}
                <div className="w-80 flex-shrink-0">
                    <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-6 shadow-2xl transform hover:rotate-1 transition-transform relative">
                        <div className="absolute inset-0 bg-white/5 rounded-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xs font-bold uppercase tracking-widest text-white/70">ABHA Card</span>
                                <Shield size={20} className="text-white/50" />
                            </div>
                            <div className="text-2xl font-bold tracking-[0.2em] text-white mb-2">
                                XX-XXXX-XXXX-XXXX
                            </div>
                            <div className="text-sm text-white/60">Your Name Here</div>
                            <div className="mt-6 flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Issued</div>
                                    <div className="text-xs font-bold text-white/70">-- / --</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Govt. of India</div>
                                    <div className="text-xs font-bold text-white/70">NHA</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* ─── STATS ────────────────────────────────────────────────────────────────── */
const Stats = () => (
    <section className="bg-white border-y border-slate-100 py-14 mb-20">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
                { val: '10K+', label: 'Patients Served' },
                { val: '500+', label: 'Hospitals Listed' },
                { val: '99.9%', label: 'Uptime' },
                { val: '4.8★', label: 'User Rating' },
            ].map((s, i) => (
                <div key={i}>
                    <div className="text-3xl md:text-4xl font-extrabold text-[#001B39]">{s.val}</div>
                    <div className="text-sm text-slate-400 font-semibold mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
            ))}
        </div>
    </section>
);

/* ─── MAIN HOME PAGE ───────────────────────────────────────────────────────── */
const HomePage = () => {
    return (
        <div>
            <Hero />
            <FeatureCards />
            <NearbyHospitals />
            <Stats />
            <CampaignSlider />
            <AbhaCTA />
        </div>
    );
};

export default HomePage;
