//Inital variables for npms
var express       = require("express"),
    app           = express(),
    bodyParser    = require('body-parser'),
    flash         = require("connect-flash"),
    methodOverride = require("method-override"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local");

//Requiring DB models and seeds
var User        = require("./models/user"),
    seedDB      = require("./seeds.js");

//Requiring routes
var indexRoutes = require("./routes/index"),
    campgroundsRoutes = require("./routes/campgrounds"),
    commentsRoutes    = require("./routes/comments");

//Settings of npms and database
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static(__dirname + "/public"));

//Seeding DB
// seedDB();

//Passport Config
app.use(require("express-session")({
  secret            : "Daris made it again.",
  resave            : false,
  saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//RESTful Routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

//Server starts to listen
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Daris is listening for YelpCamp...");
})