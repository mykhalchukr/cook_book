const Recipe = require("../../models/Recipe");
const ChildRecipe = require("../../models/ChildRecipe");

const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const parentRecipes = await Recipe.find();
    const relatedRecipes = await ChildRecipe.find();
    const allRecipes = [
      ...parentRecipes,
      ...relatedRecipes,
    ].sort((first, second) => first.title.localeCompare(second.title));
    res.json(allRecipes);
  } catch (error) {
    res.status(500).json({ message: "Loading data error, please try again" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const newRecipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      description: req.body.description,
      image: req.body.image,
      directions: req.body.directions,
    });
    await newRecipe.save();
    res.status(201).json({ message: "Your recipe successfully added" });
  } catch (error) {
    res.status(500).json({ message: "Recipe was not added, please try again" });
  }
});

router.post("/new/:id", async (req, res) => {
  const forkedRecipe = req.body;

  try {
    const relatedRecipe = new ChildRecipe(forkedRecipe);
    await relatedRecipe.save();

    // ChildRecipe
    //   .findById(result._id)
    //   .populate("parent")
    //   .exec(function (err, recipe) {
    //     if (err) return handleError(err);
    //     console.log('The author is %s', recipe.title);
    // })
    res.status(201).json({ message: "Related recipe successfully added" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/recipe/:id", async (req, res) => {
  const id = req.params.id;
  const updData = req.body;
  try {
    await Recipe.findByIdAndUpdate(id, updData, (err, recipe) => {
      if (err) {
        return;
      }
    });
    res.json({ message: "Current recipe was updated" });
  } catch (error) {
    res.json({ message: "Error in data updating. Please, try again" });
  }
});

router.delete("/recipe/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Recipe.findById(id).remove();
    res.json({ message: "Removed" });
  } catch (error) {
    res.status(404).json({ message: "Recipe not found" });
  }
});

router.get("/recipe/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await Recipe.findById(id);
    const relatedRecipe = await ChildRecipe.findById(id);
    res.json(recipe || relatedRecipe);
  } catch (error) {
    res.status(404).json({ message: "Recipe not found" });
  }
});

module.exports = router;
