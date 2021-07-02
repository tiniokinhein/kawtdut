import React from 'react'
import { RiMoonFill } from 'react-icons/ri'
import { IoSunnyOutline } from 'react-icons/io5'
import { useSelector , useDispatch } from 'react-redux'
import { addTheme , removeTheme } from '../../redux/store/theme/actions'

const ThemeButton = () => {

    const themeStore = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const handleChangeDark = () => {
        dispatch(addTheme())
    }

    const handleChangeLight = () => {
        dispatch(removeTheme())
    }

    return (
        <>
            {
                themeStore.theme === 'dark' && (
                    <button
                        className="btn rounded-0 shadow-none border-0 p-0 link-btn text-bold-color"
                        onClick={handleChangeLight}
                    >
                        <IoSunnyOutline />
                    </button>
                )
            }
            {
                themeStore.theme === 'light' && (
                    <button
                        className="btn rounded-0 shadow-none border-0 p-0 link-btn"
                        onClick={handleChangeDark}
                    >
                        <RiMoonFill />
                    </button>
                )
            }
        </>
    )
}

export default ThemeButton
