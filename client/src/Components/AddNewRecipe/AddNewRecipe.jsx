import React, { useEffect, useCallback } from "react";
import "./AddNewRecipes.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setRecipeTitle } from "../../store/recipeTitle";
import { setDirections } from "../../store/directions";
import { setImage } from "../../store/image";
import { setIngredients } from "../../store/ingredients";
import { setDescription } from "../../store/description";

export const AddNewRecipe = () => {
  const title = useSelector((state) => state.recipeName);
  const directions = useSelector((state) => state.recipeDirections);
  const ingredients = useSelector((state) => state.recipeIngredients);
  const description = useSelector((state) => state.recipeDescription);
  const image = useSelector((state) => state.recipeImage);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); 

  const clearFields = useCallback(() => {
    dispatch(setRecipeTitle(""));
    dispatch(setDirections(""));
    dispatch(setImage(""));
    dispatch(setIngredients(""));
    dispatch(setDescription(""));
  }, [dispatch]);

  useEffect(() => {
    
    return () => {
      clearFields();
    };
  }, [clearFields]);

  const handleInput = (event, handler) => {
    const { value } = event.target;
    dispatch(handler(value));
  };

  const sendTheRecipe = async (recipe) => {
    const URL = id ? `/api/recipes/new/${id}` : "/api/recipes/new"
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(recipe),
      });
      const info = await response.json();
      alert(info.message);
      history.push("/");
    } catch (error) {
      alert(error.message);
      history.push("/");
    }
    clearFields();
  };

  return (
    <main className="main-recipe-details container">
      <fieldset>
        <legend>Add New Recipe</legend>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const recipe = {
              title,
              ingredients,
              description,
              image,
              directions,
            };
            sendTheRecipe(recipe);
          }}
        >
          <label>
            Recipe Name
            <input
              value={title}
              required
              minLength="6"
              onChange={(e) => {
                handleInput(e, setRecipeTitle);
              }}
            />
          </label>
          <label>
            Image URL
            <input
              value={image}
              minLength="6"
              required
              type="url"
              onChange={(e) => {
                handleInput(e, setImage);
              }}
            />
          </label>
          <label>
            Ingredients
            <textarea
              value={ingredients}
              cols="30"
              rows="10"
              minLength="6"
              required
              onChange={(e) => {
                handleInput(e, setIngredients);
              }}
            ></textarea>
          </label>
          <label>
            Preparation
            <textarea
              value={directions}
              cols="30"
              rows="10"
              required
              minLength="6"
              onChange={(e) => {
                handleInput(e, setDirections);
              }}
            ></textarea>
          </label>
          <label>
            Notes
            <input
              value={description}
              minLength="3"
              required
              onChange={(e) => {
                handleInput(e, setDescription);
              }}
            />
          </label>
          <button type="submit" className="button main-recipe-details__button">
            Publish!
          </button>
        </form>
      </fieldset>
    </main>
  );
};
