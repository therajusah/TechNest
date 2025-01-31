const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Gallery', gallerySchema);
