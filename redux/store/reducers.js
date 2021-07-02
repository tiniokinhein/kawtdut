import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import themeReducer from './theme/reducer'
import languageReducer from './language/reducer'

const themePersistConfig = {
    key: 'theme',
    storage
}

const langPersistConfig = {
    key: 'lang',
    storage
}

const Reducers = combineReducers({
    theme: persistReducer(themePersistConfig, themeReducer),
    language: persistReducer(langPersistConfig, languageReducer)
})

export default Reducers