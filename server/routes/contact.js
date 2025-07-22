const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const CommandAnalytics = require('../models/CommandAnalytics');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    // Track command usage
    await CommandAnalytics.create({
      command: 'contact',
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({ 
      message: 'Message sent successfully!',
      id: contactMessage._id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
