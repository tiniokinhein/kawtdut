import {
    ADD_THEME,
    REMOVE_THEME
} from './actionTypes'

export const addTheme = theme => ({
    type: ADD_THEME,
    payload: theme
})

export const removeTheme = theme => ({
    type: REMOVE_THEME,
    payload: theme
})