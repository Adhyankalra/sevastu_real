const { getIo } = require('../socket/index');
const { v4: uuidv4 } = require('uuid');

// ─── In-Memory Store ──────────────────────────────────────────────────────────
let queue = [];  // Array of patient objects
let ticketCounter = 0; // Global daily counter → Q1, Q2, Q3...

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getSortedWaiting = (department) =>
    queue
        .filter(p => p.status === 'waiting' && p.department === department)
        .sort((a, b) => b.priority - a.priority || a.joinedAt - b.joinedAt);

// ─── JOIN QUEUE ───────────────────────────────────────────────────────────────
exports.joinQueue = (req, res) => {
    try {
        const { userId, department, age, pregnant, disabled } = req.body;

        if (!userId || !department || age === undefined) {
            return res.status(400).json({ message: 'userId, department, and age are required' });
        }

        // Priority: senior, pregnant, or disabled → 5, else → 0
        const priority = (Number(age) > 50 || pregnant || disabled) ? 5 : 0;

        ticketCounter += 1;
        const queueNumber = `Q${ticketCounter}`;

        const entry = {
            _id: uuidv4(),
            userId,
            queueNumber,
            department,
            age: Number(age),
            pregnant: !!pregnant,
            disabled: !!disabled,
            priority,
            status: 'waiting',
            joinedAt: Date.now()
        };

        queue.push(entry);

        const io = getIo();
        io.emit('queueUpdated', { action: 'join', data: entry });

        return res.status(201).json({ message: 'Successfully joined queue', data: entry });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ─── GET STATUS ───────────────────────────────────────────────────────────────
exports.getQueueStatus = (req, res) => {
    try {
        const { userId } = req.params;

        const entry = queue.find(p => p.userId === userId);
        if (!entry) {
            return res.status(404).json({ message: 'User not found in queue' });
        }

        if (entry.status === 'checked-in') {
            return res.status(200).json({
                queueNumber: entry.queueNumber,
                status: 'checked-in',
                position: 0,
                peopleAhead: 0
            });
        }

        // Get sorted waiting list for that department
        const deptWaiting = getSortedWaiting(entry.department);
        const position = deptWaiting.findIndex(p => p.userId === userId) + 1;

        return res.status(200).json({
            queueNumber: entry.queueNumber,
            position,
            peopleAhead: position - 1,
            status: entry.status
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ─── GET LIST (department) ────────────────────────────────────────────────────
exports.getQueueList = (req, res) => {
    try {
        const { department } = req.params;
        const list = getSortedWaiting(department);
        return res.status(200).json({ data: list });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ─── CALL NEXT ────────────────────────────────────────────────────────────────
exports.callNext = (req, res) => {
    try {
        const { department } = req.body;
        const sorted = getSortedWaiting(department);

        if (sorted.length === 0) {
            return res.status(404).json({ message: 'No more patients in the queue' });
        }

        const next = sorted[0];
        // Mark checked-in in the global store
        const idx = queue.findIndex(p => p._id === next._id);
        queue[idx].status = 'checked-in';

        const io = getIo();
        io.emit('queueUpdated', { action: 'check-in', data: queue[idx] });

        return res.status(200).json({ message: 'Patient checked-in', data: queue[idx] });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
