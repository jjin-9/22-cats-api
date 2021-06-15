const express = require('express');

const router = express.Router({ mergeParams: true });

const { uploadPhoto, getPhotos } = require('../controllers/photos');

const { protect, authorize } = require('../middlewares/auth');

router.route('/').get(getPhotos).post(protect, authorize('admin'), uploadPhoto);

module.exports = router;
