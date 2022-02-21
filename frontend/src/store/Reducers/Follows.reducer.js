import { actionTypes } from "../Actions/Follows.action";
const initialState = {
    currentFollower: {},
    usersCanBefollowed: {},
    followers: [],
    following: []
};

const FollowsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CHANGE:
      return { ...state, currentFollower: (payload === 'clear') ? {} : payload };
    
    case actionTypes.INDEX:
        return {...state, usersCanBefollowed: payload}
    
    case actionTypes.DELETE:
        return {...state, following: state.following.filter(f => f.id !== payload)}
        
    default:
      return state;
  }
};

export default FollowsReducer
