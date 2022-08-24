const express = require("express");
const router = express.Router();

// const { isLoggedIn} = require("../middleware/route-guard");

const Post = require("../models/post.model");

router.get("/post-list", (req, res) => {
  Post.find()
    // .populate("owner")
    .then((posts) => {
      //const loggedInNavigation = req.session.hasOwnProperty("currentUser");
      res.render("posts/post-list", { posts });
    })
    .catch((err) => console.error(err));
});

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

router.get("/single-post/:postId", async (req, res) => {
  const {postId} =req.params;
  const foundPost = await Post.findById(postId)
res.render("posts/single-post", {foundPost}) 
})


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

/*
router.get("/single-post/:id", (req, res) => {
  // const loggedInNavigation = true;
  const id = req.params.id;
  Post.findById(id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("Result : ", docs);
    }
})
.then((posts) => {
  //const loggedInNavigation = req.session.hasOwnProperty("currentUser");
  res.render("posts/single-post", { posts });
})
.catch((err) => console.error(err));
});
  // .populate("owner")*/

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




  


// Reading the posts on the database

// Post.find(function(err, posts){
//   if(err){
//     console.log(err);
//   }else{
//     // console.log(posts)
//     posts.forEach(function(post){
//       console.log(post.title);
//     })
//   }
// });


//updating the posts on database

// Post.updateOne({_id:"63053eb422b41f5cd91a5c8a"}, {title: "itworked"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully updated the document.")
//   }
// })


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
