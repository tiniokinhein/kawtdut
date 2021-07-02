import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { PAGES } from '../../config/api'
import useSWR from 'swr'
import { BiRightArrow } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'

const HomeAboutInfo = () => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'

    const { data:p } = useSWR(
        PAGES + '/73',
        () => axios.get(PAGES + '/73').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const lists = p ? (
        <div key={p.id} className="text-center">
            <h4 
                className="mb-3 text-bold-color text-uppercase"
                style={{
                    fontSize: '1.7rem',
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
            <p 
                className="mb-0 pb-5 text-color col-12 col-md-8 px-0 mx-auto"
                dangerouslySetInnerHTML={{
                    __html: t('a.d', {
                        d_mon: p.acf.info_mon,
                        d_mm: p.acf.info_mm
                    })
                }}
                style={{
                    lineHeight: lng === 'mon' || lng === 'mm' ? '2em' : '1.5em'
                }}
            />
        </div>
    ) : (
        <>
            <div className="text-center mb-3">
                <Skeleton height={30} width={300} />
            </div>
            <div className="col-12 col-sm-10 col-md-6 mx-auto mb-5">
                <Skeleton 
                    height={20} 
                    count={3} 
                    width={'100%'}
                    style={{
                        display: 'block',
                        margin: '5px auto'
                    }}
                />
            </div>
        </>
    )

    const imageList = p ? (
        <div className="position-relative">
            <img 
                key={p.id}
                src={p.acf.image.url}
                alt=""
                className="w-100"
                style={{
                    height: '500px',
                    objectFit: 'cover'
                }}
            />
            <Link href="/about-us">
                <a
                    className="link-pulse-overlay rounded-circle text-center position-absolute"
                    style={{
                        width: '60px',
                        height: '60px',
                        lineHeight: '56px',
                        color: '#fff',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-30px',
                        marginTop: '-30px'
                    }}
                >
                    <BiRightArrow size="1.6rem" />
                </a>
            </Link>
        </div>
    ) : (
        <Skeleton height={500} style={{ display: 'block' }} />
    )

    return (
        <div 
            className="bg-color"
            style={{
                paddingTop: '4rem'
            }}
        >
            <div className="container">
                {lists}
            </div>
            {imageList}
        </div>
    )
}

export default HomeAboutInfo
