const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");
const Post = require("../models/post.model");

router.get("/signup", (req, res) => {
  //console.log(""req.session);
  res.render("auth/signup");
});
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  console.log("**********",req.body)
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword,
      });
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

router.get("/profile", isLoggedIn, async(req, res) => {
  const { username } = req.session.currentUser;
  const allPosts= await Post.find()
  res.render("auth/profile", {username, allPosts});
  
});

/*router.get("/login", isLoggedOut, (req, res) => {
  //console.log('req session', req.session);
  res.redirect("/");
});*/

router.post("/login", (req, res) => {
  const { username, email, password } = req.body;
  //console.log("req sessiooon", req.session);

  // Check for empty fields
  if (username === "" || password === "" || email === "") {
    res.render("auth/login", {
      errorMessage: "Please username and password to login.",
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Username is not registered.",
        });
        return;
      } else if (bcrypt.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect("/auth/profile");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
