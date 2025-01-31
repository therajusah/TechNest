const express = require("express");
const router = express.Router();
const Gallery = require("../utils/galleryModal");


router.get("/admin/gallery", async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/admin/gallery", async (req, res) => {
  const { imageUrl, title } = req.body;
  
  try {
    const newImage = await Gallery.create({ imageUrl, title });
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/admin/gallery/:id", async (req, res) => {
  const { id } = req.params;
  const { imageUrl, title } = req.body;

  try {
    const updatedImage = await Gallery.findByIdAndUpdate(id, { imageUrl, title }, { new: true });
    
    if (!updatedImage) {
      return res.status(404).json({ message: `Image with ID ${id} not found` });
    }
    
    res.json(updatedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/admin/gallery/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedImage = await Gallery.findByIdAndDelete(id);
    
    if (!deletedImage) {
      return res.status(404).json({ message: `Image with ID ${id} not found` });
    }
    
    res.json({ message: `Image with ID ${id} deleted successfully` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
