import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { GiSmartphone } from 'react-icons/gi'
import { IoMailOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'

const Footer = () => {

    const { t } = useTranslation()

    return (
        <footer className="bg-light-color">
            <div className="py-5">
                <div className="container">
                    <div className="mb-3 pb-3 border-bottom">
                        <div className="row">
                            <div className="col-12 col-md-4 mb-3 mb-md-0">
                                <h6 className="mb-0 text-bold-color fw-bold">
                                    <HiOutlineLocationMarker color="#5c9284" /> {t('site.how.find')}
                                </h6>
                            </div>
                            <div className="col-12 col-md-8">
                                <div className="d-flex flex-column flex-sm-row justify-content-around text-start text-md-end">
                                    <p 
                                        className="mb-0 flex-grow-1 fw-bold"
                                        style={{
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        <Link href="https://goo.gl/maps/kRVYWwAPsnteBHzJ8">
                                            <a 
                                                target="_blank"
                                                className="text-decoration-none text-color"
                                            >
                                                <HiOutlineLocationMarker color="#5c9284" /> {t('site.map')}
                                            </a>
                                        </Link>
                                    </p>
                                    <p 
                                        className="mb-0 flex-grow-1 fw-bold"
                                        style={{
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        <Link href="tel:+9509123456789">
                                            <a 
                                                target="_blank"
                                                className="text-decoration-none text-color"
                                            >
                                                <GiSmartphone color="#5c9284" /> 09 123 456 789
                                            </a>
                                        </Link>                                        
                                    </p>
                                    <p 
                                        className="mb-0 flex-grow-1 fw-bold"
                                        style={{
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        <Link href="mailto:info.kawtdut@gmail.com">
                                            <a 
                                                target="_blank"
                                                className="text-decoration-none text-color"
                                            >
                                                <IoMailOutline color="#5c9284" /> info.kawtdut@gmail.com
                                            </a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <p 
                                className="mb-0 text-center text-md-start text-color"
                                style={{
                                    fontSize: '0.8rem'
                                }}
                            >
                                <small>
                                &copy; {new Date().getFullYear()} 
                                <Link href="/">
                                    <a className="text-decoration-none ms-1 text-bold-color fw-bold">
                                        {t('site.main')}
                                    </a>
                                </Link>. All Rights Reserved.
                                </small> 
                            </p>
                        </div>
                        <div className="col-12 col-md-4 my-3 my-md-0 text-center">
                            <Link href="https://facebook.com">
                                <a className="text-decoration-none me-2 text-bold-color" target="_blank">
                                    <FaFacebookF size="0.9rem" />
                                </a>
                            </Link>
                            <Link href="https://instagram.com">
                                <a className="text-decoration-none ms-2 text-bold-color" target="_blank">
                                    <FaInstagram size="1.1rem" />
                                </a>
                            </Link>
                        </div>
                        <div className="col-12 col-md-4">
                            <p 
                                className="mb-0 text-center text-md-end text-color"
                                style={{
                                    fontSize: '0.8rem'
                                }}
                            >
                                <small>
                                    {t('site.developed.by')} 
                                    <Link href="/">
                                        <a className="text-decoration-none ms-1 text-bold-color fw-bold">
                                            {t('site.kawtdut.teams')}
                                        </a>
                                    </Link>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
