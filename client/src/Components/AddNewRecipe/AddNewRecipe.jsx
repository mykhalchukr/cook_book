import React from 'react';
import Popup from 'reactjs-popup';
import './AddNewRecipes.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setRecipeTitle } from '../../store/recipeTitle';
import { setDirections } from '../../store/directions';
import { setImage } from '../../store/image';
import { setIngredients } from '../../store/ingredients';
import { setDescription } from '../../store/description';
import { setStatus } from '../../store/addRecipeStatus';

const Modal = () => {
  const isUploaded = useSelector(state => state.hasRecipeUploaded);
  return (
    <Popup
      open={isUploaded}
      modal
      closeOnDocumentClick
    >
      <h2>HIHIHIHI</h2>
    </Popup>
  )
};

export const AddNewRecipe = () => {

  const title = useSelector(state => state.recipeName);
  const directions = useSelector(state => state.recipeDirections);
  const ingredients = useSelector(state => state.recipeIngredients);
  const description = useSelector(state => state.recipeDescription);
  const image = useSelector(state => state.recipeImage);

  const dispatch = useDispatch();
  const history = useHistory();

  const clearFields = () => {
    dispatch(setRecipeTitle(""));
    dispatch(setDirections(""));
    dispatch(setImage(""));
    dispatch(setIngredients(""));
    dispatch(setDescription(""));
  };

  const sendTheRecipe = async (recipe) => {
    try {
      const response = await fetch("/api/recipes/new", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(recipe)
      });
      const info = await response.json();
      dispatch(setStatus(info.message));
      alert(info.message);
      history.push('/');

    } catch (error) {
      dispatch(setStatus(error.message));
      alert(error.message);
    }
    clearFields();
  };

  return (
    <main className="main-recipe-details">
      <Modal info={'hello'} />
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
          }}>
          <label>
            Recipe Name
          <input
              value={title}
              required
              minLength="6"
              onChange={(e) => {
                const { value } = e.target;
                dispatch(setRecipeTitle(value));
              }} />
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
                const { value } = e.target;
                dispatch(setDirections(value));
              }}></textarea>
          </label>
          <label>
            Image URL
          <input
              value={image}
              minLength="6"
              required
              type="url"
              onChange={(e) => {
                const { value } = e.target;
                dispatch(setImage(value));
              }} />
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
                const { value } = e.target;
                dispatch(setIngredients(value));
              }}></textarea>
          </label>
          <label>
            Notes
          <input
              value={description}
              minLength="6"
              required
              onChange={(e) => {
                const { value } = e.target;
                dispatch(setDescription(value));
              }} />
          </label>
          <button
            type="submit"
            className="button main-recipe-details__button">
            Save Recipe
            </button>
        </form>
      </fieldset>
    </main>
  )
};