const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/route-guard");
const { isOwner } = require("../middleware/route-guard");
const Post = require("../models/post.model");
const fileUploader = require("../config/cloudinary.config");

//CREATE POST

router.get("/create", (req, res) => {
  // const loggedInNavigation = true;
  res.render("posts/create-post");
});

router.post("/create", fileUploader.single("image"), (req, res) => {
// router.post("/create", (req, res) => {
  const { title, history  } = req.body;
  const { _id } = req.session.currentUser;
  // const { path } = req.file;
  console.log("user id", _id);
  console.log(req.file.path)
  Post.create({ title, history, imageUrl: req.file.path, owner: _id })
    .then((newPost) => {
      res.redirect("/auth/profile");
    })
    .catch((err) => console.error(err));
});


// SINGLE POST VIEW, TO LOGGED IN USERS

router.get("/single-post/:postId", isLoggedIn, async (req, res) => {
  const { postId } = req.params;
  const foundPost = await Post.findById(postId);
  const userId = req.session.currentUser._id;
  const checkCurrentUser = userId == foundPost.owner;
  res.render("posts/single-post", { foundPost, checkCurrentUser });
  console.log(foundPost);
});

// EDIT POST (IF CURRENT SESSION = USER)

router.get("/edit/:postId", async (req, res) => {
  const { postId } = req.params;
  const foundPost = await Post.findById(postId);
  res.render("posts/edit-post", { foundPost });
});

router.post("/edit/:postId", async (req, res) => {
  const { postId } = req.params;
  const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
    new: true,
  });
  console.log(updatedPost);
  res.redirect("/auth/profile");
});

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

module.exports = router;
