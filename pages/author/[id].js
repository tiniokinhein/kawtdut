import Link from 'next/link'
import { NextSeo } from 'next-seo'
import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import Layout from '../../components/layout/Layout'
import Skeleton from 'react-loading-skeleton'
import Moment from 'react-moment'
import 'moment/locale/my'
import { NEWS, USERS } from '../../config/api'
import { BiRightArrow } from 'react-icons/bi'

const AuthorDetail = ({ item }) => {

    const { t } = useTranslation()
    const [loading , setLoading] = React.useState(false)
    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const { data: posts  } = useSWR(
        NEWS + `?author=${item.id}`,
        () => axios.get(NEWS + `?author=${item.id}`).then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { data: p } = useSWR(
        USERS + `/${item.id}`,
        () => axios.get(USERS + `/${item.id}`).then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    React.useEffect(() => {
        setTimeout(() => {
          setLoading(true)
        }, 1000)
    }, [])

    const topBanner = (
        <div
            className="bg-secondary"
            style={{
                paddingTop: '8rem',
                paddingBottom: '8rem'
            }}
        >
            <div className="container">
                <h4 
                    className="mb-0 text-white"
                    style={{
                        fontSize: '2rem',
                        lineHeight: '1.5em'
                    }}

                >
                    {p && p.name}
                </h4>
            </div>
        </div>
    ) 

    const lists = posts && posts.length ? (
        posts.map(p => (
            <div className="col-12 col-lg-6 mb-4" key={p.id}>
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
                                className="mt-2 text-decoration-none text-bold-color overflow-hidden"
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
    ) : (
        Array(8).fill().map((item,index) => (
            <div className="col-12 col-lg-6 mb-4" key={index}>
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
    )


    const title = p && p ? (p.name) + ' - ' + t('site.main') : ('ကော့ဒွတ်ကျေးရွာ')

    return (
        <>
            <NextSeo 
                title={loading ? title : 'ကော့ဒွတ်ကျေးရွာ'}
                description={ p && t('a.d', {
                    d_mon: p.description,
                    d_mm: p.description
                })}
                canonical={w}
                openGraph={{
                    url: w,
                    title: title,
                    description: p && t('a.d', {
                        d_mon: p.description,
                        d_mm: p.description
                    }),
                    images: [
                        {
                            url: '/icons/large.png',
                            width: 900,
                            height: 800,
                            alt: ''
                        }
                    ],
                }}
            />

            <Layout>
                {topBanner}
                <div 
                    className="bg-color"
                    style={{
                        padding: '4rem 0 2rem'
                    }}
                >
                    <div className="container">
                        <div className="row">
                            {lists}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

AuthorDetail.getInitialProps = (context) => {
    const { id } = context.query
    return {
        item: {
            id
        }
    }
}

export default AuthorDetail
