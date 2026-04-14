import { useState } from 'react';
import { MapPin, Stethoscope, ChevronRight, Navigation, Phone, Clock, ExternalLink } from 'lucide-react';

const hospitals = [
    { id: 1, name: 'AIIMS Delhi', type: 'Government', dist: '2.1 km', address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi', phone: '011-26588500', hours: 'Open 24 hours', lat: 28.5672, lng: 77.2100 },
    { id: 2, name: 'Safdarjung Hospital', type: 'Government', dist: '3.5 km', address: 'Ring Road, Safdarjung, New Delhi', phone: '011-26730000', hours: 'Open 24 hours', lat: 28.5685, lng: 77.2065 },
    { id: 3, name: 'Apollo Hospital', type: 'Private', dist: '4.2 km', address: 'Sarita Vihar, Mathura Road, New Delhi', phone: '011-71791090', hours: 'Open 24 hours', lat: 28.5355, lng: 77.2860 },
    { id: 4, name: 'Ram Manohar Lohia Hospital', type: 'Government', dist: '5.0 km', address: 'Baba Kharak Singh Marg, New Delhi', phone: '011-23365525', hours: 'Open 24 hours', lat: 28.6275, lng: 77.2100 },
    { id: 5, name: 'Fortis Escorts Heart Institute', type: 'Private', dist: '5.8 km', address: 'Okhla Road, Sukhdev Vihar, New Delhi', phone: '011-47135000', hours: 'Open 24 hours', lat: 28.5482, lng: 77.2720 },
    { id: 6, name: 'GTB Hospital', type: 'Government', dist: '8.3 km', address: 'Dilshad Garden, Delhi', phone: '011-22586262', hours: 'Open 24 hours', lat: 28.6867, lng: 77.3160 },
];

const NearbyHospitals = () => {
    const [selected, setSelected] = useState(hospitals[0]);

    const getMapUrl = (hospital) =>
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(hospital.name + ' ' + hospital.address)}&zoom=15`;

    const getDirectionsUrl = (hospital) =>
        `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}&destination_place_id=&travelmode=driving`;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-10">
                <div className="w-14 h-14 bg-[#E3F2FD] rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <MapPin className="text-[#001B39] w-7 h-7" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#001B39] mb-3 tracking-tight">Find Nearby Hospitals</h1>
                <p className="text-slate-500 max-w-lg mx-auto">Locate hospitals and clinics near you with live maps and instant directions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                {/* Hospital List */}
                <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scroll">
                    {hospitals.map((h) => (
                        <button
                            key={h.id}
                            onClick={() => setSelected(h)}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                                selected.id === h.id
                                    ? 'bg-[#001B39] text-white border-[#001B39] shadow-lg'
                                    : 'bg-white text-slate-700 border-slate-100 hover:border-slate-300 shadow-sm'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className={`font-bold text-lg ${selected.id === h.id ? 'text-white' : 'text-[#001B39]'}`}>{h.name}</h3>
                                <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md shrink-0 ml-2 ${
                                    h.type === 'Government'
                                        ? selected.id === h.id ? 'bg-green-500/20 text-green-300' : 'bg-green-50 text-green-700'
                                        : selected.id === h.id ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-50 text-purple-600'
                                }`}>
                                    {h.type}
                                </span>
                            </div>
                            <p className={`text-sm mb-2 ${selected.id === h.id ? 'text-blue-200' : 'text-slate-400'}`}>{h.address}</p>
                            <div className="flex items-center justify-between">
                                <span className={`text-sm font-semibold ${selected.id === h.id ? 'text-blue-300' : 'text-blue-600'}`}>{h.dist} away</span>
                                <ChevronRight size={16} className={selected.id === h.id ? 'text-white/50' : 'text-slate-300'} />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Map + Details */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Embedded Map */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                        <div className="relative w-full h-[350px] md:h-[400px] bg-slate-100">
                            <iframe
                                title="Hospital Map"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://maps.google.com/maps?q=${selected.lat},${selected.lng}&z=15&output=embed`}
                                allowFullScreen
                            />
                        </div>

                        {/* Details Card */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-[#001B39]">{selected.name}</h2>
                                    <p className="text-slate-400 text-sm mt-1">{selected.address}</p>
                                </div>
                                <div className="w-10 h-10 bg-[#E3F2FD] rounded-xl flex items-center justify-center shrink-0">
                                    <Stethoscope size={20} className="text-[#001B39]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
                                    <Phone size={14} className="text-slate-400" />
                                    <span className="text-sm font-medium text-slate-600">{selected.phone}</span>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
                                    <Clock size={14} className="text-green-500" />
                                    <span className="text-sm font-medium text-green-600">{selected.hours}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <a
                                    href={getDirectionsUrl(selected)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-[#001B39] hover:bg-[#001B39]/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-[0_4px_14px_0_rgba(0,27,57,0.3)]"
                                >
                                    <Navigation size={18} />
                                    Get Directions
                                </a>
                                <a
                                    href={`tel:${selected.phone}`}
                                    className="bg-slate-100 hover:bg-slate-200 text-[#001B39] font-bold py-3 px-5 rounded-xl flex items-center gap-2 transition"
                                >
                                    <Phone size={18} />
                                    Call
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NearbyHospitals;
