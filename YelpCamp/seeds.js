//Setup
var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

//Seed campgrounds
var data = [
  {
    name        : "Forest",
    image       : "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg",
    description : "Camping in forest! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name        : "Mountain",
    image       : "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
    description : "Camping in mountain! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name        : "Fish Eye",
    image       : "https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg",
    description : "Camping in fish eyed forest! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

//seedDB - Clear all campgrounds from DB and add seed campgrounds
function seedDB(){
  Campground.remove({}, function(err){
    if(err) {
      console.log("Something went wrong with removing all campgrounds.");
      console.log(err);
    } else {
      console.log("All campgrounds have been removed from database.");
      data.forEach(function(data){
        Campground.create(data, function(err, seedCampground){
          if(err) {
            console.log("Something went wrong with adding seed campgrounds.");
            console.log(err);
          } else {
            console.log("Seed campground has been added.");
            Comment.create({
              text    : "Seed comment for this campground.",
              author  : "John"
            }, function(err, seedComment){
              if(err) {
                console.log("Something went wrong with adding seed comments.");
                console.log(err);
              } else {
                seedCampground.comments.push(seedComment);
                seedCampground.save();
                console.log("Seed comment has been added.");
              }
            });
          }
        });
      });
    }
  });
}

//Export seedDB
module.exports = seedDB;