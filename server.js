require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/db');
const authRouter = require('./routers/auth');
const catRouter = require('./routers/cats');
const photoRouter = require('./routers/photos');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// File upload
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cats', catRouter);
app.use('/api/v1/photos', photoRouter);

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
