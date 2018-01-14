var express = require("express");
var app = express();

//First route
app.get("/", function(req, res){
  res.send("Hi there, welcome to my assignment!");
});

//Second route
app.get("/speak/:animal", function(req, res){
  var animal = req.params.animal;
  var animalSays = {
    pig: "Oing!",
    dog: "Woof Woof!",
    cow: "Moo!",
    cat: "Meow!",
    fox: "Ai-ai-ai-oOo!"
  };
  //The phrase
  res.send("The " + animal + " says " + animalSays[animal]);
});

//Third route
app.get("/repeat/:word/:number", function(req, res) {
    
  var word = req.params.word;
  var number = Number(req.params.number);
  var result = "";
  
  //The phrase
  for(var i = 0; i < number; i++) {
    result += word + " ";
  }

  res.send(result);
});

//Any other route
app.get("*", function(req, res){
  res.send("Sorry, page not found... What are you doing with your life?");
});

//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server has started!");
});