const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      enum: [
        'Kong',
        'E-Baek',
        'Goni',
        'Bom',
        'Soi',
        'Dori',
        'Soo-Ri',
        'Bong-Nam',
        'Sami',
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
        'Ah-Ju-Si',
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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

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

CatSchema.virtual('photos', {
  ref: 'Photo',
  localField: 'name',
  foreignField: 'catName'
});

module.exports = mongoose.model('Cat', CatSchema);
