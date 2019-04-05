//controller - headlines
const db = require("../models");

module.exports = {
  // Find all headlines and sort by date and return
  findAll: function(req, res) {
    db.Headline
      .find(req.query)
      .sort({ date: -1 })
      .then(function(dbHeadline) {
        res.json(dbHeadline);
      })
      .catch(function(err) {res.json(err) })
  },
  // Find all notes attached to a specific headline id
  findOne: function(req, res) {
    db.Headline
    .findOne({ _id: req.params.id })
    .populate('note')
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    })
     .catch(function(err) {res.json(err) })
  },
  // Post new note atached to specific headline
  create: function(req,res) {
    db.Note
      .create(req.body)
      .then(function(dbNote) {
        return Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
      })
      .then(function(dbHeadline) {
        res.json(dbHeadline);
      })
      .catch(function(err) {res.json(err) })
  },

  // Delete a specific headline
  delete: function(req, res) {
    db.Headline.remove({ _id: req.params.id }).then(function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch(function(err) {res.json(err) })

  },
  // Update when headline is saved
  update: function(req, res) {
    db.Headline.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch(function(err) {res.json(err) })
  }
};