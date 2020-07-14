import { DISABLE_MODAL } from "./actionsType";
import { ENABLE_MODAL } from "./actionsType";

export const enableModal = () => ({ type: ENABLE_MODAL });
export const disableModal = () => ({ type: DISABLE_MODAL });

const reducer = (isEnabled = false, action) => {
  switch (action.type) {
    case ENABLE_MODAL:
      return true;
    case DISABLE_MODAL:
      return false;
    default:
      return isEnabled;
  }
};

export default reducer;
