const express = require("express");
const router = express.Router();
const Registration = require("../utils/registrationModal");

router.post("/events/:id/register", async (req, res) => {
  const { id } = req.params;
  const { teamName, teamLeadName, email, member1, member2, member3, member4 } =
    req.body;

  if (!teamName || !teamLeadName || !email) {
    return res
      .status(400)
      .send({ message: "TeamName, TeamLeadName and email are required" });
  }

  const registration = new Registration({
    eventId: id,
    teamName,
    teamLeadName,
    email,
    member1,
    member2,
    member3,
    member4,
  });

  try {
    await registration.save();
    res.status(201).send({ message: "Registration successful" });
  } catch (error) {
    res.status(500).send({ message: "Error registering for event", error });
  }
});

router.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).send(registrations);
  } catch (error) {
    res.status(500).send({ message: "Error fetching registrations", error });
  }
});

module.exports = router;
