import {
    // EN,
    MON,
    MM
} from './actionTypes'

const initialState = {
    lang: 'mon'
}

export default function(state=initialState , action) {
    switch (action.type) {
        // case EN:
        //     localStorage.setItem('i18nextLng', 'en')
        //     return {
        //         ...state,
        //         lang: 'en'
        //     }

        case MON:
            localStorage.setItem('i18nextLng', 'mon')
            return {
                ...state,
                lang: 'mon'
            }

        case MM:
            localStorage.setItem('i18nextLng', 'mm')
            return {
                ...state,
                lang: 'mm'
            }
    
        default:
            return state
    }
}