
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const participantEventSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participantDetails: [participantSchema],
});

module.exports = mongoose.model("ParticipantEvent", participantEventSchema);
