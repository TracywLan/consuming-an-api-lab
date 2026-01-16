const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");

// POST /users/:userId/favorites/:mediaId?title="batman"
router.post("/:userId/favorites/:mediaId", async (req, res) => {
  const movie = {
    imdbID: req.params.mediaId,
    title: req.query.title,
  };

  await User.findByIdAndUpdate(req.params.userId, {
    favoriteMovie: movie,
  });

  res.redirect(`/media/${req.params.mediaId}`);
});

// DELETE /users/:userId/favorites/:mediaId
router.delete("/:userId/favorites/:mediaId", async (req, res) => {
   console.log('DELETE route hit!', req.method, req.params);
    await User.findByIdAndUpdate(req.params.userId, {
    favoriteMovie: null,
  });

  res.redirect(`/media/${req.params.mediaId}`);
});

module.exports = router;
