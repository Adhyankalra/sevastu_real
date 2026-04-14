import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { User, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const QueueStatus = () => {
    const { userId } = useParams();
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStatus = async () => {
        try {
            const res = await axios.get(`/api/queue/status/${userId}`);
            setStatusData(res.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch status');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();

        // Connect to Socket.io
        const socket = io('http://localhost:5000');
        
        socket.on('queueUpdated', () => {
            fetchStatus(); // Refresh status when queue updates
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand border-r-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-12 p-8 brand-card text-center">
                <AlertCircle className="w-16 h-16 text-alert mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-800 mb-2">Notice</h2>
                <p className="text-slate-500 mb-8">{error}</p>
                <Link to="/" className="inline-block bg-brand hover:bg-brand/90 text-white font-bold py-3 px-8 rounded-xl shadow-md transition">Return to Home</Link>
            </div>
        );
    }

    const { queueNumber, position, peopleAhead, status } = statusData;
    const isCheckedIn = status === 'checked-in';

    return (
        <div className="max-w-md mx-auto mt-12 p-8 brand-card text-center relative overflow-hidden">
            {/* Top decorative accent */}
            <div className={`absolute top-0 left-0 right-0 h-2 ${isCheckedIn ? 'bg-success' : 'bg-brand'}`}></div>
            
            {isCheckedIn ? (
                <div className="py-6">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-success" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">It's your turn!</h2>
                    <p className="text-slate-500 mb-8 max-w-[250px] mx-auto">Please proceed directly to the doctor's cabin.</p>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-bold text-brand mb-8 uppercase tracking-wide">Queue Status</h2>
                    
                    <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#E3F2FD" strokeWidth="8" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#001B39" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * Math.max(10 - peopleAhead, 1)) / 10} className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="text-center">
                            <span className="block text-2xl font-extrabold text-brand mt-2">{queueNumber}</span>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest text-center mx-auto">Token<br/>(Pos #{position})</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <Clock className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-slate-800">{peopleAhead}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ahead</p>
                        </div>
                        <div className="bg-brandLight p-4 rounded-2xl border border-brand/10">
                            <User className="w-6 h-6 text-brand mx-auto mb-2" />
                            <p className="text-2xl font-bold text-brand">~{peopleAhead * 10}m</p>
                            <p className="text-[10px] font-bold text-brand uppercase tracking-widest mt-1">Wait Time</p>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                        <p className="text-brand text-sm font-medium">
                            Live Updating Enabled
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            Your screen will update automatically.
                        </p>
                    </div>
                </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-slate-100">
                <Link to="/" className="text-slate-400 hover:text-alert font-medium transition text-sm flex items-center justify-center gap-1">
                    Leave Queue
                </Link>
            </div>
        </div>
    );
};

export default QueueStatus;
