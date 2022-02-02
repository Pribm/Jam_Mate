import { actionTypes } from "../Actions/Follows.action";
const initialState = {
    currentFollower: {},
    usersCanBefollowed: {},
    followers: [],
    following: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CHANGE:
      return { ...state, ...payload };
    
    case actionTypes.INDEX:
        return {...state, usersCanBefollowed: payload}

    default:
      return state;
  }
};
