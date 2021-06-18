const path = require('path');
const { findByIdAndUpdate } = require('../models/Cat');

const Cat = require('../models/Cat');
const Photo = require('../models/Photo');

const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc      Upload photo
// @route     Post /api/v1/photos
// @access    Private
exports.uploadPhoto = asyncHandler(async (req, res, next) => {
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

  let photo = await Photo.create({ catName: req.body.catName });

  // Create unique custom file name
  file.name = `${photo.catName.replace(/-/g, '_').toLowerCase()}_${photo._id}${
    path.parse(file.name).ext
  }`;

  // Save the image to the server and db
  file.mv(path.join(process.env.FILE_UPLOAD_PATH, file.name), async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with file upload', 500));
    }

    photo = await Photo.findByIdAndUpdate(
      photo._id,
      { name: file.name },
      {
        new: true
      }
    );

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
  res.results.map((photo) => {
    photo.url = `${process.env.IMAGE_PATH}/${photo.name}`;
    photo.name = undefined;
    photo['__v'] = undefined;
    return photo;
  });
  res.status(200).send({
    success: true,
    count: res.results.length,
    data: res.results
  });
});
