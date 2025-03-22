require('dotenv').config();
const tvSeriesRouter = require('express').Router();
const passport = require('passport');

module.exports = tvSeriesRouter;

const { TVBookmark } = require('../models/TV');
const { Schema } = require('mongoose');

tvSeriesRouter.post('/bookmark/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {

  try {

    const tv_series_id = req.params.id;

    const query = TVBookmark.findOneAndUpdate(
      {
        "tv_series_id": tv_series_id,
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


tvSeriesRouter.get('/bookmarks', passport.authenticate('jwt', { session: false }), async (req, res) => {

  try {
    const query = TVBookmark.find(
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
