import { createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ReduxThunk from 'redux-thunk'
import Reducers from './store/Reducers/RootReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

let middlewares = [ReduxThunk]

const persistConfig = {
    key: 'root',
    whitelist: ['UserReducer'],
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, Reducers)

  const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)))
  const persistor = persistStore(store)

export {store, persistor}