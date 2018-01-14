var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useMongoClient: true});

var User = require("./models/user.js");
var Post = require("./models/post.js");

// //Getting all post associated to a user
// User.findOne({email: "simin@mete.com"}).populate("posts").exec(function(err, user){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });


//Create post associated to a user
Post.create({
  title   : "Post to a USER PT4",
  content : "REFERENCING THROUGH THE WORLD!"
}, function(err, post){
  if(err) {
    console.log(err);
  } else {
    User.findOne({email: "simin@mete.com"}, function(err, foundUser){
      if(err) {
        console.log(err);
      } else {
        foundUser.posts.push(post);
        foundUser.save(function(err, data){
          if(err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});


// //First User
// User.create({
//   email : "simin@mete.com",
//   name  : "Simin Mete"
// }, function(err, user){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(user);  
//   }
// })