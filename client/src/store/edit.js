import {SET_EDIT} from './actionsType';
import {DISABLE_EDIT_MODE} from "./actionsType";

export const setEditMode = ()=> ({type: SET_EDIT});
export const disbaleEditMode = () => ({type: DISABLE_EDIT_MODE});

const reducer = (isEdit = false, action)=> {
  switch (action.type) {
    case SET_EDIT:
      return true;
    case DISABLE_EDIT_MODE:
      return false;
    default:
      return isEdit;  
    }
};

export default reducer;