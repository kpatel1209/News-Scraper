// Require dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");

// Set PORT to be either the host's designated port or 8080
const PORT = process.env.PORT || 8080;

// Initialize Express App
const app = express();

// Use Morgan logger for logging requests
app.use(logger('dev'));

// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Require Routes
const routes = require("./routes");

// All requests go through routes
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to Mongo DB
// mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Listen on the PORT
app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});