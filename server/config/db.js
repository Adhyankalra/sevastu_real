const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sevasetu';
        await mongoose.connect(uri);
        console.log('✅ MongoDB connected.');
    } catch (error) {
        console.error(`❌ MongoDB failed: ${error.message}`);
        console.log('⚠️  Falling back to in-memory store...');
        // Don't exit — controller will use in-memory store instead
    }
};

module.exports = connectDB;
