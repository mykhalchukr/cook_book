import React, { useEffect, useCallback } from "react";
import cn from "classnames";
import { Recipe } from "../Recipe/Recipe";
import { NoRecipes } from "../NoRecipes/NoRecipes";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../../store/recipes";
import "./Recipes.scss";

export const Recipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  const getRecipes = useCallback(async () => {
    const response = await fetch("/api/recipes");
    const data = await response.json();
    dispatch(setRecipes(data));
  }, [dispatch]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return (
    <main
      className={cn("container", {
        main: recipes.length !== 0,
        "main-empty": recipes.length === 0,
      })}
    >
      {recipes.length === 0 && <NoRecipes />}
      {recipes.map((recipe) => (
        <Recipe fullRecipe={recipe} key={recipe._id} />
      ))}
    </main>
  );
};
