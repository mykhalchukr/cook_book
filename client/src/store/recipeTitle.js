import { SET_RECIPE_TITLE } from "./actionsType";

export const setRecipeTitle = (data) => ({
  type: SET_RECIPE_TITLE,
  name: data,
});

const reducer = (name = "", action) => {
  switch (action.type) {
    case SET_RECIPE_TITLE:
      return action.name;
    default:
      return name;
  }
};

export default reducer;
