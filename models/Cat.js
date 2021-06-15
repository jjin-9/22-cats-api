const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
    enum: [
      'Kong',
      'E-Baek',
      'Goni',
      'Bom',
      'Soi',
      'Dori',
      'Soo-Ri',
      'Bong-Nam',
      'Sam',
      'Jum-Dol',
      'Amber',
      'Coco',
      'Gi-Pheum',
      'Sun-Duk',
      'Yu-Sin',
      'Hal-Bae',
      'Phoo-Ni',
      'Ae-Ong',
      'Yomi',
      'A-Ju-Si',
      'Lovey',
      'Gi-Jeok'
    ]
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
  image: {
    type: String,
    default: 'image_not_found.png'
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
  this.englishName;
  this.age = _getAge(this.dob);
  next();
});

module.exports = mongoose.model('Cat', CatSchema);
