const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new headlineSchema object
const headlineSchema = new Schema({
  title: {
    type: String,
    unique: { index: { unique: true } },
    required: true
  },
  url: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },

  // This allows us to populate the Headline with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema using mongoose's model method
const Headline = mongoose.model("Headline", headlineSchema);

// Export the Headline model
module.exports = Headline;