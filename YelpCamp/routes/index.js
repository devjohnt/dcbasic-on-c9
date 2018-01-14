var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    passport  = require("passport"),
    User      = require("../models/user");

//===================================
//INDEX ROUTES
//===================================

//Landing Page
router.get("/", function(req, res){
  res.render("landing");
});

//===================================
//AUTH ROUTES
//===================================

//Register - show form
router.get("/register", function(req, res){
  res.render("register");
});

//Register - handling the sign up logic
router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      req.flash("error", err.message);
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

//Login - show login form
router.get("/login", function(req, res) {
  res.render("login", {message: req.flash("error")});
});

//Login - handling the login logic
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(){
  console.log("Login successful!");
});

//Logout - handling the logout logic
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});

module.exports = router;