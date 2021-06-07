const express = require('express');

const { createCat, uploadCatImage } = require('../controllers/cats');

const router = express.Router();

router.route('/').post(createCat);

router.route('/:id/photo').post(uploadCatImage);

module.exports = router;
