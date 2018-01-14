var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

// /search
app.get("/", function(req, res){
  res.render("search");
});


// /result
app.get("/results", function(req, res){
  var query = req.query.search;
  var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);

      res.render("results", {data: data});
    }
  });
});


//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Daris is listening...");
});