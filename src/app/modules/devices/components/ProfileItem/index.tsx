import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { ProfileModel } from '../../models/Order'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import { getFunciton } from 'utils/ApiHelper'
import {RootState} from "../../../../../setup";
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: ProfileModel,
    index: number,
    //increase: number
}

const ProfileItem: React.FC<Props> = ({ item, index }) => {
    let role: string =
        (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
    if(role==="ROLE_SUPPORT"){
        role="ROLE_ADMIN"
    }
    const [running, setRunning] = useState(0)
    const [success, setSuccess] = useState(0)
    const [loading, setLoading] = useState(false)

    function format1(n:number) {
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }
    
    const dispatch = useDispatch()



    //const subNeedRun = item.view_need - (item.current_view - item.start_view)
    //const increase = item.current_view - item.start_view
    return (
        <tr style={{margin:100,backgroundColor:item.checked==true?"rgba(252,226,207,0.62)":""}}>
            <td  className='w-25px'>
                <div style={{marginLeft:5}} className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                        onChange={(evt)=>{
                            dispatch(actions.checkedChangeProfile({
                                profile_id:item.profile_id,
                                checked:evt.target.checked
                            }))
                        }}
                        className='form-check-input'
                        type='checkbox'
                        value={1}
                        checked={item.checked}
                        data-kt-check='true'
                        data-kt-check-target='.widget-13-check'
                    />
                </div>
            </td>
            <td>
                <span className='text-muted fw-bold text-muted d-block text-sm'>{index}</span>
            </td>
            <td>
                 <span style={{ color:'white',fontSize:11,padding:4,backgroundColor:"#04ad58"}} className='badge badge-success'>{item.profile_id.replace(item.device_id+"_","")}</span>
            </td>
            <td>
                {item.acc_live != null &&<span style={{ color:'white',fontSize:11,padding:4,backgroundColor:"#2e2f2e"}} className='badge badge-success'>{item.acc_live.split(",").length}</span>}
                {item.acc_live != null &&
                         item.acc_live.split(",").map((element, index) => (
                             <img key={index} style={{float:"left",marginRight:5,width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/svg/social-logos/'+element+'.svg')} alt='metronic' />
                         ))
                }
            </td>
            <td>
                {item.acc_die != null &&<span style={{ color:'white',fontSize:11,padding:4,backgroundColor:"#2e2f2e"}} className='badge badge-success'>{item.acc_die.split(",").length}</span>}
                {item.acc_die != null &&
                    item.acc_die.split(",").map((element, index) => (
                        <img key={index} style={{float:"left",marginRight:5,width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/svg/social-logos/'+element+'.svg')} alt='metronic' />
                    ))
                }
            </td>
            <td>
                {item.enabled==1&&<span>
                    <span style={{color:'#090909',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.enabled_time).toLocaleDateString('vn-VN').replace("/2024","") +" "+new Date(item.enabled_time).toLocaleTimeString('vn-VN')}</span>
                <span style={{color:'white',fontSize:10,padding:2,backgroundColor:(Date.now()-item.update_time)/1000/60<10?"#03d96e":"rgba(162,162,161,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                  {((Date.now()-item.enabled_time)/1000/60/60)>=24?((((Date.now()-item.enabled_time)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.enabled_time)/1000/60/60)>=1?((Date.now()-item.enabled_time)/1000/60/60).toFixed(2)+'H':((Date.now()-item.enabled_time)/1000/60).toFixed(2)+'m'}</span>
                </span>}
            </td>
            <td>
                <span style={{color:'#090909',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.add_time).toLocaleDateString('vn-VN').replace("/2024","") +" "+new Date(item.add_time).toLocaleTimeString('vn-VN')}</span>
            </td>
            <td>
                {item.update_time!=0&&item.update_time!=null&&<span>
                    <span style={{color:'#090909',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.update_time).toLocaleDateString('vn-VN').replace("/2024","") +" "+new Date(item.update_time).toLocaleTimeString('vn-VN')}</span>
                <span style={{color:'white',fontSize:10,padding:2,backgroundColor:(Date.now()-item.update_time)/1000/60<10?"#03d96e":"rgba(162,162,161,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                  {((Date.now()-item.update_time)/1000/60/60)>=24?((((Date.now()-item.update_time)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.update_time)/1000/60/60)>=1?((Date.now()-item.update_time)/1000/60/60).toFixed(2)+'H':((Date.now()-item.update_time)/1000/60).toFixed(2)+'m'}</span>
                </span>}
            </td>
            <td>
                <div style={{float:"left"}}>
                    <span className='badge badge-success' style={{ float:"left",color:'rgb(255,255,255)',backgroundColor:item.running>0?"#03d96e":"rgba(162,162,161,0.97)",fontSize:11,padding:4,marginRight:5,marginBottom:5}} >{item.running==0?"Pending":"Running"}</span>
                    {item.running!=0&&<span style={{float:"left"}}>
                    <img style={{float:"left",marginRight:5,width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/svg/social-logos/'+item.platform+'.svg')} alt='metronic' />
                       
                        <span style={{ float:"left",color:'white',marginRight:5,marginBottom:5,fontSize:10,padding:4,backgroundColor:"#090909"}} className='badge badge-success'>{item.task.charAt(0).toUpperCase()}</span>
                </span>}
                    {item.get_time!=0&&<span style={{float:"left",color:'white',fontSize:10,padding:4,backgroundColor:(Date.now()-item.get_time)/1000/60<10?"#03d96e":"rgba(162,162,161,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                  {((Date.now()-item.get_time)/1000/60/60)>=24?((((Date.now()-item.get_time)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.get_time)/1000/60/60)>=1?((Date.now()-item.get_time)/1000/60/60).toFixed(2)+'H':((Date.now()-item.get_time)/1000/60).toFixed(2)+'m'}</span>}
                </div>
            </td>
        </tr>
    )
}

export default ProfileItem