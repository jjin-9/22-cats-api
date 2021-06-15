const path = require('path');

const Cat = require('../models/Cat');
const Photo = require('../models/Photo');

const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc      Upload photo
// @route     Post /api/v1/cats/:catId/photos
// @access    Private
exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  let cat = await Cat.findById(req.params.catId);

  if (!cat) {
    return next(
      new ErrorResponse(`Cat not found with id of ${req.params.catId}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse('Please upload an image', 400));
  }

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

  const photo = await Photo.create({
    cat: req.params.catId
  });

  // Create unique custom file name
  file.name = `${cat.name.replace(/-/g, '_').toLowerCase()}_${photo._id}${
    path.parse(file.name).ext
  }`;

  // Save the image to the server and db (stored as path in db)
  file.mv(path.join(process.env.FILE_UPLOAD_PATH, file.name), async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with file upload', 500));
    }

    photo.name = file.name;
    // TODO: don't hardcode it
    photo.fullName = `http://localhost:5000/images/${file.name}`;

    await photo.save();

    res.status(201).send({
      success: true,
      data: photo
    });
  });
});

// @desc      Get All Photos
// @route     Get /api/v1/photos
// @access    Public
exports.getPhotos = asyncHandler(async (req, res, next) => {
  const photos = await Photo.find();

  res.status(200).send({
    success: true,
    count: res.results.length,
    data: res.results
  });
});
