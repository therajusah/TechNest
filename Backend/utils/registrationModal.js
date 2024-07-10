const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  teamLeadName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  member1: {
    type: String,
    default: "",
  },
  member2: {
    type: String,
    default: "",
  },
  member3: {
    type: String,
    default: "",
  },
  member4: {
    type: String,
    default: "",
  },
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
