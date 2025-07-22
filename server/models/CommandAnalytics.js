const mongoose = require('mongoose');

const commandAnalyticsSchema = new mongoose.Schema({
  command: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userAgent: {
    type: String
  },
  ip: {
    type: String
  }
});

module.exports = mongoose.model('CommandAnalytics', commandAnalyticsSchema);
