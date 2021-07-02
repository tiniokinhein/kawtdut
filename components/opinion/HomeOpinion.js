import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { useTranslation } from 'react-i18next'
import { OPINIONS } from '../../config/api'
import Moment from 'react-moment'
import 'moment/locale/my'
import Skeleton from 'react-loading-skeleton'

export default function HomeOpinion() {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'
    
    const { data:posts } = useSWR(
        OPINIONS + '?per_page=3&_embed=1',
        () => axios.get(OPINIONS + '?per_page=3&_embed=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const lists = posts && posts.length ? (
        <>
            <h4 
                className="mb-4 pb-2 text-bold-color text-uppercase text-center"
                style={{
                    fontSize: '1.7rem',
                    fontFamily: lng === 'en' ? 'Inter Bold' : 'Myanmar Sans Pro, Mon'
                }}
            >
                {t('site.opinions')}
            </h4>
            <div className="row">
                {
                    posts.map(p => (
                        <div className="col-12 col-md-6 col-lg-3 mb-3" key={p.id}>
                            <Link 
                                href="/opinion/[id]"
                                as={`/opinion/${p.id}`}
                            >
                                <a 
                                    className="text-decoration-none"
                                >
                                    <img 
                                        src={p.acf.image.url}
                                        alt=""
                                        className="w-100"
                                        style={{
                                            height: '270px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </a>
                            </Link>
                            <div className="px-3 py-4 border-start border-end border-bottom border-color">
                                <Link 
                                    href="/opinion/[id]"
                                    as={`/opinion/${p.id}`}
                                >
                                    <a 
                                        className="text-decoration-none text-bold-color mb-2 d-block text-truncate"
                                        style={{
                                            fontSize: '1rem',
                                            fontFamily: lng === 'en' ? 'Inter SemiBold' : 'Myanmar Sans Pro, Mon'
                                        }}
                                    >
                                        {t('a.d', {
                                            d_mon: p.title.rendered,
                                            d_mm: p.acf.title_mm
                                        })}
                                    </a>
                                </Link>
                                <div className="d-flex align-items-center justify-content-between">
                                    <small 
                                        className="text-bold-color"
                                        style={{
                                            fontSize: '0.7rem'
                                        }}
                                    >
                                        <Moment fromNow locale="my" >
                                            {p.date}
                                        </Moment>
                                    </small>
                                    <div className="text-end">
                                        <span
                                            className="me-1 text-color"
                                            style={{
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            By
                                        </span>
                                        <Link 
                                            href="/author/[id]"
                                            as={`/author/${p._embedded['author'][0].id}`}
                                        >
                                            <a 
                                                className="text-decoration-none text-bold-color text-uppercase"
                                                style={{
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {p._embedded['author'][0].name}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
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
            <div className="row">
                {
                    Array(3).fill().map((item,index) => (
                        <div className="col-12 col-sm-6 col-md-3 mb-3" key={index}>
                            <div 
                                className="w-100"
                                style={{
                                    height: '270px',
                                }}
                            >
                                <Skeleton height={'100%'} />
                            </div>
                            <div className="px-3 py-4 border-start border-end border-bottom border-color">
                                <div 
                                    className="mb-2"
                                    style={{
                                        fontSize: '1rem',
                                        fontFamily: lng === 'en' ? 'Inter SemiBold' : 'Myanmar Sans Pro, Mon'
                                    }}
                                >
                                    <Skeleton height={20} />
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <Skeleton height={14} width={50} />
                                    <Skeleton height={15} width={110} />
                                </div>
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
