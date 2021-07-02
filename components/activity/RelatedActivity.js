import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'

const RelatedActivity = ({ relatedActivities }) => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'

    return (
        <div className="d-flex mb-3">
            <Link href="/activity/[id]" as={`/activity/${relatedActivities.id}`}>
                <a className="text-decoration-none img-a-link">
                    <img 
                        src={relatedActivities.acf.image.url}
                        alt=""
                        className="h-100"
                        style={{
                            width: '120px',
                            objectFit: 'cover'
                        }}
                    />
                </a>
            </Link>
            <div className="ms-3">
                <Link href="/activity/[id]" as={`/activity/${relatedActivities.id}`}>
                    <a 
                        className="text-decoration-none text-bold-color"
                        style={{
                            fontSize: '0.9rem',
                            overflowX: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: '1.5em'
                        }}
                    >
                        {t('a.d', {
                            d_mon: relatedActivities.title.rendered,
                            d_mm: relatedActivities.acf.title_mm
                        })}
                    </a>
                </Link>
                <p 
                    className="text-bold-color mb-0 d-flex align-items-center justify-content-between"
                    style={{
                        fontSize: '0.7rem'
                    }}
                >
                    <Moment fromNow >
                        {relatedActivities.date}
                    </Moment>

                    {/* <Link 
                        href="/author/[id]"
                        as={`/author/${relatedActivities._embedded['author'][0].id}`}
                    >
                        <a 
                            className="text-decoration-none text-color text-uppercase"
                            style={{
                                fontSize: '0.6rem',
                                fontFamily: 'Inter Bold'
                            }}
                        >
                            {relatedActivities._embedded['author'][0].name}
                        </a>
                    </Link> */}
                </p>
            </div>
        </div>
    )
}

export default RelatedActivity
