const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  // name of the photo
  name: {
    type: String,
    trim: true,
    default: 'default.jpg'
  },
  // cat in the photo
  cat: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cat',
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Photo', photoSchema);
