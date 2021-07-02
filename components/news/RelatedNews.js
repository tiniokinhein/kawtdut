import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'

const RelatedNews = ({ relatedNews }) => {

    const { t } = useTranslation()
    const lng = typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : 'undefined'

    return (
        <div className="d-flex mb-3">
            <Link href="/news/[id]" as={`/news/${relatedNews.id}`}>
                <a className="text-decoration-none img-a-link">
                    <img 
                        src={relatedNews.acf.image.url}
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
                <Link href="/news/[id]" as={`/news/${relatedNews.id}`}>
                    <a 
                        className="text-decoration-none text-bold-color mb-2 overflow-hidden"
                        style={{
                            fontSize: '0.9rem',
                            lineHeight: '1.5em',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {t('a.d', {
                            d_mon: relatedNews.title.rendered,
                            d_mm: relatedNews.acf.title_mm
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
                        {relatedNews.date}
                    </Moment>
                </p>
            </div>
        </div>
    )
}

export default RelatedNews
