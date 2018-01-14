var mongoose = require("mongoose");
var Campground = require("../models/campground");

//Remove all campgrounds from DB

function seedDB(){
  Campground.remove({}, function(err){
    if(err) {
      console.log(err);
    } else {
      console.log("All campgrounds have been removed from database.");
    }
  });
}

seedDB();
//module.exports = seedDB;