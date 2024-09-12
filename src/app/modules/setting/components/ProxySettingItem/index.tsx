import React, {useEffect, useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { ProxySettingModel } from 'app/modules/setting/models/Account'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/AccountRedux'
import moment from 'moment'
import {date} from "yup";
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: ProxySettingModel,
    index:number
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const ProxySettingItem : React.FC<Props> = ({ item ,index}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const clickHandler =()=>{
       dispatch(actions.showCurrentProxySetting(item))
    }
    return (

        <tr>
            <td>
               <img style={{width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/svg/social-logos/'+item.platform+'.svg')} alt='metronic' />
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.max_follower}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.max_like}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.max_activity_24h}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.max_day_activity}
                                </text>
                    </span>
            </td>
            <td >
                {item.update_time!=null&&item.update_time>0&&<span style={{color:'black',fontWeight:"bold",fontSize:11}}>
                        {new Date(item.update_time).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(item.update_time).toLocaleTimeString('vn-VN')}
                    </span>}
            </td>
            <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                    <button
                        onClick={()=>clickHandler()}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default ProxySettingItem