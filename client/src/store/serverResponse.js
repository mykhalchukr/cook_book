import { SET_SERVER_RESPONSE } from '../store/actionsType';

export const setServerResponse = (info) => ({type: SET_SERVER_RESPONSE, message: info});

const reducer = (infoMessage = "", action) => {
  switch (action.type) {
    case SET_SERVER_RESPONSE:
      return action.message;
    default:
      return infoMessage;
  }
};

export default reducer;