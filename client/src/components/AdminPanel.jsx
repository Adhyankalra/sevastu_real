import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Users, UserPlus, CheckSquare, AlertTriangle, ChevronRight, Lock } from 'lucide-react';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAdmin') === 'true'
    );
    const [loginUsername, setLoginUsername] = useState('');
    const [loginError, setLoginError] = useState(false);

    const [department, setDepartment] = useState('OPD');
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginUsername.trim().toLowerCase() === 'doctor') {
            setIsAuthenticated(true);
            localStorage.setItem('isAdmin', 'true');
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAdmin');
    };

    const fetchQueue = async () => {
        if (!isAuthenticated) return;
        try {
            const res = await axios.get(`/api/queue/list/${department}`);
            setQueue(res.data.data);
        } catch (error) {
            console.error("Failed to fetch queue", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        
        setLoading(true);
        fetchQueue();

        const socket = io('http://localhost:5000');
        socket.on('queueUpdated', () => {
            fetchQueue();
        });

        return () => {
            socket.disconnect();
        };
    }, [department, isAuthenticated]);

    const handleCallNext = async () => {
        try {
            await axios.post('/api/queue/next', { department });
        } catch (error) {
            alert(error.response?.data?.message || 'Error calling next patient');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto mt-16 p-8 brand-card">
                <div className="w-16 h-16 bg-brandLight rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock className="text-brand w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-center text-brand mb-2">Staff Login</h2>
                <p className="text-center text-slate-500 mb-8 text-sm">Please log in to manage the queuing system.</p>
                
                {loginError && <div className="bg-red-50 text-alert p-3 rounded-xl mb-6 text-sm font-bold text-center border border-red-100">Invalid username. Try "doctor".</div>}
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-brand font-medium focus:outline-none focus:border-brand focus:ring-4 focus:ring-brandLight transition"
                            placeholder="Enter Username"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-4 rounded-2xl shadow-[0_4px_14px_0_rgba(0,27,57,0.39)] transition-all duration-200">
                        Login to Portal
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-8">
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-brand tracking-tight">Queue Management</h1>
                    <p className="text-slate-500 font-medium mt-1">Real-time patient flow control</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <select 
                            className="bg-white border-2 border-slate-200 rounded-xl py-3 pl-4 pr-10 text-brand font-bold focus:outline-none focus:border-brand appearance-none w-full shadow-sm"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="OPD">OPD Clinic</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Orthopedics">Orthopedics</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                            <ChevronRight className="w-5 h-5 rotate-90" />
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleCallNext}
                        disabled={queue.length === 0}
                        className="bg-brand hover:bg-brand/90 text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(0,27,57,0.2)] flex items-center gap-2 transition disabled:opacity-50 disabled:shadow-none w-full sm:w-auto justify-center"
                    >
                        <UserPlus size={18} />
                        Call Next Patient
                    </button>
                    
                    <button onClick={handleLogout} className="text-slate-400 hover:text-alert font-bold text-sm px-4 underline">
                        Logout
                    </button>
                </div>
            </div>

            <div className="brand-card overflow-hidden border-none pb-2">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 grid grid-cols-5 md:grid-cols-6 gap-4">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest col-span-1">Token</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest col-span-2 hidden md:block">User ID</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest col-span-1">Age</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest col-span-1">Priority</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest col-span-1">Status</div>
                </div>
                
                {loading ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand border-r-transparent mb-4"></div>
                        <span className="text-slate-400 font-medium">Loading queue data...</span>
                    </div>
                ) : queue.length === 0 ? (
                    <div className="p-16 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <CheckSquare className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">Queue is empty</h3>
                        <p className="text-slate-500 mt-1">No patients waiting in {department}</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {queue.map((patient, index) => (
                            <div key={patient._id} className={`px-6 py-5 grid grid-cols-5 md:grid-cols-6 gap-4 items-center transition ${patient.priority > 0 ? 'bg-red-50/50' : 'hover:bg-slate-50'}`}>
                                <div className="text-xl font-extrabold text-brand">
                                    {patient.queueNumber} 
                                    <span className="text-[10px] text-slate-400 block font-bold uppercase mt-0.5">#{index + 1} in line</span>
                                </div>
                                <div className="col-span-2 hidden md:block text-slate-400 font-mono text-sm truncate pr-4">
                                    {patient.userId}
                                </div>
                                <div className="text-slate-600 font-medium">{patient.age} y/o</div>
                                <div>
                                    {patient.priority > 0 ? (
                                        <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 bg-red-100 text-alert rounded-md w-max uppercase tracking-wide">
                                            <AlertTriangle size={12} strokeWidth={3} /> High
                                        </span>
                                    ) : (
                                        <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-500 rounded-md w-max inline-block uppercase tracking-wide">
                                            Standard
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold px-2.5 py-1 bg-brandLight text-brand rounded-md w-max inline-block uppercase tracking-wide">
                                        Waiting
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
