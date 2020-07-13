import React from 'react';
import { useHistory } from 'react-router-dom';
import './Recipe.scss';
import { setDetailedRecipe } from '../../store/detailedRecipe';
import { useDispatch } from 'react-redux';

export const Recipe = ({ fullRecipe }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <article className="main__recipe recipe" onClick={() => {
      dispatch(setDetailedRecipe(fullRecipe));
      history.push({
        pathname: `recipe/${fullRecipe._id}`
      });
    }}>
      <img src={fullRecipe.image} alt={`${fullRecipe.title}`} className="recipe__image" />
      <h3 className="recipe__title">{fullRecipe.title}</h3>
    </article>
  );
};