import React from "react";
import "./RecipesCarousle.scss";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default () => {
  const relatedRecipes = useSelector((state) => state.relatedRecipes);
  const history = useHistory();

  return (
    <Carousel autoPlay>
      {relatedRecipes.map((item) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/recipe/${item._id}`)}
        >
          <img src={item.image} alt={item.title} />
          <p className="legend">{item.title}</p>
        </div>
      ))}
    </Carousel>
  );
};
