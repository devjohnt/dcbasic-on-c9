var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware");

//NEW - Show form to create new comments
router.get("/new", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log("Something went wrong!");
      console.log(err);
    } else {
      res.render("./comments/new", {campground: campground});
    }
  });
});

//CREATE - Adding a new comments to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  //lookup campground using ID
  Campground.findById(req.params.id, function(err, campground) {
      if(err) {
        console.log("Something went wrong!");
        console.log(err);
      } else {
        //create new comment
        Comment.create(req.body.comment, function(err, newComment){
          if(err) {
            req.flash("error", "Something went wrong");
            console.log("Something went wrong!");
            console.log(err);
          } else {
            console.log("Comment has been successufully saved.");
            //add username and id to newComment
            newComment.author.id        = req.user._id;
            newComment.author.username  = req.user.username;
            //save comment
            newComment.save();
            //connect new comment to campground
            campground.comments.push(newComment);
            campground.save();
            //redirect to campground show page
            req.flash("success", "Successfully added comment");
            res.redirect("/campgrounds/" + campground._id);
          }
        });
      }
  });
});

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment) {
      if(err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.render("./comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
  });
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log("The comment has been updated.");
      console.log(updatedComment);
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment){
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log("Comment has been deleted.");
      console.log(deletedComment);
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;