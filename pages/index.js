import { NextSeo } from 'next-seo'
import React from 'react'
import HomeAboutInfo from '../components/about/HomeAboutInfo'
import Layout from '../components/layout/Layout'
import HomeSlideshow from '../components/upcoming/HomeSlideshow'
import { useTranslation } from 'react-i18next'
import HomeOpinion from '../components/opinion/HomeOpinion'
import HomeDonate from '../components/donate/HomeDonate'
import useSWR from 'swr'
import { PAGES } from '../config/api'
import HomeUpcoming from '../components/upcoming/HomeUpcoming'
import HomeActivity from '../components/activity/HomeActivity'
import HomeNews from '../components/news/HomeNews'
import HomeContact from '../components/contact/HomeContact'

const Home = () => {

  const { t } = useTranslation()
  const [loading , setLoading] = React.useState(false)

  const { data:p } = useSWR(
    PAGES + '/73',
    () => axios.get(PAGES + '/73').then(res => res.data),
    {
        refreshInterval: 1000
    }
  )

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000)
  }, [])

  const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

  return (
    <>
      <NextSeo 
        title={loading ? t('site.main') : 'ကော့ဒွတ်ကျေးရွာ'}
        description={ p && t('a.d', {
          d_mon: p.acf.info_mon,
          d_mm: p.acf.info_mm
        })}
        canonical={w}
        openGraph={{
          url: w,
          title: t('site.main'),
          description: p && t('a.d', {
            d_mon: p.acf.info_mon,
            d_mm: p.acf.info_mm
          }),
          images: [
            {
              url: p && p.acf.image.url,
              width: 900,
              height: 800,
              alt: 'ကော့ဒွတ်ကျေးရွာ',
            }
          ],
        }}
      />

      <Layout>
        <HomeSlideshow />
        <HomeAboutInfo />
        <HomeOpinion />
        <HomeDonate />
        <HomeUpcoming />
        <HomeActivity />
        <HomeNews />
        <HomeContact />
      </Layout>
    </>
  )
}

export default Home
