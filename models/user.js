const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    imdbID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteMovie: movieSchema
});

const User = mongoose.model("User", userSchema);

userSchema.pre("save", function (next) {
  const docToBeSaved = this;
  if (docToBeSaved.username) {
    docToBeSaved.username =
      docToBeSaved.username[0].toUpperCase() + docToBeSaved.username.slice(1);
  }
  next();
});

module.exports = User;
