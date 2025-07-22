const express = require('express');
const router = express.Router();
const CommandAnalytics = require('../models/CommandAnalytics');

// Get command analytics
router.get('/commands', async (req, res) => {
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
