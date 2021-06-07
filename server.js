require('colors');
const dotenv = require('dotenv');
const express = require('express');

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow
  );
});
