import Link from 'next/link'
import { NextSeo } from 'next-seo'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { NEWS } from '../config/api'
import Layout from '../components/layout/Layout'
import Moment from 'react-moment'
import 'moment/locale/my'
import { BiRightArrow } from 'react-icons/bi'
import Skeleton from 'react-loading-skeleton'
import { Pagination } from '../components/pagination/Pagination'

const News = () => {

    const [loading , setLoading] = React.useState(false)
    const [currentPage , setCurrentPage] = React.useState(1)
    const [postsPerPage] = React.useState(20)
    const { t } = useTranslation()
    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const { data: news } = useSWR(
        NEWS + '?per_page=100&offset=1',
        () => axios.get(NEWS + '?per_page=100&offset=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { data: latestNews } = useSWR(
        NEWS + '?per_page=1',
        () => axios.get(NEWS + '?per_page=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1000)
    }, [])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = news && news.slice(indexOfFirstPost,indexOfLastPost)

    const paginate = (number) => {
        setCurrentPage(number)
        typeof window !== 'undefined' ? window.scrollTo(0,0) : 'undefined'
    }

    const topBanner = latestNews && latestNews.length ? (
        <div className="position-relative">
            <img 
                src={latestNews[0].acf.image.url}
                alt=""
                className="w-100"
                style={{
                    height: '50vh',
                    minHeight: '500px',
                    objectFit: 'cover',
                    filter: 'brightness(30%)'
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
                    <div className="col-12 col-md-6 mx-auto px-0 text-center">
                        <small 
                            className="text-white-50"
                            style={{
                                fontSize: '0.7rem'
                            }}
                        >
                            <Moment fromNow locale="my">
                                {latestNews[0].date}
                            </Moment>
                        </small>
                        <Link 
                            href="/news/[id]"
                            as={`/news/${latestNews[0].id}`}
                        >
                            <a 
                                className="text-decoration-none text-white mt-2 overflow-hidden"
                                style={{
                                    fontSize: '1.9rem',
                                    lineHeight: '1.5em',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}
                            >
                                {t('a.d', {
                                    d_mon: latestNews[0].title.rendered,
                                    d_mm: latestNews[0].acf.title_mm
                                })}
                            </a>
                        </Link>
                        <p 
                            className="mt-3 mb-4 text-white-50 overflow-hidden"
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                lineHeight: '1.7em'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    'a.d',
                                    {
                                        d_mon: latestNews[0].acf.info_mon,
                                        d_mm: latestNews[0].acf.info_mm
                                    }
                                )
                            }}
                        />
                        <Link 
                            href="/news/[id]"
                            as={`/news/${latestNews[0].id}`}
                        >
                            <a
                                className="link-pulse-overlay rounded-circle text-center d-inline-block"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    lineHeight: '56px',
                                    color: '#fff'
                                }}
                            >
                                <BiRightArrow size="1.6rem" />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>            
        </div>
    ) : (
        <Skeleton height={500} style={{ display: 'block' }} />
    )

    const lists = currentPosts && currentPosts.length ? (
        <div className="row">
            {
                currentPosts.map(p => (
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
            }
        </div>
    ) : (
        <div className="row">
            {
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
            }
        </div>
    )

    const title = t('site.news') + ' - ' + t('site.main')

    return (
        <>
            <NextSeo
                title={loading ? title : 'ကော့ဒွတ်ကျေးရွာ'}
                description=''
                canonical={w}
                openGraph={{
                    url: w,
                    title: title,
                    description: '',
                    images: [
                        {
                            url: '',
                            width: 900,
                            height: 800,
                            alt: t('site.upcoming'),
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

                        {
                            postsPerPage >= 21 ? (
                                <div className="text-center mt-2">
                                    <Pagination
                                        totalPosts={news && news.length}
                                        postsPerPage={postsPerPage}
                                        paginate={paginate}
                                        view={6}
                                        justify="center"
                                        color="#fff"
                                        bgColor="#ababab"
                                        selectColor="#e0a604"
                                        indexbgColor="#e0a604"
                                        boxWidth="35px"
                                        boxHeight="35px"
                                        showIndex={true}
                                        indexBorderRadius="20px"
                                        // showLast={true}
                                        // showFirst={true}
                                        // showFirstText={'First'}
                                        // showLastText={'Last'}
                                    />
                                </div>
                            ) : null
                        }

                    </div>
                </div>
            </Layout>
        </>
    )
}

export default News
