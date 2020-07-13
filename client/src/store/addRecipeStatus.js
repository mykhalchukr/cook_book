import { UPLOAD_RECIPE_STATUS } from './actionsType';

export const setStatus = (info) => (
  {type: UPLOAD_RECIPE_STATUS, status: info}
);

const reducer = (status = "", action) => {
  switch (action.type) {
    case UPLOAD_RECIPE_STATUS:
      return action.status;
    default:
      return status;
  }
};

export default reducer;