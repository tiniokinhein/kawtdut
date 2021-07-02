import { NextSeo } from 'next-seo'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import Layout from '../components/layout/Layout'
import { PAGES } from '../config/api'
import Skeleton from 'react-loading-skeleton'

const DonateUs = () => {

    const { t } = useTranslation()

    const { data: p } = useSWR(
        PAGES + '/136',
        () => axios.get(PAGES + '/136').then(res => res.data),
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
                            fontSize: '2rem'
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
                        lineHeight: '2em'
                    }}
                />
            </div>
            <div className="col-12 col-md-4">
                
            </div>
        </div>
    ) : (
        <div className="row">
            <div className="col-12 col-md-8 mb-4 mb-md-0">
                <div className="mb-3" style={{lineHeight:2}}>
                    <Skeleton count={5} height={21} />
                </div>
            </div>
            <div className="col-12 col-md-4">
                
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
                        padding: '4rem 0'
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

export default DonateUs
