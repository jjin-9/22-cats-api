const express = require('express');

const Photo = require('../models/Photo');

const advancedQuery = require('../middlewares/advancedQuery');

const router = express.Router();

const { uploadPhoto, getPhotos, getPhoto } = require('../controllers/photos');

const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedQuery(Photo, { path: 'cat' }), getPhotos)
  .post(protect, authorize('admin'), uploadPhoto);

router.route('/:id').get(getPhoto);

module.exports = router;
