require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { init } = require('./socket');
const queueRoutes = require('./routes/queueRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/queue', queueRoutes);
app.use('/api/pharmacy', pharmacyRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SevaSetu server running (in-memory mode)' });
});

const server = http.createServer(app);

// Initialize Socket.io
init(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`✅ SevaSetu server running on port ${PORT}`);
    console.log(`ℹ️  Using in-memory data store — no MongoDB needed.`);
});
