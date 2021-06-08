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
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const _getAge = (dob) => {
  // subtract current year from birth year
  const currFullDate = new Date();
  const currYear = currFullDate.getFullYear();
  const currMonth = currFullDate.getMonth();
  const currDate = currFullDate.getDate();

  let age = currYear - dob.getFullYear();

  // subtract 1 if birth date is after current date
  if (
    currMonth < dob.getMonth() ||
    (currMonth === dob.getMonth() && currDate < dob.getDate())
  ) {
    age--;
  }

  return age;
};

CatSchema.pre('save', function (next) {
  this.age = _getAge(this.dob);
  next();
});

module.exports = mongoose.model('Cat', CatSchema);
