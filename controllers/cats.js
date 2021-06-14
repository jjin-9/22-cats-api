const path = require('path');

const Cat = require('../models/Cat');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc      Get all cats
// @route     Get /api/v1/cats
// @access    Public
exports.getCats = asyncHandler(async (req, res, next) => {
  const cats = await Cat.find();

  res.status(200).send({
    success: true,
    data: cats
  });
});

// @desc      Get a cat by id
// @route     Get /api/v1/cats/:id
// @access    Public
exports.getCat = asyncHandler(async (req, res, next) => {
  const cat = await Cat.findById(req.params.id);

  if (!cat) {
    return next(
      new ErrorResponse(`Cat not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).send({
    success: true,
    data: cat
  });
});

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
