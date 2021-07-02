import Link from 'next/link'
import { NextSeo } from 'next-seo'
import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import Layout from '../../components/layout/Layout'
import { CATEGORIES, NEWS } from '../../config/api'
import Skeleton from 'react-loading-skeleton'
import Moment from 'react-moment'
import 'moment/locale/my'
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    InstapaperShareButton
} from 'react-share'
import { IoLogoInstagram } from 'react-icons/io5'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { ImTwitter , ImLinkedin2 } from 'react-icons/im'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import RelatedNews from '../../components/news/RelatedNews'
// import { RWebShare } from 'react-web-share'


const NewsDetail = ({ item }) => {

    const [loading , setLoading] = React.useState(false)
    const themeStore = useSelector(state => state.theme)
    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'
    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const { data: p } = useSWR(
        NEWS + `/${item.id}?_embed=1`,
        () => axios.get(NEWS + `/${item.id}?_embed=1`).then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { data: relates } = useSWR(
        NEWS + '?per_page=10',
        () => axios.get(NEWS + '?per_page=10').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { data: categories } = useSWR(
        CATEGORIES,
        () => axios.get(CATEGORIES).then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    React.useEffect(() => {
        setTimeout(() => {
          setLoading(true)
        }, 1000)
    }, [])

    const topBanner = p && p ? (
        <div key={p.id} className="position-relative">
            <img 
                src={p.acf.image.url}
                alt=""
                className="w-100"
                style={{
                    height: '50vh',
                    minHeight: '400px',
                    objectFit: 'cover'
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
                    <h4 
                        className="mb-0 text-white"
                        style={{
                            fontSize: '2rem',
                            lineHeight: '1.5em',
                            fontFamily: lng === 'en' ? 'Inter Bold' : 'Myanmar Sans Pro, Mon'
                        }}

                    >
                        {t('a.d', {
                            d_mon: p.title.rendered,
                            d_mm: p.acf.title_mm
                        })}
                    </h4>
                </div>
            </div>
            
            {
                themeStore.theme === 'dark' ? (
                    <img 
                        src="/images/brush-bg-dark.png"
                        alt=""
                        className="position-absolute w-100"
                        style={{
                            left: 0,
                            right: 0,
                            bottom: '-1px',
                            transform: 'scaleX(-1)'
                        }}
                    />
                ) : (
                    <img 
                        src="/images/brush-bg.png"
                        alt=""
                        className="position-absolute w-100"
                        style={{
                            left: 0,
                            right: 0,
                            bottom: '-1px',
                            transform: 'scaleX(-1)'
                        }}
                    /> 
                )
            }

        </div>
    ) : (
        <Skeleton height={400} style={{ display: 'block' }} />
    )

    const lists = p && p ? (
        <div key={p.id} className="col-12 col-md-8">
            <div className="d-flex align-items-center mb-3">
                <small 
                    className="text-bold-color"
                    style={{
                        fontSize: '0.7rem'
                    }}
                >
                    <Moment format="dddd DD, MMMM, YYYY" locale="my">
                        {p.date}
                    </Moment>
                </small>
                <div className="ms-3">
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
                            className="text-decoration-none text-bold-color"
                            style={{
                                fontSize: '0.75rem',
                                fontFamily: 'Inter SemiBold'
                            }}
                        >
                            {p._embedded['author'][0].name}
                        </a>
                    </Link>
                </div>
            </div>
            <p 
                className="text-color"
                dangerouslySetInnerHTML={{
                    __html: t('a.d', {
                        d_mon: p.acf.description_mon,
                        d_mm: p.acf.description_mm
                    })
                }}
                style={{
                    lineHeight: lng === 'mon' || lng === 'mm' ? '2em' : '1.5em'
                }}
            />

            <div className="social-share">
                <div className="d-none d-md-flex mt-0 mt-md-5 align-items-center">
                    {/* <RWebShare
                        data={{
                            text: t('a.d' , {
                                d_mon: p.acf.info_mon,
                                d_mm: p.acf.info_mm
                            }),
                            url: w,
                            title: t('a.d' , {
                                d_mon: p.title.rendered,
                                d_mm: p.acf.title_mm
                            })
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <span className="text-color">
                            <AiOutlineShareAlt size="1.5rem" />
                        </span>
                    </RWebShare> */}

                    <span className="text-color me-3">
                        <AiOutlineShareAlt size="1.5rem" />
                    </span>
                    <FacebookShareButton 
                        className="me-2 rounded-circle" 
                        style={{
                            backgroundColor: '#3b5998',
                            width: '40px',
                            height: '40px'
                        }}
                        url={w}
                        quote={ p && t('a.d' , {
                            d_mon: p.title.rendered,
                            d_mm: p.acf.title_mm
                        })}
                    >
                        <RiFacebookCircleFill 
                            size="1rem" 
                            color="#fff" 
                        />
                    </FacebookShareButton>
                    <TwitterShareButton 
                        className="me-2 rounded-circle"
                        style={{
                            backgroundColor: '#00aced',
                            width: '40px',
                            height: '40px'
                        }}
                        url={w}
                        title={p && t('a.d' , {
                            d_mon: p.title.rendered,
                            d_mm: p.acf.title_mm
                        })}
                    >
                        <ImTwitter 
                            size="1rem" 
                            color="#fff" 
                        />
                    </TwitterShareButton>
                    <LinkedinShareButton 
                        className="me-2 rounded-circle"
                        style={{
                            backgroundColor: '#007fb1',
                            width: '40px',
                            height: '40px'
                        }}
                        url={w}
                    >
                        <ImLinkedin2 
                            size="1rem" 
                            color="#fff" 
                        />
                    </LinkedinShareButton>
                    <InstapaperShareButton
                        className="rounded-circle"
                        style={{
                            backgroundColor: '#e84e5e',
                            width: '40px',
                            height: '40px'
                        }}
                        url={w}
                        title={ p && t('a.d' , {
                            d_mon: p.title.rendered,
                            d_mm: p.acf.title_mm
                        })}
                    >
                        <IoLogoInstagram
                            size="1rem" 
                            color="#fff"
                        />
                    </InstapaperShareButton>
                </div>
                <div
                    className="d-flex d-md-none position-fixed align-items-center justify-content-between bg-color"
                    style={{
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 5
                    }}
                >
                    <span className="text-color mx-2 d-inline-block">
                        <AiOutlineShareAlt size="1.5rem" />
                    </span>
                    <FacebookShareButton 
                        className="flex-grow-1" 
                        style={{
                            backgroundColor: '#3b5998',
                            height: '40px'
                        }}
                        url={w}
                        quote={ p && t('a.d' , {
                            d_mon: p.title.rendered,
                            d_mm: p.acf.title_mm
                        })}
                    >
                        <RiFacebookCircleFill 
                            size="1rem" 
                            color="#fff" 
                        />
                    </FacebookShareButton>
                    <TwitterShareButton 
                        className="flex-grow-1"
                        style={{
                            backgroundColor: '#00aced',
                            height: '40px'
                        }}
                        url={w}
                        title={p && t('a.d' , {
                            d_en: p.title.rendered,
                            d_mon: p.acf.title_mon,
                            d_mm: p.acf.title_mm
                        })}
                    >
                        <ImTwitter 
                            size="1rem" 
                            color="#fff" 
                        />
                    </TwitterShareButton>
                    <LinkedinShareButton 
                        className="flex-grow-1"
                        style={{
                            backgroundColor: '#007fb1',
                            height: '40px'
                        }}
                        url={w}
                    >
                        <ImLinkedin2 
                            size="1rem" 
                            color="#fff" 
                        />
                    </LinkedinShareButton>
                    <InstapaperShareButton
                        className="flex-grow-1"
                        style={{
                            backgroundColor: '#e84e5e',
                            height: '40px'
                        }}
                        url={w}
                        title={ p && t('a.d' , {
                            d_en: p.title.rendered,
                            d_mon: p.acf.title_mon,
                            d_mm: p.acf.title_mm
                        })}
                    >
                        <IoLogoInstagram
                            size="1rem" 
                            color="#fff"
                        />
                    </InstapaperShareButton>
                </div>
            </div>

            <p className="mb-0 mt-4 pt-4 border-top">
                {
                    p._embedded['wp:term'][0].map(m => (
                        <Link 
                            href="/news/category/[id]"
                            as={`/news/category/${m.id}`}
                        >
                            <a 
                                className="text-decoration-none px-5 py-2 rounded-pill me-3 bg-light-color d-inline-block"
                                style={{
                                    fontSize: '0.9rem',
                                    lineHeight: 2,
                                    color: '#e0a604'
                                }}
                            >
                                {t('a.d', {
                                    d_mon: m.name,
                                    d_mm: m.acf.title_mm
                                })}
                            </a>
                        </Link>
                    ))
                }
            </p>
        </div>
    ) : (
        <div className="col-12 col-md-8">
            <div className="mb-3">
                <Skeleton height={15} width={140} />
            </div>
            <div className="mb-3" style={{lineHeight:2}}>
                <Skeleton count={5} height={21} />
            </div>
            <div className="mb-3" style={{lineHeight:2}}>
                <Skeleton count={5} height={21} />
            </div>
            <div className="mb-3" style={{lineHeight:2}}>
                <Skeleton count={5} height={21} />
            </div>
            <div className="mb-5" style={{lineHeight:2}}>
                <Skeleton count={5} height={21} />
            </div>
        </div>
    )

    const relateLists = relates && 
        relates
        .filter(f => 
            f.id !== (p && p.id) &&
            f.categories.find(m => m) === (p && p.categories.find(m => m))
        )
        .length ? (
            <>
                <h4 
                    className="mb-3 pb-3 border-bottom border-color text-bold-color"
                    style={{
                        fontSize: '1.3rem'
                    }}
                >
                    {t('a.d', {
                        d_mon: p._embedded['wp:term'][0][0].name,
                        d_mm: p._embedded['wp:term'][0][0].title_mm
                    })} {t('site.news')}
                </h4>
                {
                    relates
                    .filter(f => 
                        f.id !== (p && p.id) &&
                        f.categories.find(m => m) === (p && p.categories.find(m => m))
                    )
                    .map((m,i) => {
                        return(
                            <RelatedNews key={i} relatedNews={m} />
                        )
                    })
                }
            </>
        ) : (
            <>
                <div className="mb-3 pb-3 border-bottom border-color text-bold-color">
                    <Skeleton height={25} width={'75%'} />
                </div>

                {
                    Array(10).fill().map((item,index) => (
                        <div className="d-flex mb-3" key={index}>
                            <div 
                                style={{
                                    width: '120px'
                                }}
                                className="h-100"
                            >
                                <Skeleton height={70} />
                            </div>
                            <div className="ms-3 flex-grow-1">
                                <Skeleton height={22} count={2} />
                                <div className="mt-2">
                                    <Skeleton height={14} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </>
        )

    const categoyLists = categories && categories.filter(f => f.id !== 1 && f.id !== 2 && f.id !== 3 && f.id !== 4 && f.id !== 5).length ? (
        <div className="mt-5 pt-5">
            <h4 
                className="mb-3 pb-3 border-bottom border-color text-bold-color"
                style={{
                    fontSize: '1.3rem'
                }}
            >
                {t('site.news.categories')}
            </h4>

            {
                categories
                .filter(f => f.id !== 1 && f.id !== 2 && f.id !== 3 && f.id !== 4 && f.id !== 5)
                .map(m => (
                    <Link href="/news/category/[id]" as={`/news/category/${m.id}`} key={m.slug}>
                        <a 
                            className="text-decoration-none text-bold-color mb-3 d-block"
                            style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.5em'
                            }}
                        >
                            {t('a.d', {
                                d_mon: m.name,
                                d_mm: m.acf.title_mm
                            })}
                        </a>
                    </Link>
                ))
            }
        </div>
    ) : (
        <div className="mt-5 pt-5">
            <div className="mb-3 pb-3 border-bottom border-color text-bold-color">
                <Skeleton height={25} width={'75%'} />
            </div>

            {
                Array(5).fill().map((item,index) => (
                    <div className="mb-3" key={index}>
                        <Skeleton height={23} width={'50%'} />
                    </div>
                ))
            }
        </div>
    )

    const title = p && p ? (
        t('a.d', {
            d_mon: p.title.rendered,
            d_mm: p.acf.title_mm
        }) + ' - ' + t('site.main')
    ) : (
        'ကော့ဒွတ်ကျေးရွာ'
    )

    return (
        <>
            <NextSeo 
                title={loading ? title : 'ကော့ဒွတ်ကျေးရွာ'}
                description={ p && t('a.d', {
                    d_en: p.acf.info_en,
                    d_mon: p.acf.info_mon,
                    d_mm: p.acf.info_mm
                })}
                canonical={w}
                openGraph={{
                    url: w,
                    title: title,
                    description: p && t('a.d', {
                        d_en: p.acf.info_en,
                        d_mon: p.acf.info_mon,
                        d_mm: p.acf.info_mm
                    }),
                    images: [
                        {
                            url: p && p.acf.image.url,
                            width: 900,
                            height: 800,
                            alt: p && t('a.d', {
                                d_en: p.title.rendered,
                                d_mon: p.acf.title_mon,
                                d_mm: p.acf.title_mm
                            }),
                        }
                    ],
                }}
            />

            <Layout>
                {topBanner}
                <div 
                    className="bg-color"
                    style={{
                        padding: '2rem 0 4rem'
                    }}
                >
                    <div className="container">
                        <div className="row">
                            {lists}
                            <div className="col-12 col-md-4 mt-5 mt-md-0 ps-md-5">
                                {relateLists}
                                {categoyLists}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

NewsDetail.getInitialProps = (context) => {
    const { id } = context.query 
    return {
        item: {
            id
        }
    }
}

export default NewsDetail
