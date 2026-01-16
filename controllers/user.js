const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");

// POST /users/:userId/favorites/:mediaId?title="batman"
router.post("/:userId/favorites/:mediaId", async (req, res) => {
  const movie = {
    imdbID: req.params.mediaId,
    title: req.query.title,
  };

  const user = await User.findByIdAndUpdate(
    req.params.userId, 
    { favoriteMovie: movie },
    { new: true }  // CRITICAL: returns updated document
  );

  req.session.user = user;

  res.redirect(`/media/${req.params.mediaId}`);
});

// DELETE /users/:userId/favorites/:mediaId
router.delete("/:userId/favorites/:mediaId", async (req, res) => {
  console.log('DELETE route hit!', req.method, req.params);
    
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { favoriteMovie: null },
    { new: true }
  );
  req.session.user = user;  
  res.redirect(`/media/${req.params.mediaId}`);
});

module.exports = router;
