import { SET_DESCRIPTION } from './actionsType';

export const setDescription = (data) => ({type: SET_DESCRIPTION, description: data});

const reducer = (description = "", action) => {
  switch (action.type) {
    case SET_DESCRIPTION:
      return action.description;
    default:
      return description;
  }
};

export default reducer;