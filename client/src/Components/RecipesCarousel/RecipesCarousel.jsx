import React from "react";
import Slider from "react-slick";

import { useHistory } from 'react-router-dom';

export const RecipesCarousel = ({relatedRecipes, parentId}) => {

  const history = useHistory();

  return (
    <div className="recipe-detailed__slider slider">
      <h3>Related Recipes</h3>
      <Slider dots={true}>
        {relatedRecipes.map((recipe) => (
          <div
            key={recipe._id}
            onClick={() => {
              history.push({
                pathname: `/recipe/forks?parent=${parentId}&related=${recipe._id}`,
              });
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-detailed__related-image"
            />
            <p className="recipe-detailed__description">{recipe.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};
