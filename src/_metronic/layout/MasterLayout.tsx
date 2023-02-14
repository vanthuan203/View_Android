import React, {useEffect} from 'react'
import {AsideDefault} from './components/aside/AsideDefault'
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import {PageDataProvider} from './core'
import {useLocation} from 'react-router-dom'
import {
  ActivityDrawer,
  Main
} from '../partials'
import {MenuComponent} from '../assets/ts/components'

const MasterLayout: React.FC = ({children}) => {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid' style={{margin:0}}>
        <AsideDefault />
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper />
          <div id='kt_content' className='content d-flex flex-column flex-column-fluid' style={{width:'100%',padding:0}}>
            <div className='post d-flex flex-column-fluid' id='kt_post'>
              <Content>{children}</Content>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {/* begin:: Drawers */}
      <ActivityDrawer />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <Main />
     
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
