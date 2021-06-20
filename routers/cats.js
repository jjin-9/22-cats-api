const express = require('express');

const Cat = require('../models/Cat');

const photoRouter = require('../routers/photos');

const { getCats, getCat, createCat } = require('../controllers/cats');

const { protect, authorize } = require('../middlewares/auth');
const advancedQuery = require('../middlewares/advancedQuery');

const router = express.Router();

router
  .route('/')
  .get(advancedQuery(Cat, 'photos', 'name gender dob'), getCats)
  .post(protect, authorize('admin'), createCat);

router.route('/:id').get(getCat);

module.exports = router;
