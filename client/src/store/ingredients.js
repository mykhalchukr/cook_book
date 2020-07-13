import { SET_INGREDIENTS } from './actionsType';

export const setIngredients = (data) => ({type: SET_INGREDIENTS, ingredients: data});

const reducer = (ingredients = "", action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return action.ingredients;
    default:
      return ingredients;
  }
};

export default reducer;