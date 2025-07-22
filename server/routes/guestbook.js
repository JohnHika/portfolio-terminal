const express = require('express');
const router = express.Router();
const GuestBookEntry = require('../models/GuestBookEntry');
const CommandAnalytics = require('../models/CommandAnalytics');

// Get all guestbook entries (temporarily showing all entries including unapproved ones)
router.get('/', async (req, res) => {
  try {
    // Track command usage
    await CommandAnalytics.create({
      command: 'guestbook',
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    // For development: show all entries regardless of approval status
    const entries = await GuestBookEntry.find({})
      .sort({ createdAt: -1 })
      .select('name message createdAt');
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit guestbook entry
router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    // Auto-approve entries during development
    const entry = await GuestBookEntry.create({
      name,
      message,
      approved: true, // Auto-approve for now
      ip: req.ip
    });

    res.status(201).json({ 
      message: 'Guestbook entry submitted! It will appear after approval.',
      id: entry._id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// For admin: Approve or reject a guestbook entry
router.patch('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    
    if (approved === undefined) {
      return res.status(400).json({ error: 'Approval status is required' });
    }
    
    const entry = await GuestBookEntry.findByIdAndUpdate(
      id, 
      { approved }, 
      { new: true }
    );
    
    if (!entry) {
      return res.status(404).json({ error: 'Guestbook entry not found' });
    }
    
    res.json({ 
      message: `Guestbook entry ${approved ? 'approved' : 'rejected'}.`, 
      entry 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
