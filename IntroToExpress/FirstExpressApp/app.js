var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
  res.send("Hi there!");
});
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
  res.send("Goodbye!");
});
// "/dog" => "Meow"
app.get("/dog", function(req, res){
  res.send("Meow!");
  console.log("Someone made a req to /dog");
});

// "*" route
app.get("*", function(req, res) {
  res.send("You are a STAR!");
});

//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server has started!");
});