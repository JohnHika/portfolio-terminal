const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const CommandAnalytics = require('../models/CommandAnalytics');

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    // Track command usage
    await CommandAnalytics.create({
      command: 'blog',
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .select('title excerpt slug tags createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog post
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
