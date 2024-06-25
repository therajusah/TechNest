const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    additionalInfo: { type: String },
});

module.exports = mongoose.model("Event", eventSchema);
