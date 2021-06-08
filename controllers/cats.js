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

// @desc      Upload a cat image
// @route     Post /api/v1/cats/:id/photo
// @access    Private
exports.uploadCatImage = asyncHandler(async (req, res, next) => {
  const cat = await Cat.findById(req.params.id);

  if (!cat) {
    return next(
      new ErrorResponse(`Cat not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse('Please upload an image', 400));
  }

  console.log(req.files);

  const { file } = req.files;

  // Make sure that the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custome filename
  file.name = `${cat.name}-${cat._id}${path.parse(file.name).ext}`;

  // Save the image to the server and db (stored as path in db)
  file.mv(path.join(process.env.FILE_UPLOAD_PATH, file.name), async (err) => {
    if (err) {
      console.err(err);
      return new ErrorResponse('Problem with file upload', 500);
    }

    await Cat.findByIdAndUpdate(req.params.id, { photo: file.name });
  });

  res.status(201).send({
    success: true,
    data: cat
  });
});
