import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { UPCOMINGS } from '../../config/api'
import { useTranslation } from 'react-i18next'

const HomeUpcoming = () => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'

    const { data: posts } = useSWR(
        UPCOMINGS + '?per_page=1',
        () => axios.get(UPCOMINGS + '?per_page=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    return (
        posts && posts.length ? (
            posts.map(p => (
                <div
                    key={p.id}
                    className="py-5"
                    style={{
                        background: "url("+ p.acf.image.url +") no-repeat center / cover fixed"
                    }}
                >
                    <div className="container py-5">
                        <div className="py-5 text-center">
                            <h4 
                                className="mb-3 text-light"
                                style={{
                                    fontSize: '1.8rem'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: t('a.d', {
                                        d_mon: p.title.rendered,
                                        d_mm: p.acf.title_mm
                                    })
                                }}
                            />
                            <p 
                                className="mb-4 text-white"
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
                            <Link href="/upcoming/[id]" as={`/upcoming/${p.id}`}>
                                <a
                                    className="link-pulse-overlay rounded-pill text-center d-inline-block px-5 text-decoration-none"
                                    style={{
                                        height: '60px',
                                        lineHeight: '56px',
                                        color: '#fff'
                                    }}
                                >
                                    {t('site.read.more')}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <></>
        )
    )
}

export default HomeUpcoming
