const Recipe = require("../../models/Recipe");

const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ title: 1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Loading data error, please try again" });
  }
});

router.post("/new", async (req, res) => {
  const data = req.body;

  try {
    const newRecipe = new Recipe(data);
    await newRecipe.save();
    res.status(201).json({ message: "Your recipe successfully added" });
  } catch (error) {
    res.status(500).json({ message: "Recipe was not added, please try again" });
  }
});

router.post("/new/:id", async (req, res) => {
  const forkedRecipe = req.body;

  try {
    const relatedRecipe = new Recipe(forkedRecipe);
    await relatedRecipe.save();
    res.status(201).json({ message: "Related recipe successfully added" });
  } catch (error) {
    res.status(500).json({ message: "Related recipe wasn't added" });
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
    const relatedRecipes = await Recipe.where({ parent: id });

    res.json({ recipe, relatedRecipes });
  } catch (error) {
    res.status(404).json({ message: "Recipe not found" });
  }
});

module.exports = router;
