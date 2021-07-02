import { 
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'
import Reducers from './reducers'

const middleware = applyMiddleware(thunk, logger)
const store = createStore(Reducers , middleware)
const persistor = persistStore(store)

export { store , persistor }