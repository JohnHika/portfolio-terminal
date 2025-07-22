const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const CommandAnalytics = require('../models/CommandAnalytics');

// Get all projects
router.get('/', async (req, res) => {
  try {
    // Track command usage
    await CommandAnalytics.create({
      command: 'projects',
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
