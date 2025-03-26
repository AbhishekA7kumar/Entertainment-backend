require('dotenv').config();
const movieRouter = require('express').Router();
const passport = require('passport');
const { MovieBookmark } = require('../models/Movie');
const { Schema } = require('mongoose');

module.exports = movieRouter;



movieRouter.post('/bookmark/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {

  try {

    const movie_id = req.params.id;

    const query = MovieBookmark.findOneAndUpdate(
      {
        "movie_id": movie_id,
        "user_id": req.user._id
      },
      {
        $set: {
          "bookmark": !!req.body.bookmark
        }
      },
      {
        new: true,
        upsert: true
      });

    const result = await query.exec();
    res.status(201).send(result);

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }

});

movieRouter.get('/bookmarks', passport.authenticate('jwt', { session: false }), async (req, res) => {

  try {

    console.log("Authenticated User: ", req.user);
    const query = MovieBookmark.find(
      {
        "user_id": req.user._id,
        "bookmark": true,
      });

    const result = await query.exec();
    res.status(200).send(result);

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }

});
