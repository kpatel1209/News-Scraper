const router = require("express").Router();

// Route renders the home handlebars page
router.get("/", function(req,res) {
  res.render("home");
});

// Route renders the saved handlebars page
router.get("/saved", function(req,res) {
  res.render("saved");
});

module.exports = router;