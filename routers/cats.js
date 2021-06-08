const express = require('express');

const {
  getCats,
  getCat,
  createCat,
  uploadCatImage
} = require('../controllers/cats');

const router = express.Router();

router.route('/').get(getCats).post(createCat);

router.route('/:id').get(getCat);

router.route('/:id/photo').post(uploadCatImage);

module.exports = router;
