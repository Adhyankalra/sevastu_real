import { useState } from 'react';
import axios from 'axios';
import { Search, MapPin, Navigation, PackageCheck, PackageX, Pill, ExternalLink, X } from 'lucide-react';

const MedicineSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [mapModal, setMapModal] = useState(null); // pharmacy object or null

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        try {
            const res = await axios.get(`/api/pharmacy/search?medicine=${encodeURIComponent(searchTerm)}`);
            setResults(res.data.data);
            setSearched(true);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    const getDirectionsUrl = (pharmacy) =>
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pharmacy.address)}`;

    return (
        <div className="max-w-4xl mx-auto mt-8 relative">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-[#E3F2FD] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Pill className="text-[#001B39] w-8 h-8" />
                </div>
                <h1 className="text-4xl font-extrabold text-[#001B39] mb-4 tracking-tight">Medicine Finder</h1>
                <p className="text-slate-500 text-lg">Locate nearby dispensaries with available stock.</p>
            </div>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-12">
                <input
                    type="text"
                    placeholder="Enter medicine name (e.g. Paracetamol)"
                    className="w-full bg-white border-2 border-slate-200 rounded-full py-5 pl-8 pr-20 text-[#001B39] text-lg font-medium focus:outline-none focus:border-[#001B39] focus:ring-4 focus:ring-[#E3F2FD] shadow-sm transition placeholder-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-3 top-3 bottom-3 bg-[#001B39] hover:bg-[#001B39]/90 text-white rounded-full w-14 flex items-center justify-center transition disabled:opacity-50 shadow-md"
                >
                    <Search size={24} />
                </button>
            </form>

            {loading && (
                <div className="flex justify-center my-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#001B39] border-r-transparent"></div>
                </div>
            )}

            {!loading && searched && results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.map((pharmacy) => (
                        <div key={pharmacy.id} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 flex flex-col h-full hover:border-slate-200 transition duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <div className="bg-slate-50 p-2 rounded-lg">
                                        <MapPin className="text-[#001B39]" size={20} />
                                    </div>
                                    {pharmacy.name}
                                </h3>
                            </div>

                            <div className="mb-4 border-l-4 border-slate-100 pl-4 py-1">
                                <p className="text-slate-600 font-medium">{pharmacy.address}</p>
                                <p className="mt-1 text-slate-400 text-sm font-semibold">{pharmacy.distance} away</p>
                            </div>

                            {/* Inline Mini Map */}
                            <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-100">
                                <iframe
                                    title={`Map of ${pharmacy.name}`}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(pharmacy.address)}&z=15&output=embed`}
                                    allowFullScreen
                                />
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                {pharmacy.available ? (
                                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-green-50 text-[#48BB78] rounded-md uppercase tracking-wide">
                                        <PackageCheck size={16} /> In Stock
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-red-50 text-[#9B2C2C] rounded-md uppercase tracking-wide">
                                        <PackageX size={16} /> Out of Stock
                                    </span>
                                )}

                                <a
                                    href={getDirectionsUrl(pharmacy)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-[#001B39] hover:bg-[#001B39]/90 text-white font-bold px-4 py-2 rounded-xl transition text-sm shadow"
                                >
                                    <Navigation size={14} />
                                    Directions
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && searched && results.length === 0 && (
                <div className="text-center text-slate-500 my-16 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="text-xl font-bold text-slate-700 mb-2">No results found</p>
                    <p>Try searching: <strong>paracetamol</strong>, <strong>ibuprofen</strong>, <strong>cetirizine</strong>, <strong>amoxicillin</strong></p>
                </div>
            )}
        </div>
    );
};

export default MedicineSearch;
