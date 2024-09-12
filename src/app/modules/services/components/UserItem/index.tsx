import React, {useEffect, useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/services/models/Account'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/AccountRedux'
import moment from 'moment'
import {date} from "yup";
import {round} from "@popperjs/core/lib/utils/math";
import {RootState} from "../../../../../setup";
type Props = {
    item: AccountModel,
    index:number
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const UserItem : React.FC<Props> = ({ item ,index}) => {
    const dispatch = useDispatch()
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const [loading, setLoading] = useState(false)
    const clickHandler =()=>{
        dispatch(actions.showCurrentAccount(item))
    }
    const clickDeleteHandler = () => {
        if (window.confirm("Bạn chắc chắn muốn xóa service: "+item.service_id!) == true) {
            dispatch(actions.deleteVpsRequest(item.geo))
        }
    }
    return (

        <tr style={{margin:100,backgroundColor:item.enabled==0?"rgba(252,226,207,0.62)":"#ffffff"}}>
            <td className='w-25px'>
                <span style={{marginLeft:5}} className='text-muted fw-bold text-muted d-block text-sm'>{item.service_id}</span>
            </td>
            <td>
                <img style={{float:"left",marginRight:5,width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/svg/social-logos/'+item.platform+'.svg')} alt='metronic' />
            </td>
            <td>
                <span style={{fontWeight:"bold",color:"gray"}} ><span  className='badge badge-success' style={{color:"rgb(255,255,255)"
                }}>{item.mode} </span></span>
            </td>
            <td>
                   <span style={{fontSize:11}}>
                       <span>
                        <span style={{fontWeight:"bold",color:"gray"}} >Service Id: <span  className='badge badge-success' style={{color:"rgb(255,255,255)"
                        }}>{item.service_id} </span></span>
                    </span>
                    <br/>
                    <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Rate: <span style={{color:"rgba(218,30,30,0.97)"
                        }}>${item.service_rate} </span></span>
                    </span>
                    <br/>
                    <span>
                        <span style={{whiteSpace:"normal",fontWeight:"bold",color:"gray"}}>Name: <span style={{color:"#009ef7"
                        }}>{item.service_name} </span></span>
                    </span>
                    <br/>
                    <span>
                       <span style={{fontWeight:"bold",color:"gray"}} >Task: <span style={{color:"#bb0707"
                       }}>{item.task.toUpperCase()}</span></span>
                    </span>
                    <br/>
                    <span>
                       <span style={{fontWeight:"bold",color:"gray"}} >Type: <span style={{color:"#090909"
                       }}>{item.service_type}</span></span>
                    </span>
                    <br/>
                </span>
            </td>
            <td>
                   <span style={{fontSize:11}}>
                    <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Quantity : <span style={{color:"rgba(218,30,30,0.97)"
                        }}>{item.min_quantity+"-"+item.max_quantity}</span></span>
                    </span>
                    <br/>
                    <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Retention: <span style={{color:"#009ef7"
                        }}>{item.min_time+"-"+item.max_time+ " minutes"} </span></span>
                    </span>
                    <br/>
                    <span>
                       <span style={{fontWeight:"bold",color:"gray"}} >Max Order: <span style={{color:"#090909"
                       }}>{item.max_order}</span></span>
                    </span>
                    <br/>
                    <span>
                       <span style={{fontWeight:"bold",color:"gray"}} >Thread: <span style={{color:"#090909"
                       }}>{item.thread}</span></span>
                    </span>
                    <br/>
                </span>
            </td>

            <td>
                   <span style={{fontSize:11}}>
                       <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Bonus: <span style={{color:"rgba(218,30,30,0.97)"
                        }}>{item.bonus}% </span></span>
                    </span>
                    <br/>
                    <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Check Time : <span style={{color:item.check_time==1?"rgba(34,126,231,0.97)":"gray"
                        }}>{item.check_time==0?"No":"Yes"}</span></span>
                    </span>
                    <br/>
                    <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Check Count : <span style={{color:item.check_count==1?"rgba(34,126,231,0.97)":"gray"
                        }}>{item.check_count==0?"No":"Yes"}</span></span>
                    </span>
                    <br/>
                   <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Check Done : <span style={{color:item.check_done==1?"rgba(34,126,231,0.97)":"gray"
                        }}>{item.check_done==0?"No":"Yes"}</span></span>
                    </span>
                    <br/>
                    <span>
                       <span style={{fontWeight:"bold",color:"gray"}}>Guarantee : <span style={{color:item.refund==1?"rgba(34,126,231,0.97)":"gray"
                       }}>{item.refund==0?"No":(item.refund_time +" days")}</span></span>
                    </span>
                    <br/>
                </span>
            </td>
            <td>
                {item.platform=="youtube"&&<span style={{fontSize:11}}>
                    <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Search : <span style={{color:item.youtube_search>0?"rgba(34,126,231,0.97)":"gray"
                        }}>{item.youtube_search+"%"}</span></span>
                    </span>
                    <br/>
                     <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>External : <span style={{color:item.youtube_external>0?"rgba(34,126,231,0.97)":"gray"
                        }}>{item.youtube_external+"%"}</span></span>
                    </span>
                    <br/>
                      <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Suggest : <span style={{color:item.youtube_suggest>0?"rgba(34,126,231,0.97)":"gray"
                        }}>{item.youtube_suggest+"%"}</span></span>
                    </span>
                    <br/>
                    <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>DTN : <span style={{color:item.youtube_dtn>0?"rgba(34,126,231,0.97)":"gray"
                        }}>{item.youtube_dtn+"%"}</span></span>
                    </span>
                    <br/>
                    <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Direct : <span style={{color:item.youtube_direct>0?"rgba(34,126,231,0.97)":"gray"
                        }}>{item.youtube_direct+"%"}</span></span>
                    </span>
                     <br/>
                    <span>
                        <span style={{fontWeight:"bold",color:"gray"}}>Embed : <span style={{color:item.youtube_embed>0?"rgba(34,126,231,0.97)":"gray"
                        }}>{item.youtube_embed+"%"}</span></span>
                    </span>
                    <br/>
                </span>}
            </td>
            {role!="ROLE_USER"&&<td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                    <button
                        onClick={()=>clickHandler()}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>
                </div>
            </td>}

        </tr>

    )
}

export default UserItem