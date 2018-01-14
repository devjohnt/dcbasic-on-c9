//createdByDarisCalinor

// NPMs
var mongoose        = require("mongoose"),
    methodOverride  = require ("method-override"),
    bodyParser      = require("body-parser"),
    expressSanitizer = require('express-sanitizer'),
    express         = require("express"),
    app             = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app",
  {useMongoClient: true}
);
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static("public"));
app.set("view engine", "ejs");

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1504387432042-8aca549e4729?auto=format&fit=crop&w=1534&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
//   body: "Eat prosper and safe!"
// });

//RESTFUL ROUTES

// "/" - redirects to INDEX
app.get("/", function(req, res){
  res.redirect("/blogs");
});

//INDEX - list all blogs
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err) {
      console.log("ERROR!");
      console.log(err);
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});

//NEW - New blog post form
app.get("/blogs/new", function(req, res){
  res.render("new");
});

//CREATE - Adding new blog to DB and redirect to /blogs
app.post("/blogs", function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newPost){
    if(err) {
      console.log("ERROR!");
      console.log(err);
      res.redirect("/blogs/new");
    } else {
      console.log("Blog post has been successfully saved.")
      console.log(newPost);
      res.redirect("/blogs");
    }
  });
});

//SHOW - Showing particular blog post
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundPost){
    if(err) {
      console.log("ERROR!");
      console.log(err);
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundPost});
    }
  });
});

//EDIT - Show form to edit an existing blog post
app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundPost){
    if(err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", {blog: foundPost});
    }
  });
});

//UPDATE
app.put("/blogs/:id", function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedPost){
    if(err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      console.log("Blog post has been successfully updated.");
      console.log(updatedPost);
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

//DESTROY
app.delete("/blogs/:id", function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/blogs/" + req.params.id);
    } else {
      console.log("Blog post has been successfully deleted from DB.");
      res.redirect("/blogs");
    }
  });
});


//Server starts to listen
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Daris is listening for RESTful Blog App...");
});