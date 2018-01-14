var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err) {
         console.log(err);
         req.flash("error", "Campground not found");
         res.redirect("back");
       } else {
         if(foundCampground.author.id.equals(req.user.id)) {
           return next();
         } else {
           req.flash("error", "You don't have permission to do that");
           console.log("Current user is not the owner of this campground.");
           res.redirect("back");
         }
       }
    });
  } else {
    console.log("User is not logged in.");
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err) {
        console.log(err);
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user.id)) {
          return next();
        } else {
          req.flash("error", "You don't have permission to do that");
          console.log("Current user is not the owner of this comment.");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    console.log("User is not logged in.");
    res.redirect("back");
  }
};

module.exports = middlewareObj;