import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import './AppHeader.scss';

export const AppHeader = () => {
  const history = useHistory();

  const goTo = () => {
    history.push({
      pathname: "/new"
    });
  };

  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <NavLink to="/" className="header__logo">
          Amazing Recipes
        </NavLink>
      </div>
      <button className="button header__button" onClick={() => {
        goTo();
      }}>Create Recipe</button>
    </header>
  );
};
