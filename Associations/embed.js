var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient: true});

//POST - title, content
var postSchema = mongoose.Schema({
  title   : String,
  content : String
});
var Post = mongoose.model("Post", postSchema);

//USER - email, name, posts
var userSchema = new mongoose.Schema({
  email : String,
  name  : String,
  posts : [postSchema]
});
var User = mongoose.model("User", userSchema);

// //First data on User
// var newUser = new User({
//   email : "charlie@brown.edu",
//   name  : "Charlie Brown"
// });
// newUser.save(function(err, user){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// //First data on Post
// var newPost = new Post({
//   title   : "Reflections on Apple",
//   content : "They are delicious"
// });
// newPost.save(function(err, post){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

// //Hermione Granger
// var newUser = new User({
//   email : "hermione@hogwarts.edu",
//   name  : "Hermione Granger"
// });
// newUser.posts.push({
//   title   : "How to brew a polyjuice potion?",
//   content : "Just kidding. Go to potion-making class"
// });
// newUser.save(function(err, user){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// //Find Hermione and add a post
// User.findOne({name: "Hermione Granger"}, function(err, user){
//   if(err) {
//     console.log(err);
//   } else {
//     user.posts.push({
//       title   : "3 things I really hate!",
//       content : "Voldemort. Voldemort. Voldemort."});
//   }
//   user.save(function(err, user){
//     if(err) {
//       console.log(err);
//     } else {
//       console.log(user);
//     }
//   });
// })