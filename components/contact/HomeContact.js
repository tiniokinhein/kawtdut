import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { PAGES } from '../../config/api'
import Skeleton from 'react-loading-skeleton'

const HomeContact = () => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? localStorage.getItem('18nextLng') : 'undefined'

    const { data: p } = useSWR(
        PAGES + '/171',
        () => axios.get(PAGES + '/171').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const lists = p ? (
        <div className="col-12 col-md-6 mx-auto px-0 text-center" key={p.id}>
            <p 
                className="text-color mb-4"
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
            <Link href="/contact-us">
                <a
                    className="link-pulse-overlay rounded-pill text-center d-inline-block text-decoration-none px-5 py-3"
                    style={{
                        color: '#fff',
                        fontSize: '0.8rem'
                    }}
                >
                    {
                        t('a.d', {
                            d_mon: p.title.rendered,
                            d_mm: p.acf.title_mm
                        })
                    }
                </a>
            </Link>
        </div>
    ) : (
        <div className="col-12 col-md-6 mx-auto px-0 text-center">
            <div className="mb-4">
                <Skeleton height={20} />
            </div>
            <Link href="/contact-us">
                <a
                    className="link-pulse-overlay rounded-pill text-center d-inline-block text-decoration-none px-5 py-3"
                    style={{
                        color: '#fff',
                        fontSize: '0.8rem'
                    }}
                >
                    
                </a>
            </Link>
        </div>
    )

    return (
        <div
            className="bg-color"
            style={{
                paddingBottom: '5rem',
                paddingTop: '5rem'
            }}
        >
            <div className="container">
                {lists}
            </div>
        </div>
    )
}

export default HomeContact
