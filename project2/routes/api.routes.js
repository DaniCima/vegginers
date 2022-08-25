const express = require("express");
const router = express.Router();
const axios = require("axios");
const pizza = process.env.APP_ID;
const vegana = process.env.APP_KEY;

router.get("/random-recipe", (req, res) => {
  console.log(pizza, vegana);
  axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=vegan&app_id=${pizza}&app_key=${vegana}`
    )
    .then((response) => {
      // console.log(response.data.hits);
      //const randomIndex = Ma;

      const { recipe } = response.data.hits[0];
      console.log(recipe);

      res.render("posts/random-recipe", { recipe });

      // document.getElementById("recipe-title").innerText = recipeDetails;
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
