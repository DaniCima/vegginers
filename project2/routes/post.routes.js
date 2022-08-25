const express = require("express");
const router = express.Router();
const { isLoggedIn} = require("../middleware/route-guard");
const { isOwner } = require("../middleware/route-guard");
const Post = require("../models/post.model");


//CREATE POST

router.get("/create", (req, res) => {
  // const loggedInNavigation = true;
  res.render("posts/create-post");
});

router.post("/create", (req, res) => {
  const { title, history, imageUrl } = req.body;
  const { _id } = req.session.currentUser;
  console.log("user id", _id);
  Post.create({ title, history, imageUrl, owner: _id })
    .then((newPost) => {
      res.redirect("/auth/profile");
    })
    .catch((err) => console.error(err));
});


// SINGLE POST VIEW, TO LOGGED IN USERS

router.get("/single-post/:postId", isLoggedIn, async (req, res) => {
  const {postId} =req.params;
  const foundPost = await Post.findById(postId)
  const userId = req.session.currentUser._id 
  const checkCurrentUser = userId == foundPost.owner
res.render("posts/single-post", {foundPost, checkCurrentUser}) 
console.log(foundPost)
})

// EDIT POST (IF CURRENT SESSION = USER)

router.get("/edit/:postId", async (req, res)=>{
  const {postId} =req.params;
  const foundPost = await Post.findById(postId)
  res.render("posts/edit-post", {foundPost}) 
})


router.post("/edit/:postId", async(req, res)=>{
  const {postId} = req.params;
  const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {new: true})
console.log(updatedPost);
res.redirect("/auth/profile")
})


//DELETE POST (IF CURRENT SESSION = USER)

router.get("/delete/:postID", isLoggedIn,  function(req, res){
  const {postID} = req.params;
  
  Post.findByIdAndDelete(postID)
  .then(function(){
  res.redirect("/auth/profile")
  }) 
  .catch(function(err){
    console.log(err)
  })
  
  
  })




  








router.get("/delete/:postID", function(req, res){
const {postID} = req.params;

Post.findByIdAndDelete(postID)
.then(function(){
res.redirect("/auth/profile")
}) 
.catch(function(err){
  console.log(err)
})


})











// router.get("/posts/:postID/edit-post", (req, res, next)=>{
//   const { postID } = req.params;

// Post.findById(postID)
// .then(postToEdit => {
//   console.log(postToEdit);
//   res.render('posts/edit-post.hbs', { Post: postToEdit });
//     })

//     .catch(error => next(error));
// });


module.exports = router;
