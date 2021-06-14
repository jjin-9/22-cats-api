const express = require('express');

const photoRouter = require('../routers/photos');

const {
  getCats,
  getCat,
  createCat,
  uploadCatImage,
  getCatImage
} = require('../controllers/cats');

const router = express.Router();

// Re-route into other resource routers
router.use('/:catId/photos', photoRouter);

router.route('/').get(getCats).post(createCat);

router.route('/:id').get(getCat);

module.exports = router;
