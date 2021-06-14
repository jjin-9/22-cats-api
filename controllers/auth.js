const User = require('../models/User');

const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc      Register a user
// @route     Post /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    email: req.body.email,
    password: req.body.password
  });

  const token = user.getJwtToken();

  res.status(201).send({
    success: true,
    token
  });
});

// @desc      Login a user
// @route     Post /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }

  // Check passwords match
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }

  const token = user.getJwtToken();

  res.status(200).send({
    success: true,
    token
  });
});
