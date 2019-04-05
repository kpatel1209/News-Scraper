const db = require("../models");
const scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function(req,res) {
    return scrape()
      .then(function(articles) {
        return db.Headline.create(articles);
      })
      .then(function(dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: `No New Articles Currently Available.`
          });
        }
        else {
          res.json({
            message: `Added ${dbHeadline.length} New Articles.`
          });
        }
      })
      .catch(function(err) {
        res.json({
          message: `Articles Have Been Scraped!`
        });
      });
  }
};