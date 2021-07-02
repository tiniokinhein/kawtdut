import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { HiOutlinePhone } from 'react-icons/hi'
import { FiMenu } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import ThemeButton from './ThemeButton'
import { useDispatch, useSelector } from 'react-redux'
import { monLang , mmLang } from '../../redux/store/language/actions'
import i18next from 'i18next'

const Header = () => {

    const { t } = useTranslation()
    const { lang } = useSelector(state => state.language)
    const dispatch = useDispatch()

    const options = [
        // { name: 'en'},
        { name: 'mon'},
        { name: 'mm'}
    ]

    const openSidebar = () => {
        document.getElementById('sideBarMenu').classList.add('active-sidebar')
        
        document.body.style.position = 'absolute'
        document.body.style.height = '100vh'
        document.body.style.width = '100%'
        document.body.style.left = '0'
        document.body.style.overflowY = 'hidden'
    }

    return (
        <header>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-4">
                        <Link href="https://facebook.com">
                            <a className="text-decoration-none me-3 text-bold-color" target="_blank">
                                <FaFacebookF size="0.9rem" />
                            </a>
                        </Link>
                        <Link href="https://instagram.com">
                            <a className="text-decoration-none text-bold-color" target="_blank">
                                <FaInstagram size="1.1rem" />
                            </a>
                        </Link>
                        <Link href="tel:+9509123456789">
                            <a 
                                target="_blank"
                                className="d-none d-md-inline-block ms-5 text-decoration-none text-color"
                                style={{
                                    fontSize: '0.8rem'
                                }}
                            >
                                <HiOutlinePhone color="#5c9284" /> 09 123 456 789
                            </a>
                        </Link>   
                    </div>
                    <div className="col-4 text-center">
                        <Link href="/">
                            <a className="text-decoration-none">
                                <img 
                                    src='/logo.png'
                                    alt="KawtDut"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="col-4 text-end">
                        <div className="d-none d-md-inline-flex me-4">
                            <ThemeButton />
                        </div>
                        <div className="d-none d-md-inline-flex me-4">
                            <div className="dropdown">
                                <button 
                                    className="btn rounded-0 shadow-none border-0 dropdown-toggle text-uppercase p-0 dropdown-toggle-css" 
                                    type="button" 
                                    id="dropdownMenuButton1" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                    style={{
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {/* {lang === 'en' && t('site.lang.en')} */}
                                    {lang === 'mon' && t('site.lang.mon')}
                                    {lang === 'mm' && t('site.lang.mm')}
                                </button>
                                <ul 
                                    className="dropdown-menu border-0 bg-transparent rounded-0 p-0" 
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    {
                                        options.filter(f => f.name !== lang).map((p,i) => (
                                            <li key={i}>
                                                {/* {
                                                    p.name === 'en' && (
                                                        <button 
                                                            className="link-btn btn rounded-0 shadow-none border-0 text-uppercase p-0 w-100 text-start"
                                                            onClick={() => 
                                                                i18next
                                                                .changeLanguage('en')
                                                                .then(() => {
                                                                    dispatch(enLang())
                                                                })
                                                            }
                                                            style={{
                                                                fontSize: '0.8rem'
                                                            }}
                                                        >
                                                            {t('site.lang.en')}
                                                        </button>
                                                    )
                                                } */}
                                                {
                                                    p.name === 'mon' && (
                                                        <button 
                                                            className="link-btn btn rounded-0 shadow-none border-0 text-uppercase p-0 w-100 text-start"
                                                            onClick={() => 
                                                                i18next
                                                                .changeLanguage('mon')
                                                                .then(() => {
                                                                    dispatch(monLang())
                                                                })
                                                            }
                                                            style={{
                                                                fontSize: '0.8rem'
                                                            }}
                                                        >
                                                            {t('site.lang.mon')}
                                                        </button>
                                                    )
                                                }
                                                {
                                                    p.name === 'mm' && (
                                                        <button 
                                                            className="link-btn btn rounded-0 shadow-none border-0 text-uppercase p-0 w-100 text-start"
                                                            onClick={() => 
                                                                i18next
                                                                .changeLanguage('mm')
                                                                .then(() => {
                                                                    dispatch(mmLang())
                                                                })
                                                            }
                                                            style={{
                                                                fontSize: '0.8rem'
                                                            }}
                                                        >
                                                            {t('site.lang.mm')}
                                                        </button>
                                                    )
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <button 
                            className="btn p-0 rounded-0 shadow-none"
                            onClick={openSidebar}
                        >
                            <FiMenu size="1.5rem" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
