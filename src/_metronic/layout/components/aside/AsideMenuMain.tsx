/* eslint-disable react/jsx-no-target-blank */
import React , { useState } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../helpers'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from 'setup'

export function AsideMenuMain() {
  const intl = useIntl()
  const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""

    const [isVPS, setIsVPS] = useState(false);
    const [isProxy, setIsProxy] = useState(false);
    const [isView, setIsView] = useState(false);
    const [isCmt, setIsCmt] = useState(false);
    const [isTraffic, setIsTraffic] = useState(false);
    const [isFollowerTiktok, setFollowerTiktok] = useState(false);

    // State to track button active state
    const [isActive, setIsActive] = useState(false);
    const [isActiveProxy, setIsActiveProxy] = useState(false);
    const [isActiveView, setIsActiveView] = useState(false);
    const [isActiveCmt, setIsActiveCmt] = useState(false);
    const [isActiveTraffic, setIsActiveTraffic] = useState(false);
    const [isActiveFollowerTiktok, setIsActiveFollowerTiktok] = useState(false);

    // Function to toggle the isAdmin state
    const toggleVPS = () => {
        setIsVPS(!isVPS);
        setIsActive( !isActive);
    };
    const toggleProxy = () => {
        setIsProxy(!isProxy);
        setIsActiveProxy( !isActiveProxy);
    };
    const toggleView = () => {
        setIsView(!isView);
        setIsActiveView( !isActiveView);
    };
    const toggleCmt = () => {
        setIsCmt(!isCmt);
        setIsActiveCmt( !isActiveCmt);
    };
    const toggleTraffic = () => {
        setIsTraffic(!isTraffic);
        setIsActiveTraffic( !isActiveTraffic);
    };
    const toggleFollowerTiktok = () => {
        setFollowerTiktok(!isFollowerTiktok);
        setIsActiveFollowerTiktok( !isActiveFollowerTiktok);
    };
    return (
    <>
        <AsideMenuItem
            to='/crafted/orderfindhistory'
            title='Quick search'
            icon='/media/icons/duotune/general/gen004.svg'
            fontIcon='bi-app-indicator'
        />
        {/*danh sach*/}
        <button style={{backgroundColor:"rgba(238,184,184,0.97)"}}  onClick={toggleView} className={isActiveView ? "header-cus__active" : ""}>
            <div className="header-cus__menu-item">
                <div className="header-cus__menu-link header-cus__without-sub"  style={{textDecorationLine: 'none', fontWeight: 'bold',marginLeft:9}}>
                      <span className="header-cus__menu-icon">
                         <span className="svg-icon svg-icon-2">
                                <KTSVG path="/media/icons/duotune/general/gen026.svg" className='svg-icon-2' />
                         </span>
                      </span>
                    <span className="header-cus__menu-title">Orders</span>
                    <span className="header-cus__down">⇑</span>
                </div>
            </div>
        </button>
        { isView && (
            <div>
                <AsideMenuItem
                    children={AsideMenuMain}
                    to='/crafted/orders'
                    title='Orders Running'
                    icon='/media/icons/duotune/general/gen026.svg'
                    fontIcon='bi-app-indicator'
                />
                <AsideMenuItem
                    children={AsideMenuMain}
                    to='/crafted/orderpending'
                    title='Orders Pending'
                    icon='/media/icons/duotune/general/gen026.svg'
                    fontIcon='bi-app-indicator'
                />
                <AsideMenuItem
                    children={AsideMenuMain}
                    to='/crafted/orderbaohanh'
                    title='Orders Refill'
                    icon='/media/icons/duotune/general/gen026.svg'
                    fontIcon='bi-app-indicator'
                />
                <AsideMenuItem
                    to='/crafted/orderhistory'
                    title='Orders History'
                    icon='/media/icons/duotune/general/gen026.svg'
                    fontIcon='bi-app-indicator'
                />
            </div>
        ) }
        {role != "ROLE_SUPPORT"&&<AsideMenuItem
            to='/crafted/balance'
            title='Balance fluctuations'
            icon='/media/icons/duotune/finance/fin010.svg'
            fontIcon='bi-app-indicator'
        />}
        {
            role === "ROLE_ADMIN" &&       <AsideMenuItem
                to='/dashboard'
                icon='/media/icons/duotune/general/gen032.svg'
                title='Revenue statistics'
                fontIcon='bi-app-indicator'
            />
        }
        <AsideMenuItem
            to='/crafted/service'
            title='Services'
            icon='/media/icons/duotune/general/gen025.svg'
            fontIcon='bi-app-indicator'
        />
        {
            (role === "ROLE_ADMIN" || role==="ROLE_SUPPORT") && <AsideMenuItem
                to='/crafted/devices'
                title='Devices'
                icon='/media/icons/duotune/social/soc002.svg'
                fontIcon='bi-person'
            />
        }
        {
            (role === "ROLE_ADMIN" || role==="ROLE_SUPPORT") && <AsideMenuItem
                to='/crafted/user'
                title='Users'
                icon='/media/icons/duotune/communication/com006.svg'
                fontIcon='bi-person'
            />
        }
        {
            (role === "ROLE_ADMIN" || role==="ROLE_SUPPORT") && <AsideMenuItem
                to='/crafted/setting'
                title='Settings'
                icon='/media/icons/duotune/coding/cod001.svg'
                fontIcon='bi-person'
            />
        }
    </>
  )
}
