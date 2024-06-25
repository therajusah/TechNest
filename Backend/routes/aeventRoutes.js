const express = require("express");
const router = express.Router();
const Event = require("../utils/aeventModal");

router.post("/admin/events", async (req, res) => {
  try {
    const { title, description, additionalInfo } = req.body;
    const newEvent = await Event.create({ title, description, additionalInfo });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
});

router.put("/admin/events/:eventId", async (req, res) => {
  try {
    const { title, description, additionalInfo } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      { title, description, additionalInfo },
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
