const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const Event = require('../utils/aeventModal');
const Gallery = require('../utils/galleryModal');

// Admin Event Routes
router.get('/admin/events', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

router.post('/admin/events', verifyToken, verifyAdmin, async (req, res) => {
  const { title, description, imageUrl, rulebookUrl } = req.body;
  try {
    const newEvent = await Event.create({ title, description, imageUrl, rulebookUrl });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event' });
  }
});

router.put('/admin/events/:eventId', verifyToken, verifyAdmin, async (req, res) => {
  const { eventId } = req.params;
  const { title, description, imageUrl, rulebookUrl } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, { title, description, imageUrl, rulebookUrl }, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event' });
  }
});

router.delete('/admin/events/:eventId', verifyToken, verifyAdmin, async (req, res) => {
  const { eventId } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
});

// Admin Gallery Routes
router.get('/admin/gallery', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/gallery', verifyToken, verifyAdmin, async (req, res) => {
  const { imageUrl, title } = req.body;
  try {
    const newImage = await Gallery.create({ imageUrl, title });
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/admin/gallery/:id', verifyToken, verifyAdmin, async (req, res) => {
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

router.delete('/admin/gallery/:id', verifyToken, verifyAdmin, async (req, res) => {
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
