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
      res.redirect("/posts/post-list");
    })
    .catch((err) => console.error(err));
});

module.exports = router;
