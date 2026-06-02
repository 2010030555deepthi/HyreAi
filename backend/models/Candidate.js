const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  skills: String,
  experience: Number,
  status: String
});

module.exports = mongoose.model(
  "Candidate",
  CandidateSchema
);