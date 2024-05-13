const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  messages: {
    type: [],
    required: true
  }
});

module.exports = mongoose.model('Summary', SummarySchema);
