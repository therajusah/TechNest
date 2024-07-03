const express = require("express");
const router = express.Router();
const Event = require("../utils/aeventModal");

router.post("/admin/events", async (req, res) => {
  try {
    const { title, description, imageUrl, rulebookUrl } = req.body;
    const newEvent = await Event.create({ title, description, imageUrl, rulebookUrl });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
});

router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

router.get("/events/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Failed to fetch event" });
  }
});

router.put("/admin/events/:eventId", async (req, res) => {
  try {
    const { title, description, imageUrl, rulebookUrl } = req.body;
    const updatedFields = { title, description, imageUrl, rulebookUrl };
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      updatedFields,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
});

router.delete("/admin/events/:eventId", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

module.exports = router;
