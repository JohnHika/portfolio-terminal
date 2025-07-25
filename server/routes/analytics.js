const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const CommandAnalytics = require('../models/CommandAnalytics');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Get command analytics (protected route)
router.get('/commands', verifyToken, async (req, res) => {
  try {
    // Get command usage stats
    const commandStats = await CommandAnalytics.aggregate([
      {
        $group: {
          _id: '$command',
          count: { $sum: 1 },
          lastUsed: { $max: '$timestamp' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get recent activity (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentActivity = await CommandAnalytics.find({
      timestamp: { $gte: oneDayAgo }
    }).sort({ timestamp: -1 });

    res.json({
      commandStats,
      recentActivity,
      totalCommands: await CommandAnalytics.countDocuments()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Track a command (used internally)
router.post('/track', async (req, res) => {
  try {
    const { command } = req.body;
    
    await CommandAnalytics.create({
      command,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    res.json({ message: 'Command tracked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
