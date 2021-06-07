const Cat = require('../models/Cat');
const asyncHandler = require('../utils/asyncHandler');

// @desc      Add a new cat
// @route     Post /api/v1/cats
// @access    Private
exports.createCat = asyncHandler(async (req, res, next) => {
  const cat = await Cat.create(req.body);

  res.status(201).send({
    success: true,
    data: cat
  });
});
