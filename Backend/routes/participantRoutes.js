const express = require("express");
const router = express.Router();
const ParticipantEvent = require("../utils/participantModal");

router.post("/users/events/participate", async (req, res) => {
  try {
    const { event, user, name } = req.body;
    if (!event || !user) {
      return res
        .status(400)
        .json({ message: "Event ID and User ID are required" });
    }

    const participantDetails = {
      name: name,
      // Add additional fields (paymentProofImage)
    };

    const participation = await ParticipantEvent.create({
      event: event,
      user: user,
      participantDetails: participantDetails,
    });

    res.status(201).json(participation);
  } catch (error) {
    console.error("Error recording participation:", error);
    res
      .status(500)
      .json({
        message: "Failed to record participation",
        error: error.message,
      });
  }
});

module.exports = router;
