
$(document).ready(function() {
  // This is where the articles will be displayed
  const articleContainer = $(".article-container");
  
  // Click event listener to save headlines
  $(document).on("click", ".btn-save", saveArticle);
  // Click event listener to scrape fresh articles
  $(document).on("click", ".btn-scrape", handleArticleScrape);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  // Call function for layout page
  pageLoad();
  
  function pageLoad() {
    // Empty the container that holds the articles and run the AJAX req for new unsaved headlines
    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(function(data) {
      // Display articles in DOM if available
      console.log(data);

      if (data && data.length) {
        newArticles(data);
      }else {
        // No articles message will appear if none are available
        noNewArticles();
      }
    });
  };

  function newArticles(articles) {
    const articlePanels = [];
    // pass each JSON object to function createPanel 
    for (let i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
  
    // now we have createPanel HTML stored in array articlePanels
    // append each to main articleContainer
    articleContainer.append(articlePanels); 
  }
  
  function createPanel(article) {

    let panel = $(
        `<div id="${article._id}" class="panel panel-default panel-margin">
            <div id="headline-panel" class="panel-heading clearfix">
              <p class="panel-title align-middle">
                <a href="${article.url}" target="_blank">${article.title}</a>
              </p>
              <button type="button" class="btn btn-primary pull-right btn-save">Save Article</button>
            </div>
            <div class="panel-body">
              <div class="col-lg-2 col-md-2 col-sm-2 news-thumb" >
                <a href="${article.url}" target="_blank"><img width="200px" class="img-responsive img-thumbnail news-thumb" src="${article.imgUrl}" alt="${article.title}" /></a>
              </div> 
              <div class="col-lg-10 col-md-10 col-sm-10 summary-text">
                <p>${article.summary}</p>
              </div> 
            </div>
        </div>`
    );
    // Article id used to determine which article to save
    panel.data("_id", article._id);

    return panel;
  }
  
  function noNewArticles() {
    // Function for when new articles are not available
    const emptyAlert = $(
        `<div class='alert alert-info text-center'>
          <h4>Looks like we don't have any new articles.</h4>
        </div>
        <div class='panel panel-default'>
          <div class='panel-heading text-center'>
            <h3>What Would You Like To Do?</h3>
          </div>
        </div>`
    );
    // append alert data to main container
    articleContainer.append(emptyAlert);
  }
  
  function saveArticle() {
    // user saves an article
    // each article was saved with an id using .data method - retrieve it here
    let articleToSave = $(this) 
      .parents(".panel")
      .data();
    articleToSave.saved = true;

    // use put to update existing record and reload remaining articles page
    $.ajax({
      method: "PUT",
      url: `/api/headlines/${articleToSave._id}`,
      data: articleToSave
    }).then(function(data) {
      if(data.saved) {
        pageLoad();
      }
    });
  }
  
  function handleArticleScrape() {
    // scrape NPR, compare to articles already in db
    // re-render to DOM and alert user to number (if any) of new articles saved
    $.get("/api/fetch").then(function(data){
      pageLoad();
      bootbox.alert(`<h3 class='text-center m-top-80'>${ data.message }</h3>`)
    });
  }
});