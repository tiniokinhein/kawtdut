import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout/Layout'
import useSWR from 'swr'
import { UPCOMINGS } from '../config/api'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import 'moment/locale/my'
import { Pagination } from '../components/pagination/Pagination'
import { BiRightArrow } from 'react-icons/bi'

const Upcoming = () => {
    
    const [loading , setLoading] = React.useState(false)
    const [currentPage , setCurrentPage] = React.useState(1)
    const [postsPerPage] = React.useState(16)
    const { t } = useTranslation()
    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const { data: posts } = useSWR(
        UPCOMINGS + '?per_page=100&offset=1',
        () => axios.get(UPCOMINGS + '?per_page=100&offset=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { data: postsNew } = useSWR(
        UPCOMINGS + '?per_page=1',
        () => axios.get(UPCOMINGS + '?per_page=1').then(res => res.data),
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
    const currentPosts = posts && posts.slice(indexOfFirstPost,indexOfLastPost)

    const paginate = (number) => {
        setCurrentPage(number)
        typeof window !== 'undefined' ? window.scrollTo(0,0) : 'undefined'
    }

    const topBanner = postsNew && postsNew.length ? (
        <div className="position-relative">
            <img 
                src={postsNew[0].acf.image.url}
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
                    <div className="col-12 col-md-6">
                        <small 
                            className="text-white-50"
                            style={{
                                fontSize: '0.7rem'
                            }}
                        >
                            <Moment fromNow locale="my">
                                {postsNew[0].date}
                            </Moment>
                        </small>
                        <Link 
                            href="/upcoming/[id]"
                            as={`/upcoming/${postsNew[0].id}`}
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
                                    d_mon: postsNew[0].title.rendered,
                                    d_mm: postsNew[0].acf.title_mm
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
                                        d_mon: postsNew[0].acf.info_mon,
                                        d_mm: postsNew[0].acf.info_mm
                                    }
                                )
                            }}
                        />
                        <Link 
                            href="/upcoming/[id]"
                            as={`/upcoming/${postsNew[0].id}`}
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
        currentPosts.map(p => (
            <div className="row mb-5" key={p.id}>
                <div className="col-12 col-md-8 order-2 order-md-1">
                    <Link 
                        href="/upcoming/[id]"
                        as={`/upcoming/${p.id}`}
                    >
                        <a 
                            className="text-decoration-none text-bold-color overflow-hidden"
                            style={{
                                fontSize: '1.6rem',
                                lineHeight: '1.5em',
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
                    <small 
                        className="text-color"
                        style={{
                            fontSize: '0.7rem'
                        }}
                    >
                        <Moment format="dddd DD, MMMM, YYYY" locale="my">
                            {p.date}
                        </Moment>
                    </small>
                    <p 
                        className="mt-2 mb-4 text-color"
                        style={{
                            lineHeight: '1.7em',
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
                    <Link 
                        href="/upcoming/[id]"
                        as={`/upcoming/${p.id}`}
                    >
                        <a
                            className="link-pulse-overlay text-decoration-none rounded-pill text-center d-inline-block px-5 py-3"
                            style={{
                                color: '#fff'
                            }}
                        >
                            {t('site.read.more')}
                        </a>
                    </Link>
                </div>
                <div className="col-12 col-md-4 order-1 order-md-2 mb-4 mb-md-0 position-relative">
                    <Link 
                        href="/upcoming/[id]"
                        as={`/upcoming/${p.id}`}
                    >
                        <a 
                            className="text-decoration-none"
                        >
                            <img 
                                src={p.acf.image.url}
                                alt=""
                                className="w-100 h-100"
                                style={{
                                    objectFit: 'cover'
                                }}
                            />
                        </a>
                    </Link>
                </div>
            </div>
        ))
    ) : (
        Array(6).fill().map((item,index) => (
            <div className="row mb-5" key={index}>
                <div className="col-12 col-md-8 order-2 order-md-1">
                    <div className="mb-1">
                        <Skeleton height={35} count={2} />
                    </div>
                    <Skeleton width={80} height={14} />
                    <div className="mt-2 mb-4">
                        <Skeleton count={3} />
                    </div>
                </div>
                <div className="col-12 col-md-4 order-1 order-md-2 mb-4 mb-md-0 position-relative">
                    <Skeleton height={'100%'} />
                </div>
            </div>
        ))
    )

    const title = t('site.upcoming') + ' - ' + t('site.main')

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
                        padding: '4rem 0 1rem'
                    }}
                >
                    <div className="container">
                        {lists}

                        {
                            postsPerPage >= 17 ? (
                                <div className="text-center mt-2">
                                    <Pagination
                                        totalPosts={posts && posts.length}
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

export default Upcoming
