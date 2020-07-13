import { SET_DETAILED_RECIPE} from './actionsType';
import {UPD_INGREDIENTS} from './actionsType';
import {UPD_DESCRIPTION} from './actionsType';
import {UPD_DIRECTIONS} from './actionsType';

export const setDetailedRecipe = (data) => ({type: SET_DETAILED_RECIPE, recipe: data });
export const updIngredients = (updatedData) => ({type: UPD_INGREDIENTS, ingredients: updatedData});
export const updDescription = (updatedData) => ({type: UPD_DESCRIPTION, description: updatedData});
export const updDirections = (updatedData) => ({type: UPD_DIRECTIONS, direction: updatedData});

const reducer = (recipe = {}, action) => {
  switch (action.type) {
    case SET_DETAILED_RECIPE:
      return action.recipe;
    case UPD_INGREDIENTS:
      return {
        ...recipe,
        ingredients: action.ingredients,
      };
    case UPD_DESCRIPTION:
      return {
        ...recipe,
        description: action.description
      }
    case UPD_DIRECTIONS:
      return {
        ...recipe,
        directions: action.direction  
      }
    default:
      return recipe;
  }
};

export default reducer;