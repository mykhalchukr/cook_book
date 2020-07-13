import React from 'react';
import './NoRecipes.scss';

export const NoRecipes = () => {
  return (
    <>
      <h2 className="main-empty__text">Unfortunately, your cookbook is empty:( Let's add some recipes!</h2>
      <img src="images/pot.png" alt="pot" className="main-empty__image" />
    </>
  );
}