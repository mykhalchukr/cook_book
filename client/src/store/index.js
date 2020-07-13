import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';              
import recipesReducer from './recipes';
import detailedRecipeReducer from './detailedRecipe';
import editReducer from './edit';
import recipeNameReducer from './recipeTitle';
import recipeDirectionsReducer from './directions';
import recipeDescriptionReducer from './description';
import recipeImageRedcuer from './image';
import recipeIngredientsReducer from './ingredients';
import recipeCreateStatusReducer from './addRecipeStatus';

const rootRedcucer = combineReducers({
  recipes: recipesReducer,
  detailedRecipe: detailedRecipeReducer,
  isEdit: editReducer,
  recipeName: recipeNameReducer,
  recipeDirections: recipeDirectionsReducer,
  recipeDescription: recipeDescriptionReducer,
  recipeImage: recipeImageRedcuer,
  recipeIngredients: recipeIngredientsReducer,
  createRecipeStatus: recipeCreateStatusReducer,

});

const store = createStore(
  rootRedcucer,
  composeWithDevTools(),
);

export default store;