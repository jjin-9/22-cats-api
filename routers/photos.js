const express = require('express');

const Photo = require('../models/Photo');

const advancedQuery = require('../middlewares/advancedQuery');

const router = express.Router({ mergeParams: true });

const { uploadPhoto, getPhotos } = require('../controllers/photos');

const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedQuery(Photo, { path: 'cat' }), getPhotos)
  .post(protect, authorize('admin'), uploadPhoto);

module.exports = router;
