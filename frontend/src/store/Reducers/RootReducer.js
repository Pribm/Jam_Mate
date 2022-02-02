import { combineReducers } from "redux";
import LoadingReducer from '../Reducers/Loading.reducer'
import AuthReducer from "./Auth.reducer";
import AlertReducer from "./Alert.reducer";
import UserReducer from "./User.reducer";
import InstrumentsReducer from "./Instruments.reducer";
import GenresReducer from "./Genres.reducer";
import PostReducer from "./Post.reducer";
import FollowsReducer from './Follows.reducer'

const rootReducer = combineReducers({
    LoadingReducer,
    AuthReducer,
    AlertReducer,
    UserReducer,
    InstrumentsReducer,
    GenresReducer,
    PostReducer,
    FollowsReducer
})

export default rootReducer