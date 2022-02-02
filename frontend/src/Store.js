import { createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import Reducers from './store/Reducers/RootReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

let middlewares = [ReduxThunk]

export const Store = createStore(Reducers, composeWithDevTools(applyMiddleware(...middlewares)))