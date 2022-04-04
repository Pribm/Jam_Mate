import { actionTypes } from "../Actions/Post.action";

const initialState = {
    post: {},
    posts: [],
};

const PostsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CHANGE:
      return { ...state, post: (payload === 'clear') ? {} : {...state.post, ...payload} };
    
    case actionTypes.INDEX:
    return { ...state, posts: payload};

    case actionTypes.UPDATE:
    return {...state, posts: [payload,...state.posts]}

    case actionTypes.DELETE:
      console.log(state.posts.data)
    return {...state, posts: state.posts.data.filter(post => post.id !== payload)}

    default:
      return state;
  }
};

export default PostsReducer
