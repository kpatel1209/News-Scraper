const db = require("../models");

module.exports = {
  // Find all notes by id
  findAll: function(req,res) {
    db.Note
      .find({ article: req.params.id })
      .then(function(dbNote) {
        res.json(dbNote);
      })
      .catch(function(err) {res.json(err) })
  },
  // Delete a note by id
  delete: function(req,res) {
    db.Note
      .remove({ _id: req.params.id })
      .then(function(dbNote) {
        res.json(dbNote);
      })
      .catch(function(err) {res.json(err) })
  }
};