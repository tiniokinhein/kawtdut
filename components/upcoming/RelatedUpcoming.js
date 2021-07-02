import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'

const RelatedUpcoming = ({ relatedUpcomings }) => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'

    return (
        <div className="d-flex mb-3">
            <Link href="/upcoming/[id]" as={`/upcoming/${relatedUpcomings.id}`}>
                <a className="text-decoration-none img-a-link">
                    <img 
                        src={relatedUpcomings.acf.image.url}
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
                <Link href="/upcoming/[id]" as={`/upcoming/${relatedUpcomings.id}`}>
                    <a 
                        className="text-decoration-none text-bold-color"
                        style={{
                            fontSize: '0.9rem',
                            fontFamily: lng === 'en' ? 'Inter Bold' : 'Myanmar Sans Pro, Mon',
                            lineHeight: '1.5em',
                            overflowX: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {t('a.d', {
                            d_mon: relatedUpcomings.title.rendered,
                            d_mm: relatedUpcomings.acf.title_mm
                        })}
                    </a>
                </Link>
                <p 
                    className="text-bold-color mb-0"
                    style={{
                        fontSize: '0.7rem'
                    }}
                >
                    <Moment fromNow >
                        {relatedUpcomings.date}
                    </Moment>
                </p>
            </div>
        </div>
    )
}

export default RelatedUpcoming
