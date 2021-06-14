const express = require('express');

const router = express.Router({ mergeParams: true });

const { uploadPhoto } = require('../controllers/photos');

router.route('/').post(uploadPhoto);

module.exports = router;
