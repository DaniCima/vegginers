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

  

module.exports = router;
