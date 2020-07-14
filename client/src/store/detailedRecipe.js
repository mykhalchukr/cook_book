import { SET_DETAILED_RECIPE } from "./actionsType";

export const setDetailedRecipe = (data) => ({
  type: SET_DETAILED_RECIPE,
  recipe: data,
});

const reducer = (recipe = {}, action) => {
  switch (action.type) {
    case SET_DETAILED_RECIPE:
      return action.recipe;
    default:
      return recipe;
  }
};

export default reducer;
