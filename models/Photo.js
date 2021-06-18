const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  // name of the photo
  name: String,
  url: String,
  catName: {
    type: String,
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
  createAt: {
    type: Date,
    default: Date.now,
    select: false
  }
});

module.exports = mongoose.model('Photo', photoSchema);
