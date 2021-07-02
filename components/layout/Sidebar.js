import Link from 'next/link'
import React from 'react'
import { HiOutlinePhone } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import NavLink from './NavLink'
import { useTranslation } from 'react-i18next'
import ThemeButton from './ThemeButton'
import { useDispatch, useSelector } from 'react-redux'
import { monLang , mmLang } from '../../redux/store/language/actions'
import i18next from 'i18next'

const SideBar = () => {

    const { lang } = useSelector(state => state.language)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const closeSidebar = () => {
        document.getElementById('sideBarMenu').classList.remove('active-sidebar')

        document.body.style.position = ''
        document.body.style.height = ''
        document.body.style.width = ''
        document.body.style.right = ''
        document.body.style.overflowY = ''
    }
    
    return (
        <div
            id="sideBarMenu"
            className="position-fixed w-100"
        >
            <div 
                className="float-start col-0 col-sm-4 col-md-6 col-lg-9 h-100 px-0 sidebar-bg-overlay"
                style={{
                    overflowY: 'scroll'
                }}
                style={{
                    background: 'rgba(0,0,0,0.7)',
                    cursor: 'pointer'
                }}
                onClick={closeSidebar}
            />
            <div 
                className="float-end col-12 col-sm-8 col-md-6 col-lg-3 h-100 bg-color px-4 position-relative d-flex flex-column"
            >
                <div className="py-2 d-flex align-items-center justify-content-between">
                    <div 
                        className="d-inline-flex d-md-none"
                    >
                        <ThemeButton />
                    </div>
                    <Link href="tel:+9509123456789">
                        <a 
                            target="_blank"
                            className="d-inline-block d-md-none text-decoration-none text-color"
                            style={{
                                fontSize: '0.8rem'
                            }}
                        >
                            <HiOutlinePhone color="#5c9284" /> 09 123 456 789
                        </a>
                    </Link>
                    <button 
                        onClick={closeSidebar}
                        className="btn border-0 p-0 shadow-none ms-md-auto"
                    >
                        <IoClose size="2.5rem" color="#e0a604" />
                    </button>
                </div>
                <div className="menu-lists">
                    <ul 
                        className="m-0 p-0 list-unstyled"
                        onClick={closeSidebar}
                    >
                        <li>
                            <NavLink
                                href="/"
                                activeClassName=""
                            >
                                <a
                                    className="text-decoration-none d-inline-block py-2 text-color"
                                    style={{
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('site.home')}
                                </a>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/about-us"
                                activeClassName="menu-active"
                            >
                                <a
                                    className="text-decoration-none d-inline-block py-2 text-color"
                                    style={{
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('site.about')}
                                </a>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/activities"
                                activeClassName="menu-active"
                            >
                                <a
                                    className="text-decoration-none d-inline-block py-2 text-color"
                                    style={{
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('site.activities')}
                                </a>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/upcoming"
                                activeClassName="menu-active"
                            >
                                <a
                                    className="text-decoration-none d-inline-block py-2 text-color"
                                    style={{
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('site.upcoming')}
                                </a>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/opinions"
                                activeClassName="menu-active"
                            >
                                <a
                                    className="text-decoration-none d-inline-block py-2 text-color"
                                    style={{
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('site.opinions')}
                                </a>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/news"
                                activeClassName="menu-active"
                            >
                                <a
                                    className="text-decoration-none d-inline-block py-2 text-color"
                                    style={{
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('site.news')}
                                </a>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/donate-us"
                                activeClassName="menu-active"
                            >
                                <a
                                    className="text-decoration-none d-inline-block py-2 text-color"
                                    style={{
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('site.donate')}
                                </a>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/contact-us"
                                activeClassName="menu-active"
                            >
                                <a
                                    className="text-decoration-none d-inline-block py-2 text-color"
                                    style={{
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('site.contact')}
                                </a>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <footer
                    className="mt-auto py-3 d-flex d-md-none justify-content-between"
                >
                    {/* <div>
                        <input 
                            type="radio" 
                            className="btn-check" 
                            name="en" 
                            id="en" 
                            autoComplete="off" 
                            onChange={() => 
                                i18next
                                .changeLanguage('en')
                                .then(() => {
                                    dispatch(enLang())
                                })
                            }
                            checked={lang === 'en' ? true : false}
                        />
                        <label 
                            className="btn btn-active text-uppercase border-0 rounded-0 text-color" 
                            htmlFor="en"
                            style={{
                                fontSize: '0.8rem',
                                lineHeight: 2
                            }}
                        >
                            {t('site.lang.en')}
                        </label>
                    </div> */}

                    <div>
                        <input 
                            type="radio" 
                            className="btn-check" 
                            name="mon" 
                            id="mon" 
                            autoComplete="off"
                            onChange={() => 
                                i18next
                                .changeLanguage('mon')
                                .then(() => {
                                    dispatch(monLang())
                                })
                            }
                            checked={lang === 'mon' ? true : false}
                        />
                        <label 
                            className="btn btn-active text-uppercase border-0 rounded-0 text-color"
                            htmlFor="mon"
                            style={{
                                fontSize: '0.8rem',
                                lineHeight: 2
                            }}
                        >
                            {t('site.lang.mon')}
                        </label>
                    </div>

                    <div>
                        <input 
                            type="radio" 
                            className="btn-check" 
                            name="mm" 
                            id="mm" 
                            autoComplete="off"
                            onChange={() => 
                                i18next
                                .changeLanguage('mm')
                                .then(() => {
                                    dispatch(mmLang())
                                })
                            }
                            checked={lang === 'mm' ? true : false}
                        />
                        <label 
                            className="btn btn-active text-uppercase border-0 rounded-0 text-color"
                            htmlFor="mm"
                            style={{
                                fontSize: '0.8rem',
                                lineHeight: 2
                            }}
                        >
                            {t('site.lang.mm')}
                        </label>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default SideBar