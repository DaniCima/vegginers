const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get("/signup", (req, res) => {
    res.render("auth.views/signup");
  });
  router.get("/signup", (req, res) => {
    res.render("auth/signup");
  });

  router.post("/signup", (req, res) => {
    const { email, password } = req.body;
   
    bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          email,
          passwordHash: hashedPassword
        });
      })
      .then(userFromDB => {
         console.log('Newly created user is: ', userFromDB);
        res.redirect('/auth/profile');
      })
      .catch(error => console.log(error)); 
  })

  module.exports = router;