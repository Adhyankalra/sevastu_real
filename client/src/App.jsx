import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JoinQueue from './components/JoinQueue';
import QueueStatus from './components/QueueStatus';
import AdminPanel from './components/AdminPanel';
import MedicineSearch from './components/MedicineSearch';
import NearbyHospitals from './pages/NearbyHospitals';
import AbhaCard from './pages/AbhaCard';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/queue" element={<div className="container mx-auto px-4 mt-8"><JoinQueue /></div>} />
            <Route path="/status/:userId" element={<div className="container mx-auto px-4 mt-8"><QueueStatus /></div>} />
            <Route path="/admin" element={<div className="container mx-auto px-4 mt-8"><AdminPanel /></div>} />
            <Route path="/medicines" element={<div className="container mx-auto px-4 mt-8"><MedicineSearch /></div>} />
            <Route path="/hospitals" element={<NearbyHospitals />} />
            <Route path="/abha" element={<AbhaCard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
