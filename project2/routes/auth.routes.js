const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {isLoggedIn, isLoggedOut} = require("../middleware/route-guard")

router.get("/signup", isLoggedOut, (req, res) => {
  console.log(req.session)
    res.render("auth.views/signup");
  });
  router.post("/signup", isLoggedOut, (req, res) => {
    const { username, email, password } = req.body;
   
    bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
        username,
        email,
        passwordHash: hashedPassword
        });
      })
      .then(userFromDB => {
         console.log('Newly created user is: ', userFromDB);
        res.redirect('/auth/login');
      })
      .catch(error => console.log(error)); 
  })

  router.get("/profile", isLoggedIn, (req, res) => {
    //console.log('profile page', req.session);
    //const { username } = req.session.currentUser;
      res.render("auth.views/profile");
  });
  
  router.get("/login", isLoggedOut, (req, res) => {
     //console.log('req session', req.session);
     res.render("auth.views/login");
  });
  
  router.post("/login", isLoggedOut, (req, res) => {
    const { username, email, password } = req.body;
    console.log("req sessiooon", req.session)

   // Check for empty fields
    if (username === '' || password === ''|| email === '') {
      res.render('auth.views/login', {
        errorMessage: 'Please username and password to login.'
      });
      return;
    }

    User.findOne({ username })
    .then(user => {
      if (!user) {
        res.render('auth.views/login', { errorMessage: 'Username is not registered.' });
        return;
      } else if (bcrypt.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.render('auth.views/profile', user);
      } else {
        res.render('auth.views/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(err => console.log(err))
});

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/auth/login');
    });
  });
  module.exports = router;