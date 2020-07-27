import {SET_RELATED_RECIPES} from "./actionsType";

export const setRelatedRecipes = (data) => ({type: SET_RELATED_RECIPES, relatedRecipes: data});

const reducer = (relatedRecipes = [], action) => {
  switch(action.type) {
    case SET_RELATED_RECIPES:
      return action.relatedRecipes;
    default:
      return relatedRecipes;
    }
};

export default reducer;