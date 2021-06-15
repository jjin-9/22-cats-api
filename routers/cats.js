const express = require('express');

const Cat = require('../models/Cat');

const photoRouter = require('../routers/photos');

const {
  getCats,
  getCat,
  createCat,
  uploadCatImage,
  getCatImage
} = require('../controllers/cats');

const { protect, authorize } = require('../middlewares/auth');
const advancedQuery = require('../middlewares/advancedQuery');

const router = express.Router();

// Re-route into other resource routers
router.use('/:catId/photos', photoRouter);

router
  .route('/')
  .get(advancedQuery(Cat), getCats)
  .post(protect, authorize('admin'), createCat);

router.route('/:id').get(getCat);

module.exports = router;
