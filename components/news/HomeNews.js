import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { NEWS } from '../../config/api'
import Moment from 'react-moment'
import 'moment/locale/my'
import { BiRightArrow } from 'react-icons/bi'
import Skeleton from 'react-loading-skeleton'

const HomeNews = () => {

    const { t } = useTranslation()

    const { data: news } = useSWR(
        NEWS + '?per_page=2',
        () => axios.get(NEWS + '?per_page=2').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const lists = news && news.length ? (
        <div className="row">
            {
                news.map(p => (
                    <div className="col-12 col-lg-6 mb-4 mb-lg-0" key={p.id}>
                        <div className="row h-100">
                            <div className="col-12 col-md-6 mb-3 mb-md-0 position-relative">
                                <Link href="/news/[id]" as={`/news/${p.id}`}>
                                    <a 
                                        className="text-decoration-none"
                                    >
                                        <img 
                                            src={p.acf.image.url}
                                            alt=""
                                            className="w-100 h-100 rounded-1"
                                            style={{
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </a>
                                </Link>
                                <Link href="/news/[id]" as={`/news/${p.id}`}>
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
                            <div className="col-12 col-md-6">
                                <small 
                                    className="text-color position-relative d-block"
                                    style={{
                                        fontSize: '0.7rem',
                                        marginTop: '-5px'
                                    }}
                                >
                                    <Moment format="dddd DD, MMMM, YYYY" locale="my">
                                        {p.date}
                                    </Moment>
                                </small>
                                <Link 
                                    href="/news/[id]"
                                    as={`/news/${p.id}`}
                                >
                                    <a 
                                        className="text-decoration-none text-bold-color overflow-hidden"
                                        style={{
                                            fontSize: '1.5rem',
                                            lineHeight: '1.5em',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                    >
                                        {t('a.d', {
                                            d_mon: p.title.rendered,
                                            d_mm: p.acf.title_mm
                                        })}
                                    </a>
                                </Link>
                                <p 
                                    className="mt-2 mb-0 text-color overflow-hidden"
                                    style={{
                                        lineHeight: '1.7em',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 5,
                                        WebkitBoxOrient: 'vertical'
                                    }}
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
                ))
            }
        </div>
    ) : (
        <div className="row">
            {
                Array(2).fill().map((item,index) => (
                    <div className="col-12 col-lg-6 mb-4 mb-lg-0" key={index}>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3 mb-md-0">
                                <Skeleton height={'100%'} />
                            </div>
                            <div className="col-12 col-md-6">
                                <Skeleton height={13} width={'50%'} />
                                <Skeleton count={2} height={25} />
                                <div className="mt-2 mb-0">
                                    <Skeleton count={3} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )

    return (
        <div
            className="bg-light-color"
            style={{
                paddingTop: '4rem',
                paddingBottom: '4rem'
            }}
        >
            <div className="container">
                <h4 
                    className="mb-4 pb-2 text-bold-color text-uppercase text-center"
                    style={{
                        fontSize: '1.7rem'
                    }}
                >
                    {t('site.news')}
                </h4>
                {lists}
            </div>
        </div>
    )
}

export default HomeNews
