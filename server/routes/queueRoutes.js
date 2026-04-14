const express = require('express');
const router = express.Router();
const { joinQueue, getQueueStatus, getQueueList, callNext } = require('../controllers/queueController');

router.post('/join', joinQueue);
router.get('/status/:userId', getQueueStatus);
router.get('/list/:department', getQueueList);
router.post('/next', callNext);

module.exports = router;
