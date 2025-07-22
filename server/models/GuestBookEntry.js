const mongoose = require('mongoose');

const guestBookEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  ip: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GuestBookEntry', guestBookEntrySchema);
