const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String },
    position: { type: String },
    status: {
      type: String,
      enum: ["Playing", "Not Playing", "Undecided"],
      default: "Undecided",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
