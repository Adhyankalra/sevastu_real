import { useState } from 'react';
import { CreditCard, Shield, CheckCircle, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';

const AbhaCard = () => {
    const [step, setStep] = useState(1); // 1 = form, 2 = success
    const [formData, setFormData] = useState({
        abhaNumber: '',
        name: '',
        dob: '',
        gender: 'male',
    });
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (formData.abhaNumber.replace(/\D/g, '').length < 14) {
            setError('ABHA number must be 14 digits.');
            return;
        }
        if (!formData.name.trim()) {
            setError('Full name is required.');
            return;
        }

        // Simulate linking
        setStep(2);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-lg mx-auto">
                {step === 1 ? (
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-br from-[#001B39] to-[#003d7a] p-8 text-white text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                                <CreditCard size={28} />
                            </div>
                            <h1 className="text-2xl font-extrabold mb-2">Connect ABHA Card</h1>
                            <p className="text-blue-200 text-sm">Link your Ayushman Bharat Health Account</p>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            {error && (
                                <div className="flex items-center gap-2 bg-red-50 text-[#9B2C2C] p-3 rounded-xl mb-6 text-sm font-semibold border border-red-100">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">ABHA Number (14 digits)</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={19}
                                        placeholder="XX-XXXX-XXXX-XXXX"
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-[#001B39] font-bold text-lg tracking-widest focus:outline-none focus:border-[#001B39] focus:ring-4 focus:ring-[#E3F2FD] transition"
                                        value={formData.abhaNumber}
                                        onChange={(e) => {
                                            let v = e.target.value.replace(/\D/g, '').slice(0, 14);
                                            // Format: XX-XXXX-XXXX-XXXX
                                            let formatted = '';
                                            for (let i = 0; i < v.length; i++) {
                                                if (i === 2 || i === 6 || i === 10) formatted += '-';
                                                formatted += v[i];
                                            }
                                            setFormData({ ...formData, abhaNumber: formatted });
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="As on Aadhaar card"
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-[#001B39] font-medium focus:outline-none focus:border-[#001B39] focus:ring-4 focus:ring-[#E3F2FD] transition"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Date of Birth</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-[#001B39] font-medium focus:outline-none focus:border-[#001B39] focus:ring-4 focus:ring-[#E3F2FD] transition"
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Gender</label>
                                        <select
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-[#001B39] font-medium focus:outline-none focus:border-[#001B39] focus:ring-4 focus:ring-[#E3F2FD] transition"
                                            value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#001B39] hover:bg-[#001B39]/90 text-white font-bold py-4 rounded-2xl shadow-[0_4px_14px_0_rgba(0,27,57,0.39)] transition-all flex items-center justify-center gap-2 text-lg mt-4"
                                >
                                    Link ABHA Card <ArrowRight size={20} />
                                </button>
                            </form>

                            <p className="text-center text-xs text-slate-400 mt-6">
                                Don't have an ABHA ID? 
                                <a href="https://healthid.ndhm.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold ml-1 inline-flex items-center gap-0.5">
                                    Create one <ExternalLink size={10} />
                                </a>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-10 text-center">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-[#48BB78]" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-[#001B39] mb-3">ABHA Card Linked!</h2>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                            Your ABHA account has been connected successfully. Your digital health records are now accessible on SevaSetu.
                        </p>

                        {/* Linked Card Preview */}
                        <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-6 text-white text-left max-w-xs mx-auto mb-8 shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">ABHA Card</span>
                                <Shield size={18} className="text-white/50" />
                            </div>
                            <div className="text-xl font-bold tracking-[0.15em] mb-1">{formData.abhaNumber}</div>
                            <div className="text-sm text-white/70 uppercase font-semibold">{formData.name}</div>
                            <div className="mt-5 flex justify-between items-end">
                                <div>
                                    <div className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">DOB</div>
                                    <div className="text-xs font-bold text-white/80">{formData.dob}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">Govt. of India</div>
                                    <div className="text-xs font-bold text-white/80">NHA</div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => { setStep(1); setFormData({ abhaNumber: '', name: '', dob: '', gender: 'male' }); }}
                            className="text-slate-400 hover:text-[#001B39] font-semibold text-sm transition"
                        >
                            Link another ABHA ID
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AbhaCard;
