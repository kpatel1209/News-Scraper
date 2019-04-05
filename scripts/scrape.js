const axios = require("axios");
const cheerio = require("cheerio");

const scrape = function() {

  // NPR is the site we will be scraping from
  return axios.get("https://www.npr.org/sections/news/")
    .then(res => {
      const $ = cheerio.load(res.data);
      
      // Define empty array to hold scraped articles
      const articles = [];
    
    // For each element article.item
    $("article.item").each((i, element) => {
      // Save data of each link enclosed in the current element
      let title = $(element).find(".title").find("a").text().trim();
      let url = $(element).find(".title").find("a").attr("href");
      let summary = $(element).find(".teaser").find("a").text().trim();
      let imgUrl = $(element).find("a").find("img").attr("src");

      // If this found element contains all the data I need
      if (title && url && summary && imgUrl) {

        //Remove extra lines/spaces
        let titleClean = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        let summaryClean = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Insert the data in the Headline collection
        let dataToAdd = {
          title: titleClean,
          url: url,
          summary: summaryClean,
          imgUrl: imgUrl
        };
       
        // Push each article into the article array defined above
        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

module.exports = scrape;

