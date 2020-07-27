import React from "react";

import RecipeCarousel from "../RecipesCarousel/RecipesCarousel";
import "./DetailedRecipe.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditButtons } from "../EditButtons/EditButtons";
import { EditField } from "../EditField/EditField";
import { setDetailedRecipe } from "../../store/detailedRecipe";
import { disbaleEditMode } from "../../store/edit";
import { setRelatedRecipes } from "../../store/relatedRecipes";

export const DetailedRecipe = () => {
  const detailedRecipe = useSelector((state) => state.detailedRecipe);
  const relatedRecipes = useSelector((state) => state.relatedRecipes);
  const isEdit = useSelector((state) => state.isEdit);
  const dispatch = useDispatch();
  const history = useHistory();
  const [recipeToEdit, setRecipeToEdit] = useState({});

  let { id } = useParams();

  const fetchCurrentRecipe = useCallback(async () => {
    try {
      const repsonse = await fetch(`/api/recipes/recipe/${id}`);
      const answer = await repsonse.json();

      dispatch(setRelatedRecipes(answer.relatedRecipes));
      dispatch(setDetailedRecipe(answer.recipe));
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, id]);

  const saveUpdates = async (updatedRecipe) => {
    try {
      const response = await fetch(`/api/recipes/recipe/${updatedRecipe._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(updatedRecipe),
      });
      const info = await response.json();
      dispatch(setDetailedRecipe(updatedRecipe));
      alert(info.message);
    } catch (error) {
      console.dir(error);
      alert(error.message);
    }
  };

  const deleteRecipe = async (_id) => {
    try {
      const response = await fetch(`/api/recipes/recipe/${_id}`, {
        method: "DELETE",
      });
      const info = await response.json();
      alert(info.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchCurrentRecipe();
  }, [fetchCurrentRecipe]);

  useEffect(() => {
    setRecipeToEdit(detailedRecipe);
  }, [detailedRecipe]);

  useEffect(() => {
    return () => {
      dispatch(disbaleEditMode());
    };
  }, [dispatch]);

  const cancelEdit = () => {
    setRecipeToEdit(detailedRecipe);
    dispatch(disbaleEditMode());
  };

  const handleUpdate = () => {
    saveUpdates(recipeToEdit);
    dispatch(disbaleEditMode());
  };

  const handleFork = () => {
    history.push(`/new/${id}`);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    let newRecipe = { ...detailedRecipe };
    newRecipe[name] = value;

    setRecipeToEdit(newRecipe);
  };

  const handleDelete = () => {
    deleteRecipe(recipeToEdit._id);
    history.push("/");
  };

  return (
    <>
      {Object.keys(recipeToEdit).length > 0 && (
        <main className="recipe-detailed container">
          <h2 className="recipe-detailed__title">{recipeToEdit.title}</h2>
          <img
            src={recipeToEdit.image}
            className="recipe__image recipe-detailed__image--large"
            alt={`${recipeToEdit.title}`}
          />
          <EditButtons
            handleCancel={cancelEdit}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleFork={handleFork}
          />
          <div className="recipe-detailed__wrapper">
            <div className="recipe-detailed__ingredients-wrapper">
              <h3 className="recipe-detailed__section-title">Ingredients</h3>
              {isEdit ? (
                <EditField
                  name="ingredients"
                  data={recipeToEdit.ingredients}
                  handleData={handleChange}
                />
              ) : (
                <p className="recipe-detailed__ingredients">
                  {recipeToEdit.ingredients}
                </p>
              )}
            </div>
            <div className="recipe-detailed__preparation-wrapper">
              <h3 className="recipe-detailed__section-title">Preparation</h3>
              {isEdit ? (
                <EditField
                  name="directions"
                  data={recipeToEdit.directions}
                  handleData={handleChange}
                />
              ) : (
                <p className="recipe-detailed__preparation">
                  {recipeToEdit.directions}
                </p>
              )}
            </div>
            <div className="recipe-detailed__description-wrapper">
              <h3 className="recipe-detailed__section-title">Notes</h3>
              {isEdit ? (
                <EditField
                  name="description"
                  data={recipeToEdit.description}
                  handleData={handleChange}
                />
              ) : (
                <p className="recipe-detailed__description">
                  {recipeToEdit.description}
                </p>
              )}
            </div>
          </div>
          {relatedRecipes.length > 0 ? (
            <>
              <h3 className="recipe-detailed__section-title">
                Related Recipes
              </h3>
              <RecipeCarousel />
            </>
          ) : (
            <h3 className="recipe-detailed__section-title">
              No forked recipes
            </h3>
          )}
        </main>
      )}
    </>
  );
};
