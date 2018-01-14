var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
});

app.get("/loveher/:herName", function(req, res){
  var herName = req.params.herName.toLowerCase();
  res.render("loveHer", {herName: herName});
});

app.get("/posts", function(req, res) {
   var posts = [
     {title: "title1", author: "author1"},
     {title: "title2", author: "author2"},
     {title: "title3", author: "author3"},
     ];
     
     res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Daris is listening...");
});