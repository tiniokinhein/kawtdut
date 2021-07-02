import { NextSeo } from 'next-seo'
import React from 'react'
import Layout from '../components/layout/Layout'
import useSWR from 'swr'
import { PAGES } from '../config/api'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'
import Iframe from 'react-iframe'
import { useSelector } from 'react-redux'


const CURL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310765.6223628502!2d95.88056988949619!3d15.489367314995553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e88276c80a8c1b%3A0xe207c92ebec34bc8!2sKoh%20Doot!5e0!3m2!1sen!2smm!4v1622282632940!5m2!1sen!2smm'

const AboutUs = () => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'
    const themeStore = useSelector(state => state.theme)

    const { data:p } = useSWR(
        PAGES + '/73',
        () => axios.get(PAGES + '/73').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const topBanner = p ? (
        <div key={p.id} className="position-relative">
            <img 
                src={p.acf.image.url}
                alt=""
                className="w-100"
                style={{
                    height: '50vh',
                    minHeight: '400px',
                    objectFit: 'cover'
                }}
            />
            <div
                className="position-absolute"
                style={{
                    left: 0,
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
            >
                <div className="container">
                    <h4 
                        className="mb-0 text-white text-center text-uppercase"
                        style={{
                            fontSize: '2rem',
                            fontFamily: lng === 'en' ? 'Inter Bold' : 'Myanmar Sans Pro, Mon'
                        }}

                    >
                        {
                            t('a.d', {
                                d_mon: p.title.rendered,
                                d_mm: p.acf.title_mm
                            })
                        }
                    </h4>
                </div>
            </div>

            {
                themeStore.theme === 'dark' ? (
                    <img 
                        src="/images/brush-bg-dark.png"
                        alt=""
                        className="position-absolute w-100"
                        style={{
                            left: 0,
                            right: 0,
                            bottom: '-1px',
                            transform: 'scaleX(-1)'
                        }}
                    />
                ) : (
                    <img 
                        src="/images/brush-bg.png"
                        alt=""
                        className="position-absolute w-100"
                        style={{
                            left: 0,
                            right: 0,
                            bottom: '-1px',
                            transform: 'scaleX(-1)'
                        }}
                    /> 
                )
            }
            
        </div>
    ) : (
        <>
            <Skeleton height={400} style={{ display: 'block' }} />
        </>
    )

    const lists = p ? (
        <div className="row" key={p.id}>
            <div className="col-12 col-md-8 mb-4 mb-md-0">
                <div 
                    className="text-color"
                    dangerouslySetInnerHTML={{
                        __html: t('a.d', {
                            d_mon: p.acf.description_mon,
                            d_mm: p.acf.description_mm
                        })
                    }}
                    style={{
                        lineHeight: lng === 'mon' || lng === 'mm' ? '2em' : '1.5em'
                    }}
                />
            </div>
            <div className="col-12 col-md-4">
                <Iframe 
                    url={CURL}
                    width="100%"
                    height="400px"
                    id="google-map"
                    className="border-0"
                    display="block"
                    position="relative"
                />
            </div>
        </div>
    ) : (
        <div className="row">
            <div className="col-12 col-md-8 mb-4 mb-md-0">
                <div className="mb-3" style={{lineHeight:2}}>
                    <Skeleton count={5} height={21} />
                </div>
                <div className="mb-3" style={{lineHeight:2}}>
                    <Skeleton count={5} height={21} />
                </div>
                <div className="mb-3" style={{lineHeight:2}}>
                    <Skeleton count={5} height={21} />
                </div>
                <div className="mb-5" style={{lineHeight:2}}>
                    <Skeleton count={5} height={21} />
                </div>
            </div>
            <div className="col-12 col-md-4">
                <Skeleton height={400} />
            </div>
        </div>
    )

    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const title = p ? (
        t('a.d', {
            d_mon: p.title.rendered,
            d_mm: p.acf.title_mm
        }) + ' - ' + t('site.main')
    ) : (
        'ကော့ဒွတ်ကျေးရွာ'
    )

    return (
        <>
            <NextSeo 
                title={title}
                description={ p && t('a.d', {
                    d_mon: p.acf.info_mon,
                    d_mm: p.acf.info_mm
                })}
                canonical={w}
                openGraph={{
                    url: w,
                    title: title,
                    description: p && t('a.d', {
                        d_mon: p.acf.info_mon,
                        d_mm: p.acf.info_mm
                    }),
                    images: [
                        {
                            url: p && p.acf.image.url,
                            width: 900,
                            height: 800,
                            alt: 'About Village - KawtDut Village',
                        }
                    ],
                }}
            />

            <Layout>
                {topBanner}
                <div 
                    className="bg-color"
                    style={{
                        padding: '2rem 0 4rem'
                    }}
                >
                    <div className="container">
                        {lists}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AboutUs
