import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SEO from '../next-seo.config'
import Sidebar from '../components/layout/Sidebar'
import { store , persistor } from '../redux/store'
import '../config/language'
import '../styles/style.scss'
import '../styles/media.scss'


export const Header = () => {

  const themeStore = useSelector(state => state.theme)

  return(
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />

      {
        themeStore.theme === 'dark' ? (
          <meta name="theme-color" content="#000000" />
        ) : (
          <meta name="theme-color" content="#ffffff" />
        )
      }
      
    </Head>
  )
}

const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
          <Sidebar />
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
