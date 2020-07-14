import React from 'react';

import './DetailedRecipe.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditButtons } from '../EditButtons/EditButtons';
import { updDescription } from '../../store/detailedRecipe';
import { updDirections } from '../../store/detailedRecipe';
import { updIngredients } from '../../store/detailedRecipe';
import { setDetailedRecipe } from '../../store/detailedRecipe';

export const DetailedRecipe = () => {
  const detailedRecipe = useSelector(state => state.detailedRecipe);
  const isEdit = useSelector(state => state.isEdit);
  const dispatch = useDispatch();

  let {id} = useParams();
  
  const fetchCurrentRecipe = useCallback(async() => {
    try {
      const repsonse = await fetch(`/api/recipes/recipe/${id}`);
      const answer = await repsonse.json();
      dispatch(setDetailedRecipe(answer));
    } catch (error) {
      console.log(error);
    }
  },[dispatch, id]);

  useEffect(()=>{
    fetchCurrentRecipe();
  },[fetchCurrentRecipe]);

  const { ingredients,
    description,
    directions,
    title,
    image
  } = detailedRecipe;

  
  return (
    <main className="recipe-detailed container">
    <h2 className="recipe-detailed__title">
        {title}
      </h2>
      <img
        src={image}
        className="recipe__image recipe-detailed__image--large"
        alt={`${title}`} />
      <EditButtons />

      <div className="recipe-detailed__wrapper">
        <div className="recipe-detailed__ingredients-wrapper">
          <h3 className="recipe-detailed__section-title">
            Ingredients
          </h3>
          {isEdit ?
            <textarea
              style={{ width: "90%" }}
              rows="10"
              type="text"
              value={ingredients}
              onChange={(e) => {
                const { value } = e.target;
                dispatch(updIngredients(value));
              }}></textarea> :
            <p
              className="recipe-detailed__ingredients">
              {ingredients}
            </p>}
        </div>
        <div className="recipe-detailed__preparation-wrapper">
          <h3 className="recipe-detailed__section-title">
            Preparation
          </h3>
          {isEdit ?
            <textarea
              style={{ width: "90%" }}
              rows="10"
              type="text"
              value={directions}
              onChange={(e) => {
                const { value } = e.target;
                dispatch(updDirections(value));
              }}></textarea> :
            <p
              className="recipe-detailed__preparation">
              {directions}
            </p>}
        </div>
        <div className="recipe-detailed__description-wrapper">
        <h3 className="recipe-detailed__section-title">
          Notes
        </h3>
        {isEdit ?
          <textarea
            type="text"
            style={{ width: "90%" }}
            value={description}
            onChange={(e) => {
              const { value } = e.target;
              dispatch(updDescription(value));
            }}></textarea> :
          <p className="recipe-detailed__description">
            {description}
          </p>
        }
      </div>
      </div>
  
    </main>
  );
};