const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageURL: String
});

module.exports = mongoose.model("Card", CardSchema);
