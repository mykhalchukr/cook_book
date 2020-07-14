import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import recipesReducer from "./recipes";
import detailedRecipeReducer from "./detailedRecipe";
import editReducer from "./edit";
import recipeNameReducer from "./recipeTitle";
import recipeDirectionsReducer from "./directions";
import recipeDescriptionReducer from "./description";
import recipeImageRedcuer from "./image";
import recipeIngredientsReducer from "./ingredients";
import serverResponseReducer from "./serverResponse";
import modalReducer from "./modalStatus";

const rootRedcucer = combineReducers({
  recipes: recipesReducer,
  detailedRecipe: detailedRecipeReducer,
  isEdit: editReducer,
  recipeName: recipeNameReducer,
  recipeDirections: recipeDirectionsReducer,
  recipeDescription: recipeDescriptionReducer,
  recipeImage: recipeImageRedcuer,
  recipeIngredients: recipeIngredientsReducer,
  serverResponseMessage: serverResponseReducer,
  isModal: modalReducer,
});

const store = createStore(rootRedcucer, composeWithDevTools());

export default store;
