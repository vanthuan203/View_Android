import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { OrderModel } from '../../models/Order'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import { getFunciton } from 'utils/ApiHelper'
import {RootState} from "../../../../../setup";
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: OrderModel,
    showEdit: boolean,
    index: number,
    //increase: number
}

const OrderItem: React.FC<Props> = ({ item, showEdit, index }) => {
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
    const clickHandler =()=>{
        dispatch(actions.showcurrentOrder(item))
    }
    const clickHandlerUpdate =()=>{
        dispatch(actions.showcurrentOrderBox(item))
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
                            dispatch(actions.checkedChange({
                                device_id:item.device_id,
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
                <span style={{ color:'white',fontSize:11,padding:4,backgroundColor:"#088114"}} className='badge badge-success'>{item.box_id}</span>
            </td>
            <td>
                 <span style={{ color:'white',fontSize:11,padding:4,marginRight:5,backgroundColor:item.state==1?"#04ad58":"#2e2f2e"}} className='badge badge-success'>{item.device_id}</span>
                <span style={{ color:'white',fontSize:11,padding:4,backgroundColor:"#c92121"}} className='badge badge-success'>{item.num_profile}</span>
                <button
                    onClick={()=>clickHandler()}
                    className='btn btn-icon'
                >
                    <KTSVG path='/media/icons/duotune/graphs/gra008.svg' className='svg-icon-3' />
                </button>
            </td>
            <td>
                <span style={{ color:'white',fontSize:11,padding:4,backgroundColor:"#a22727"}} className='badge badge-success'>{item.rom_version}</span>
            </td>
            <td>
                <span style={{ color:'white',fontSize:11,padding:4,backgroundColor:"#08a718"}} className='badge badge-success'>{item.mode}</span>
            </td>
            <td>
                <span style={{color:'#090909',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.add_time).toLocaleDateString('vn-VN').replace("/2024","") +" "+new Date(item.add_time).toLocaleTimeString('vn-VN')}</span>
            </td>
            <td>
                <span style={{color:'#090909',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.update_time).toLocaleDateString('vn-VN').replace("/2024","") +" "+new Date(item.update_time).toLocaleTimeString('vn-VN')}</span>
                <span style={{color:'white',fontSize:10,padding:4,backgroundColor:(Date.now()-item.update_time)/1000/60<10?"#03d96e":"rgba(162,162,161,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                  {((Date.now()-item.update_time)/1000/60/60)>=24?((((Date.now()-item.update_time)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.update_time)/1000/60/60)>=1?((Date.now()-item.update_time)/1000/60/60).toFixed(2)+'H':((Date.now()-item.update_time)/1000/60).toFixed(2)+'m'}</span>
            </td>
            <td>
                <div style={{float:"left"}}>
                <span className='badge badge-success' style={{ float:"left",color:'rgb(255,255,255)',backgroundColor:item.running>0?"#03d96e":"rgba(162,162,161,0.97)",fontSize:11,padding:4,marginRight:5,marginBottom:5}} >{item.running==null?"Pending":"Running"}</span>
                {item.running!=null&&<span style={{float:"left"}}>
                    <img style={{float:"left",marginRight:5,width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/svg/social-logos/'+item.platform+'.svg')} alt='metronic' />
                 <span style={{ float:"left",color:'white',marginRight:5,marginBottom:5,fontSize:10,padding:4,backgroundColor:"#090909"}} className='badge badge-success'>{item.task.charAt(0).toUpperCase()}</span>
                </span>}
                    {item.get_time!=null&&<span style={{float:"left",color:'white',fontSize:10,padding:4,backgroundColor:(Date.now()-item.get_time)/1000/60<10?"#03d96e":"rgba(162,162,161,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                  {((Date.now()-item.get_time)/1000/60/60)>=24?((((Date.now()-item.get_time)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.get_time)/1000/60/60)>=1?((Date.now()-item.get_time)/1000/60/60).toFixed(2)+'H':((Date.now()-item.get_time)/1000/60).toFixed(2)+'m'}</span>}
                </div>
            </td>
            <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                    <button
                        onClick={()=>clickHandlerUpdate()}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default OrderItem