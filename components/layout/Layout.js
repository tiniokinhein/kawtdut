import React from 'react'
import Sticky from 'react-sticky-el'
import Header from './Header'
import Footer from './Footer'
import { BiUpArrow } from 'react-icons/bi'
import { useSelector } from 'react-redux'

const Layout = (props) => {

    const [showScroll , setShowScroll] = React.useState(false)
    const themeData = useSelector(state => state.theme)

    React.useEffect(() => {
        let mounted = true

        typeof window !== 'undefined' ? window.addEventListener('scroll', () => {
            if(window.pageYOffset > 300) {
                if(mounted) {
                    setShowScroll(true)
                }
            }
            if(window.pageYOffset <= 300) {
                if(mounted) {
                    setShowScroll(false)
                }
            }
        }) : 'undefined'

        if(themeData) {
            document.documentElement.className = themeData.theme
        }

        return () => { mounted = false }

    }, [themeData])

    const clickScrollTop = () => {
        typeof window !== 'undefined' ? window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }) : 'undefined'
    }
    
    const scrollBtn = (
        <BiUpArrow
            onClick={clickScrollTop}
            className="text-dark rounded-circle shadow position-fixed stt-btn"
            style={{
                background: '#fff',
                height: '34px',
                width: '34px',
                display: showScroll ? 'flex' : 'none',
                right: '20px',
                bottom: '50px',
                zIndex: 999,
                cursor: 'pointer',
                padding: '10px'
            }}
        />
    )

    return (
        <>
            <Sticky 
                topOffset={250} 
                className="s-header position-absolute"
            >
                <Header />
            </Sticky>
            
            <main>
                {props.children}
            </main>

            <Footer />

            {scrollBtn}
        </>
    )
}

export default Layout
