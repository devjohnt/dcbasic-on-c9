var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    middleware = require("../middleware/");

//INDEX - Show all campgrounds
router.get("/", function(req, res){
  Campground.find({}, function(err, campgrounds){
    if(err) {
      console.log("Something went wrong!");
      console.log(err);
    } else {
      res.render("./campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
    }
  });
});

//NEW - Show form to create new campgrounds
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("./campgrounds/new");
});

//SHOW - Show details about a campground
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
    if(err) {
      console.log("Something went wrong!");
      console.log(err);
    } else {
      res.render("./campgrounds/show", {campground: foundCamp});
    }
  });
});

//CREATE - Adding a new campgrounds to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //defining var for new campground with user id and username
    var newCampground = {
      name: req.body.campground.name,
      image: req.body.campground.image,
      description: req.body.campground.description,
      author: {id: req.user._id, username: req.user.username}
    };
    
    //create new campground on DB
    Campground.create(newCampground, function(err, newCampground){
    if(err) {
      console.log("Something went wrong!");
      console.log(err);
    } else {
      console.log("Data has been saved.");
      console.log(newCampground);
      res.redirect("/campgrounds");
    }
  });
});

//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.render("./campgrounds/edit", {campground: foundCampground});
    }
  });
});

//UPDATE
router.put("/:id/", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err) {
      console.log(err);
      res.redirect("/campgrounds/" + req.params.id + "/edit");
    } else {
      console.log("Campground has been updated:");
      console.log(req.body.campground);
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      console.log("Selected campground has been deleted:");
      console.log(deletedCampground);
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;