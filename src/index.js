const dotenv = require('dotenv');
dotenv.config();

// DB Connection
require("./models/db");

// Import dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('./config/morgan');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const { userRouter } = require('./apis/user');
const MESSAGES = require('./utils/constants');
const movieRouter = require('./apis/movie');
const tvSeriesRouter = require('./apis/tv-series');
// const { User } = require('./models/User');

// Create an Express app
const app = express();

// // Passport.js middleware
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Logging
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

app.use('/user', userRouter);
app.use('/movie', movieRouter);
app.use('/tv', tvSeriesRouter);


// This will help the user to not get lost on unhandled routes.
app.use('*', (req,res) => {
  res.redirect("/");
})

// Start the Express app
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
