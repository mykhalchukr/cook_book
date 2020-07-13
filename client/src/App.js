import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { AppHeader } from "./Components/AppHeader/AppHeader";
import { Recipes } from "./Components/Recipes/Recipes";
import { AddNewRecipe } from "./Components/AddNewRecipe/AddNewRecipe";
import { DetailedRecipe } from "./Components/DetailedRecipe/DetailedRecipe";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Switch>
        <Route path="/" exact>
          <Recipes />
        </Route>
        <Route path="/new" exact>
          <AddNewRecipe />
        </Route>
        <Route to="recipe/:title">
          <DetailedRecipe />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
