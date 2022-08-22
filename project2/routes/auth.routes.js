const router = require("express").Router();
const User = require('../models/User.model');

router.get("/signup", (req, res) => {
    res.render("auth.views/signup");
  });

  module.exports = router;