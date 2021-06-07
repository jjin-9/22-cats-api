const express = require('express');

const { createCat } = require('../controllers/cats');

const router = express.Router();

router.route('/').post(createCat);

module.exports = router;
