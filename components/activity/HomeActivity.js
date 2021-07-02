import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import { ACTIVITIES } from '../../config/api'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import 'moment/locale/my'

const HomeActivity = () => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'
    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const { data:posts } = useSWR(
        ACTIVITIES + '?per_page=4',
        () => axios.get(ACTIVITIES + '?per_page=4').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const lists = posts && posts.length ? (
        <>
            <h4 
                className="mb-4 pb-2 text-bold-color text-uppercase text-center"
                style={{
                    fontSize: '1.7rem'
                }}
            >
                {t('site.activities')}
            </h4>
            <div className="row mx-0">
                {
                    posts.map(p => (
                        <div className="col-12 col-sm-6 col-md-3 px-0 position-relative" key={p.id}>
                            <Link 
                                href="/activity/[id]"
                                as={`/activity/${p.id}`}
                            >
                                <a 
                                    className="text-decoration-none"
                                >
                                    <img 
                                        src={p.acf.image.url}
                                        alt=""
                                        className="w-100"
                                        style={{
                                            height: '400px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </a>
                            </Link>
                            <div 
                                className="px-3 py-4 position-absolute"
                                style={{
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'transparent',
                                    backgroundImage: 'linear-gradient(0, #000, transparent)'
                                }}
                            >
                                <small 
                                    className="text-white"
                                    style={{
                                        fontSize: '0.7rem'
                                    }}
                                >
                                    <Moment fromNow locale="my">
                                        {p.date}
                                    </Moment>
                                </small>
                                <Link 
                                    href="/activity/[id]"
                                    as={`/activity/${p.id}`}
                                >
                                    <a 
                                        className="text-decoration-none text-light mt-2 overflow-hidden"
                                        style={{
                                            fontSize: '1rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                    >
                                        {t('a.d', {
                                            d_mon: p.title.rendered,
                                            d_mm: p.acf.title_mm
                                        })}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    ) : (
        <>
            <div 
                className="mb-4 pb-2 text-center"
            >
                <Skeleton height={30} width={130} />
            </div>
            <div className="row mx-0">
                {
                    Array(4).fill().map((item,index) => (
                        <div className="col-12 col-sm-6 col-md-3 px-0" key={index}>
                            <div 
                                className="w-100"
                                style={{
                                    height: '400px',
                                }}
                            >
                                <Skeleton height={'100%'} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )

    return (
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
    )
}

export default HomeActivity
