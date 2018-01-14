var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo", {useMongoClient: true});

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
  secret            : "DarisCalinor",
  resave            : false,
  saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
//ROUTES
//=====================

//register - shows a form
app.get("/register", function(req, res) {
   res.render("register");
});

//register - handling the form
app.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render("register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secret");
      });
    }
  });
});

//login - shows a form
app.get("/login", function(req, res) {
   res.render("login");
});

//login - logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(){
  console.log("Login successful!");
});

//logout
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//First Route
app.get("/", function(req, res){
  res.render("home");
});

//Secret Page
app.get("/secret", isLoggedIn, function(req, res){
  res.render("secret");
});

function isLoggedIn (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("login");
}

//Server starts to listen...
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Daris is listening for AuthDemo...");
});