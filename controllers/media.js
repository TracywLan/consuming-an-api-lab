const express = require("express");
const router = express.Router({ mergeParams: true });
const dbUrl = process.env.OMDB_URI;
const User = require('../models/user')

// GET /media/:mediaId
router.get("/:mediaId", async (req, res) => {
  const response = await fetch(`${dbUrl}i=${req.params.mediaId}`);
  const item = await response.json();

  let user = null;
  let isUsersFavorite = false;

  if (req.session.user && req.session.user._id) {
    user = await User.findById(req.session.user._id);
    if (user) {
      isUsersFavorite = user.favoriteMovie?.imdbID === req.params.mediaId;
    }
  }
  res.render('media/show.ejs', { item, isUsersFavorite, user: req.session.user })
});

// POST /media/search
router.post("/search", async (req, res) => {
  const response = await fetch(`${dbUrl}s=${req.body.searchTerm}`);
  const data = await response.json();
  res.render("media/searchResults.ejs", { media: data.Search });
});

module.exports = router;
