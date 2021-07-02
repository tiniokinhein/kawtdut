import {
    ADD_THEME,
    REMOVE_THEME
} from './actionTypes'

const initialState = {
    theme: 'light'
}

export default function(state=initialState , action) {
    switch (action.type) {
        case ADD_THEME:
            document.documentElement.className = 'dark'
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000')
            return {
                ...state,
                theme: 'dark'
            }
        
        case REMOVE_THEME:
            document.documentElement.className = 'light'
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff')
            return {
                ...state,
                theme: 'light'
            }
    
        default:
            return state
    }
}