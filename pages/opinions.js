import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout/Layout'
import useSWR from 'swr'
import { OPINIONS } from '../config/api'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import 'moment/locale/my'
import { Pagination } from '../components/pagination/Pagination'
import { BiRightArrow } from 'react-icons/bi'

const Opinions = () => {

    const [loading , setLoading] = React.useState(false)
    const [currentPage , setCurrentPage] = React.useState(1)
    const [postsPerPage] = React.useState(16)
    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'
    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const { data: posts } = useSWR(
        OPINIONS + '?per_page=100&offset=1&_embed=1',
        () => axios.get(OPINIONS + '?per_page=100&offset=1&_embed=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { data: postsNew } = useSWR(
        OPINIONS + '?per_page=1',
        () => axios.get(OPINIONS + '?per_page=1').then(res => res.data),
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
                            href="/opinion/[id]"
                            as={`/opinion/${postsNew[0].id}`}
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
                            href="/opinion/[id]"
                            as={`/opinion/${postsNew[0].id}`}
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
        <>
            {/* <h4 
                className="mb-4 text-bold-color text-uppercase text-center"
                style={{
                    fontSize: '1.7rem',
                    fontFamily: lng === 'en' ? 'Inter Bold' : 'Myanmar Sans Pro, Mon'
                }}
            >
                {t('site.opinions')}
            </h4> */}
            <div className="row">
                {
                    currentPosts.map(p => (
                        <div className="col-12 col-md-6 col-lg-3 mb-4" key={p.id}>
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
                                        <Moment format="dddd DD, MMMM, YYYY" locale="my" >
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
            {/* <div 
                className="mb-4 text-center"
            >
                <Skeleton height={30} width={130} />
            </div> */}
            <div className="row">
                {
                    Array(16).fill().map((item,index) => (
                        <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
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

    const title = t('site.opinions') + ' - ' + t('site.main')

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
                            alt: t('site.opinions'),
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

export default Opinions
