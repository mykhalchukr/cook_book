import { SET_RECIPES } from "./actionsType";

export const setRecipes = (data) => ({ type: SET_RECIPES, recipes: data });

const reducer = (recipes = [], action) => {
  switch (action.type) {
    case SET_RECIPES:
      return action.recipes;
    default:
      return recipes;
  }
};

export default reducer;
