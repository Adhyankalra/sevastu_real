import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const JoinQueue = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        department: 'OPD',
        age: '',
        pregnant: false,
        disabled: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const userId = uuidv4();
            const payload = { ...formData, userId, age: Number(formData.age) };
            await axios.post('/api/queue/join', payload);
            navigate(`/status/${userId}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to join queue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6 md:mt-12 p-8 brand-card">
            <h2 className="text-2xl font-bold mb-8 text-brand">Patient Registration</h2>
            
            {error && <div className="bg-red-50 border-l-4 border-alert text-alert p-4 rounded-r-lg mb-6 text-sm font-medium">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Department</label>
                    <select 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-brand font-medium focus:outline-none focus:border-brand focus:ring-4 focus:ring-brandLight transition"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                    >
                        <option value="OPD">OPD (Outpatient)</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Patient Age</label>
                    <input 
                        type="number" 
                        required
                        min="0"
                        max="120"
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-brand font-medium focus:outline-none focus:border-brand focus:ring-4 focus:ring-brandLight transition"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        placeholder="e.g. 45"
                    />
                </div>
                
                <div className="space-y-3 pt-4">
                    <label className={`flex items-center space-x-4 p-4 rounded-2xl border-2 cursor-pointer transition ${formData.pregnant ? 'border-brand bg-brandLight text-brand' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300'}`}>
                        <div className="relative flex items-center justify-center w-6 h-6">
                            <input 
                                type="checkbox" 
                                className="peer appearance-none w-6 h-6 rounded-md border-2 border-slate-300 checked:bg-brand checked:border-brand transition"
                                checked={formData.pregnant}
                                onChange={(e) => setFormData({...formData, pregnant: e.target.checked})}
                            />
                            <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="font-semibold">Patient is Pregnant</span>
                    </label>
                    
                    <label className={`flex items-center space-x-4 p-4 rounded-2xl border-2 cursor-pointer transition ${formData.disabled ? 'border-brand bg-brandLight text-brand' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300'}`}>
                        <div className="relative flex items-center justify-center w-6 h-6">
                            <input 
                                type="checkbox" 
                                className="peer appearance-none w-6 h-6 rounded-md border-2 border-slate-300 checked:bg-brand checked:border-brand transition"
                                checked={formData.disabled}
                                onChange={(e) => setFormData({...formData, disabled: e.target.checked})}
                            />
                            <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="font-semibold">Differently Abled / Disabled</span>
                    </label>
                </div>
                
                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-4 px-6 rounded-2xl shadow-[0_4px_14px_0_rgba(0,27,57,0.39)] transition-all duration-200 disabled:opacity-50 text-lg flex items-center justify-center gap-2"
                    >
                        {loading ? 'Processing...' : 'Proceed to Queue'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default JoinQueue;
