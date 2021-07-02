import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { PAGES } from '../../config/api'
import useSWR from 'swr'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'

const HomeDonate = () => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'

    const { data:p } = useSWR(
        PAGES + '/136',
        () => axios.get(PAGES + '/136').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const lists = p ? (
        <div className="row col-12 col-md-8 mx-auto" key={p.id}>
            <div className="col-12 col-md-8 mb-3 mb-md-0 px-0 px-md-3">
                <h4 
                    className="mb-3 text-bold-color text-uppercase"
                    style={{
                        fontSize: '1.7rem'
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
                    className="text-color"
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
            <div className="col-12 col-md-4 px-0 px-md-3">
            <Link href="/donate-us">
                    <a
                        className="link-pulse-overlay rounded-pill text-center d-flex align-items-center justify-content-center text-decoration-none w-100 h-100 px-5 py-4 px-md-0 py-md-0"
                        style={{
                            color: '#fff',
                            fontSize: '0.8rem'
                        }}
                    >
                        {t('site.donate.here')}
                    </a>
                </Link>
            </div>
        </div>
    ) : (
        <div className="row col-12 col-md-8 mx-auto">
            <div className="col-12 col-md-8 mb-3 mb-md-0 px-0 px-md-3">
                <div
                    className="mb-3"
                >
                    <Skeleton height={30} width={120} />
                </div>
                <Skeleton height={20} />
            </div>
            <div className="col-12 col-md-4 px-0 px-md-3">
                <Link href="/donate-us">
                    <a
                        className="link-pulse-overlay rounded-pill text-center d-flex align-items-center justify-content-center text-decoration-none w-100 h-100 px-5 py-4 px-md-0 py-md-0"
                        style={{
                            color: '#fff',
                            fontSize: '0.8rem'
                        }}
                    >
                        {t('site.donate.here')}
                    </a>
                </Link>
            </div>
        </div>
    )

    return (
        <div
            className="bg-light-color"
            style={{
                paddingBottom: '4rem',
                paddingTop: '4rem'
            }}
        >
            <div className="container">
                {lists}
            </div>
        </div>
    )
}

export default HomeDonate
