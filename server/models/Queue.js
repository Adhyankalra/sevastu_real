const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    queueNumber: { type: String }, // e.g. OPD-001
    department: { type: String, required: true },
    age: { type: Number, required: true },
    pregnant: { type: Boolean, required: true, default: false },
    disabled: { type: Boolean, required: true, default: false },
    priority: { type: Number, required: true, default: 0 },
    status: { type: String, default: 'waiting' } // 'waiting', 'checked-in'
}, { timestamps: true });

module.exports = mongoose.model('Queue', QueueSchema);
