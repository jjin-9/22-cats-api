require('colors');
const dotenv = require('dotenv');
const express = require('express');

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Body parser
app.use(express.json());

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow
  );
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit());
});
