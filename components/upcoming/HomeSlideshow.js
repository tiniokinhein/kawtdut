import Link from 'next/link'
import React from 'react'
import Slider from 'react-slick'
import useSWR from 'swr'
import axios from 'axios'
import { UPCOMINGS } from '../../config/api'
import { useTranslation } from 'react-i18next'
import { BiRightArrow } from 'react-icons/bi'
import Skeleton from 'react-loading-skeleton'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const HomeSlideshow = () => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'

    const { data: slides } = useSWR(
        UPCOMINGS + '?per_page=6',
        () => axios.get(UPCOMINGS + '?per_page=6').then(res => res.data),
        { refreshInterval: 1000 }
    )

    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: false,
        className: 'homeSlideshow'
    }

    const slideLists = slides && slides.map(p => (
        <div 
            key={p.id} 
            className="position-relative"
        >
            <img 
                src={p.acf.image.url}
                alt={p.title.rendered}
                className="w-100"
                style={{
                    height: '100vh',
                    minHeight: '600px',
                    objectFit: 'cover',
                    marginBottom: '-8px'
                }}
            />
            <div
                className="position-absolute"
                style={{
                    left: 0,
                    right: 0,
                    top: '50%',
                    zIndex: 99,
                    transform: 'translate(0, -50%)'
                }}
            >
                <div className="container">
                    <div
                        className="col-12 col-md-6 px-0"
                    >
                        <h4 
                            className="text-white text-uppercase mb-3"
                            style={{
                                fontSize: '3rem',
                                lineHeight: '1.3'
                            }}
                        >
                            {t(
                                'a.d', 
                                {
                                    d_mon: p.title.rendered,
                                    d_mm: p.acf.title_mm
                                }
                            )}
                        </h4>
                        <p 
                            className="mb-0 text-white"
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    'a.d',
                                    {
                                        d_mon: p.acf.info_mon,
                                        d_mm: p.acf.info_mm
                                    }
                                )
                            }}
                        />
                    </div>
                </div>
            </div>

            <div
                className="position-absolute"
                style={{
                    left: 0,
                    bottom: '80px',
                    right: 0,
                    zIndex: 999
                }}
            >
                <div className="container">
                    <Link href="/upcoming/[id]" as={`/upcoming/${p.id}`}>
                        <a
                            className="link-pulse d-block rounded-circle text-center ms-3"
                            style={{
                                width: '60px',
                                height: '60px',
                                lineHeight: '56px',
                                color: '#333'
                            }}
                        >
                            <BiRightArrow size="1.6rem" />
                        </a>
                    </Link>
                </div>
            </div>

        </div>
    ))

    return (
        <>
            {
                slides && slides.length ? (
                    <Slider {...settings}>
                        {slideLists}
                    </Slider>
                ) : (
                    <div 
                        className="w-100"
                        style={{
                            height: '100vh',
                            minHeight: '600px'
                        }}
                    >
                        <Skeleton 
                            height={'100%'} 
                            style={{
                                display: 'block'
                            }} 
                        />
                    </div>
                )
            }
        </>
    )
}

export default HomeSlideshow
