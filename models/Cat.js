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
    require: [true, 'Please add an age'],
    min: [0, 'Age must be at least 0']
  },
  dob: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    enum: ['M', 'F'],
    required: true
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  }
});

module.exports = mongoose.model('Cat', CatSchema);
