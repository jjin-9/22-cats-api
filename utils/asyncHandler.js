const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn()).catch(next);
};

module.exports = asyncHandler;
