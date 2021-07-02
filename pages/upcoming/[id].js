import { NextSeo } from 'next-seo'
import React from 'react'
import axios from 'axios'
import Layout from '../../components/layout/Layout'
import { UPCOMINGS } from '../../config/api'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'
import RelatedUpcoming from '../../components/upcoming/RelatedUpcoming'
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


const UpcomingDetail = ({ item }) => {

    const [loading , setLoading] = React.useState(false)
    const themeStore = useSelector(state => state.theme)
    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'
    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const { data:p } = useSWR(
        UPCOMINGS + `/${item.id}`,
        () => axios.get(UPCOMINGS + `/${item.id}`).then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { data:relates } = useSWR(
        UPCOMINGS + '?per_page=11',
        () => axios.get(UPCOMINGS + '?per_page=11').then(res => res.data),
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
        <div 
            key={p.id} 
            className="position-relative"
        >
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
            <p 
                className="text-bold-color mb-3"
                style={{
                    fontSize: '0.8rem'
                }}
            >
                <Moment format="dddd DD, MMMM, YYYY" locale="my">
                    {p.date}
                </Moment>
            </p>
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
                            d_en: p.title.rendered,
                            d_mon: p.acf.title_mon,
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
            </div>
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

    const relateLists = relates && relates.length ? (
        <div className="col-12 col-md-4 mt-5 mt-md-0 ps-md-5">
            <div 
                className="sticky-top"
                style={{
                    top: '75px',
                    zIndex: 0
                }}
            >
                <h4 
                    className="mb-3 pb-3 border-bottom border-color text-bold-color"
                    style={{
                        fontSize: '1.3rem',
                        fontFamily: lng === 'en' ? 'Inter Bold' : 'Myanmar Sans Pro, Mon'
                    }}
                >
                    {t('site.more.upcoming')}
                </h4>
                {
                    relates
                    .filter(f => f.id !== (p && p.id))
                    .map((m,i) => {
                        return(
                            <RelatedUpcoming key={i} relatedUpcomings={m} />
                        )
                    })
                }
            </div>
        </div>
    ) : (
        <div className="col-12 col-md-4 mt-5 mt-md-0 ps-md-5">
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
                            <Skeleton height={56} />
                        </div>
                        <div className="ms-3 flex-grow-1">
                            <Skeleton height={24} />
                            <div className="mt-1">
                                <Skeleton height={14} width={60} />
                            </div>
                        </div>
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
                    d_mon: p.acf.info_mon,
                    d_mm: p.acf.info_mm
                })}
                canonical={w}
                openGraph={{
                    url: w,
                    title: title,
                    description: p && t('a.d', {
                        d_mon: p.acf.info_mon,
                        d_mm: p.acf.info_mm
                    }),
                    images: [
                        {
                            url: p && p.acf.image.url,
                            width: 900,
                            height: 800,
                            alt: p && t('a.d', {
                                d_mon: p.title.rendered,
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
                            {relateLists}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

UpcomingDetail.getInitialProps = (context) => {
    const { id } = context.query
    return {
        item: {
            id
        }
    }
}

export default UpcomingDetail
