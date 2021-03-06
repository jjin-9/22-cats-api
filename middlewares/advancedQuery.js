const advancedQuery = (model, populate, select) => async (req, res, next) => {
  let query = { ...req.query };

  ['select', 'sort', 'page', 'limit'].forEach((param) => delete query[param]);

  const stringifiedQuery = JSON.stringify(query).replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(stringifiedQuery));

  // Select fields
  if (select) {
    query = query.select(select);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Populate
  if (populate) {
    query = query.populate(populate);
  }

  res.results = await query;

  next();
};

module.exports = advancedQuery;
