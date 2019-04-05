$(document).ready(function () {
  
  let t = 0;
  let text = "Scraping the News";
  let speed = 65;
  typeWriter();

  // Typewriter effect for "Scraping the News" when page loads
  function typeWriter() {    
    if (t < text.length) {
      document.getElementById("scraping").innerHTML += text.charAt(t);
      t++;
      setTimeout(typeWriter, speed);
    }
  }
});