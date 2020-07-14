import { SET_DIRECTIONS } from "./actionsType";

export const setDirections = (data) => ({
  type: SET_DIRECTIONS,
  directions: data,
});

const reducer = (directions = "", action) => {
  switch (action.type) {
    case SET_DIRECTIONS:
      return action.directions;
    default:
      return directions;
  }
};

export default reducer;
