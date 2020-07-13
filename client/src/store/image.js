import { SET_IMAGE} from './actionsType';

export const setImage = (data) => ({type: SET_IMAGE, image: data});

const reducer = (image = "", action) => {
  switch (action.type) {
    case SET_IMAGE:
      return action.image;
    default:
      return image;
  }
};

export default reducer;