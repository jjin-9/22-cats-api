const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trime: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  age: {
    type: Number,
    required: [true, 'Please add age'],
    min: [0, 'Age must be at least 0']
  },
  dob: {
    type: Date,
    required: [true, 'Please add date of birth']
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: [true, 'Please add gender']
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  }
});

module.exports = mongoose.model('Cat', CatSchema);
