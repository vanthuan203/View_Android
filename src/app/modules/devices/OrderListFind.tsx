import {ChevronDownIcon, SortAscendingIcon, UsersIcon} from '@heroicons/react/solid'
import {Group, OrderModel,OrderModelChecked} from './models/Order'
import {Popover, Transition} from '@headlessui/react'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment, useEffect, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {KTSVG} from '../../../_metronic/helpers'
import OrderItem from './components/OrderItemFind'
import {RootState} from 'setup'
import {actions} from './redux/OrdersRedux'
import {FormGroup, Input, Label} from "reactstrap";
import {randomString} from "react-inlinesvg/lib/helpers";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DateRangePicker } from 'rsuite';
import DatePicker from "react-date-picker";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  page:number,
  done:number
  className: string
  orders: OrderModel[]
}
const OrderList: React.FC<Props> = ({page,done,className, orders}) => {
  function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }
  const [list_OrderId,setList_OrderId]=useState([{
    id:0,
    device_id:"",
  },])
  let today=new Date()
  today.setHours(0,0,0,0)
  const dispatch = useDispatch()
  let [startDate, setStartDate] = useState(today);
  let [endDate, setEndDate] = useState(today);

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true)
  const API_URL = process.env.REACT_APP_API_URL
  const [showAdd, setShowAdd] = useState(false)
  const [key, setKey] = useState("")
  const [showAddManual, setShowAddManual] = useState(false)
  const [showEditMulti, setShowEditMulti] = useState(false)
  const [keyuser, setKeyUser] = useState("")
  let [keydatestart, setKeyDateStart] = useState(startDate!=null?((startDate.getTime())):0);
  let [keydate, setKeyDate] = useState(1)
  const [keydatestarttrue, setKeyDateStartTrue] = useState(0)
  let [keydateend, setKeyDateEnd] = useState(endDate!=null?((endDate.getTime())):0);
  const [keydateendtrue, setKeyDateEndTrue] = useState(0)
  const [Checked, setChecked] = useState(false)
  const [keytrue, setKeyTrue] = useState(0)
  const [keyusertrue, setKeyUserTrue] = useState(0)
  const [groupName, setGroupName] = useState('')
  const [nameExport, setNameExport] = useState('')
  let [total_Order_Running, setTotal_Order_Running] = useState(0)
  let [total_Order_Running_Show, setTotal_Order_Running_Show] = useState(0)
  let [total_Buff, setTotal_Buff] = useState(0)
  let [total_Buff_Show, setTotal_Buff_Show] = useState(0)
  let [total_Quantity, setTotal_Quantity] = useState(0)
  let [total_Quantity_Show, setTotal_Quantity_Show] = useState(0)
  let [total_Charge, setTotal_Charge] = useState(0)
  let [total_Charge_Show, setTotal_Charge_Show] = useState(0)

  let[copy,setCopy] =useState("")
  let[copyShow,setCopyShow] =useState("")

  let [total_Thread_Set, setTotal_Thread_Set] = useState(0)
  let [total_Thread_Set_Show, setTotal_Thread_Set_Show] = useState(0)
  let [total_Thread, setTotal_Thread] = useState(0)
  let [total_Thread_Show, setTotal_Thread_Show] = useState(0)
  let [useEff, setuseEff] = useState(0)
  let role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  if(role==="ROLE_SUPPORT"){
    role="ROLE_ADMIN"
  }
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  const [list_user,setList_User]=useState([{
    id:"0000000000",
    user:"All User"
  },])
  const handleWindowResize = () => {
    setIsMobile(window.innerWidth <= 800);
  };


  const clickRefund100Check = () => {
    
  }
  const clickDelete = () => {
    const arr:string[]=[]
    orders.forEach(item=>{
      const myElem = list_OrderId.find(value => value.device_id===item.device_id)
      if(myElem && item.checked){
        arr.push(item.device_id.toString())
      }
    })
    const orderarr=arr.join(',')
    if (window.confirm("🛑 Bạn chắc chắn muốn xóa "+arr.length+" device!") == true) {
      dispatch(actions.deleteOrderRequest(orderarr))
    }
    setChecked(false)
    dispatch(actions.checkedAllChange(false))
  }

  const clickON = () => {
    const arr:string[]=[]
    orders.forEach(item=>{
      const myElem = list_OrderId.find(value => value.device_id===item.device_id)
      if(myElem && item.checked){
        arr.push(item.device_id.toString())
      }
    })
    const orderarr=arr.join(',')
    if (window.confirm("🛑 Bạn chắc chắn muốn ON "+arr.length+" device!") == true) {
      dispatch(actions.requestUpdate(orderarr,1))
    }
    setChecked(false)
    dispatch(actions.checkedAllChange(false))
  }

  const clickMode = () => {
    const arr:string[]=[]
    orders.forEach(item=>{
      const myElem = list_OrderId.find(value => value.device_id===item.device_id)
      if(myElem && item.checked){
        arr.push(item.device_id.toString())
      }
    })
    const orderarr=arr.join(',')
    let mode = window.prompt('Nhập Mode cần update');
    if(mode!=null &&  mode.length>0){
      if (window.confirm("🛑 Bạn chắc chắn update Mode "+arr.length+" device!") == true) {
        dispatch(actions.requestUpdateMode(orderarr,mode))
      }
    }
    setChecked(false)
    dispatch(actions.checkedAllChange(false))
  }

  const clickOFF = () => {
    const arr:string[]=[]
    orders.forEach(item=>{
      const myElem = list_OrderId.find(value => value.device_id===item.device_id)
      if(myElem && item.checked){
        arr.push(item.device_id.toString())
      }
    })
    const orderarr=arr.join(',')
    if (window.confirm("🛑 Bạn chắc chắn muốn OFF "+arr.length+" device!") == true) {
      dispatch(actions.requestUpdate(orderarr,0))
    }
    setChecked(false)
    dispatch(actions.checkedAllChange(false))
  }


  const clickRefund50 = () => {
  
  }

  const clickRefundNoCheckTime = () => {
   
  }
  
  //console.log(list_refund)
  const clickRefund = () => {
  
  }

  useEffect(() => {
    setLoading(true)
    if(orders.length!=0 || list_OrderId.length>0){
      setLoading(false)
    }
    setList_OrderId([])
    useEff=useEff+1
    setuseEff(useEff)
    if(role==="ROLE_ADMIN"){
      setNameExport((keyuser.length==0?"AllUser":keyuser)+'$$'+(keydatestart!=NaN?new Date(keydatestart).toLocaleDateString('vn-VN'):"ALLDayStart")+'&&'+(keydatestart!=NaN?new Date(keydatestart).toLocaleDateString('vn-VN'):"ALLDayEnd"))
    }else {
      setNameExport('$$'+(keydatestart!=NaN?new Date(keydatestart).toLocaleDateString('vn-VN'):"ALLDayStart")+'&&'+(keydatestart!=NaN?new Date(keydatestart).toLocaleDateString('vn-VN'):"ALLDayEnd"))

    }
    if(startDate==null || endDate==null){
      setKeyDateStartTrue(0)
      setKeyDateEndTrue(0)
      keydatestart=0
      keydateend=0
    }else if(startDate!=null && endDate!=null){
      keydatestart=startDate.getTime()
      setKeyDateStart(keydatestart)
      keydateend=endDate.getTime()
      setKeyDateEnd(keydateend)
      keydate=1
      setKeyDate(keydate)
    }
    total_Order_Running_Show=total_Order_Running
    setTotal_Order_Running_Show(total_Order_Running_Show)
    setTotal_Order_Running(0)

    total_Buff_Show=total_Buff
    setTotal_Buff_Show(total_Buff_Show)
    setTotal_Buff(0)

    total_Quantity_Show=total_Quantity
    setTotal_Quantity_Show(total_Quantity_Show)
    setTotal_Quantity(0)

    total_Charge_Show=total_Charge
    setTotal_Charge_Show(total_Charge_Show)
    setTotal_Charge(0)

    total_Thread_Set_Show=total_Thread_Set
    setTotal_Thread_Set_Show(total_Thread_Set_Show)
    setTotal_Thread_Set(0)

    total_Thread_Show=total_Thread
    setTotal_Thread_Show(total_Thread_Show)
    setTotal_Thread(0)
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

  }, [keyusertrue,keydate,startDate,endDate,keydatestart,keydateend,keytrue,keyuser,key,orders.length,,])

  const selectGroup = (item: Group) => {
    dispatch(actions.selectGroup(item))
  }

  async function Export(csvData:OrderModelChecked[],fileName:string){
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
  }



  const isShowFixMulti = orders.find((item) => {
    if (item.checked) {
      return true
    }
    return false
  })

  return (
      <div className={`card ${className}`}>
        <div className="page-header" style={{backgroundColor:'#c0e1ce'}}>
          <div className="page-header__content">
            <div className="align-items-center row" style={{marginTop:10,marginBottom:10,marginRight:5,marginLeft:5}}>
              <div className="col-lg-5 col-sm-12 c-order__header">
                <p style={{fontSize:11,marginTop:5}} className="fw-bold c-order__list">
                <span  className='fw-bolder fs-3 mb-1'>
                  <span className='badge badge-success 1' style={{fontSize:12,color:"#090909",backgroundColor:"rgb(255,255,255)",marginLeft:5}}>{"Device Total " +total_Order_Running_Show} </span>
                </span>
                  <span className='badge badge-success 1' style={{fontSize:11,color:"#fcfcfc",backgroundColor:"rgba(218,30,30,0.97)",marginLeft:5,marginTop:3}}>{"Warning "+total_Buff_Show}
                  </span>
                </p>
              </div>
              <div className="col-lg-7 col-sm-12 c-order__header">
                <div style={{float:"right",fontWeight:"bold"}}>
                  { isShowFixMulti && role === "ROLE_ADMIN"&&(
                      <button style={{marginRight:5,backgroundColor:"rgba(218,30,30,0.97)"}}
                              onClick={() => {
                                clickDelete()
                              }}
                              className='btn btn-google'
                      >
                        Delete
                      </button>
                  )}
                 
                </div>
                <div style={{float:"right",fontWeight:"bold"}}>
                  { isShowFixMulti && role === "ROLE_ADMIN"&&(
                      <button style={{marginRight:5,backgroundColor:"rgb(46,47,46)"}}
                              onClick={() => {
                                clickOFF()
                              }}
                              className='btn btn-google'
                      >
                        OFF
                      </button>
                  )}

                </div>
                <div style={{float:"right",fontWeight:"bold"}}>
                  { isShowFixMulti && role === "ROLE_ADMIN"&&(
                      <button style={{marginRight:5,backgroundColor:"rgb(8,167,24)"}}
                              onClick={() => {
                                clickON()
                              }}
                              className='btn btn-google'
                      >
                        ON
                      </button>
                  )}

                </div>
                <div style={{float:"right",fontWeight:"bold"}}>
                  { isShowFixMulti && role === "ROLE_ADMIN"&&(
                      <button style={{marginRight:5,backgroundColor:"rgb(33,117,201)"}}
                              onClick={() => {
                                clickMode()
                              }}
                              className='btn btn-google'
                      >
                        Mode
                      </button>
                  )}

                </div>
              </div>
            </div>
          </div>
          <div className="page-header__content">
            <div className="align-items-center row" style={{backgroundColor:"white",margin:10}}>
              <div style={{width:"60%"}}>
                <div>
                  <Input style={{margin:10,width:"48%",maxWidth:130,minWidth:60,height:40,float:"left"}}
                         id="note"
                         name="note"
                         value={key}
                         placeholder="Search..."
                         onChange={(e) => setKey(e.target.value)}
                         type="text"
                  />
                  <button style={{fontWeight:'bold',color:"black",backgroundColor:"#c0e1ce",height:40,marginTop:10,float:"left"}}
                          onClick={() => {setKeyTrue(1)
                          }}
                          className='btn btn-sm'
                  >
                    Search
                  </button>
                </div>
              </div>
              <div style={{width:"40%"}}>
                <button style={{height:40,margin:10,float:"right"}}
                        onClick={() => {Export(list_OrderId,nameExport)
                        }}
                        className='btn btn-success'
                >
                  Export
                </button>
              </div>
            </div>
          </div>
          <div className="page-header__content">
            <div className="align-items-center row" style={{backgroundColor:"white",margin:10}}>
              {role==="TEST"&&<div style={{width:"100%"}}>
                <button style={{height:40,margin:10,float:"right"}}
                        onClick={() => {Export(list_OrderId,nameExport)
                        }}
                        className='btn btn-google'
                >
                  Đối soát
                </button>
                <button style={{height:40,margin:10,float:"right"}}
                        onClick={() => {
                          setShowAddManual(true)
                        }}
                        className='btn btn-success'
                >
                  Tra cứu nhanh
                </button>
              </div>}
            </div>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              {/* begin::Table head */}
              <thead>
              <tr className='fw-bolder text-muted'>
                <th className='w-25px'>
                  <div style={{marginLeft:5}} className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                        onChange={(evt) => {
                          dispatch(actions.checkedAllChange(evt.target.checked))
                          setChecked(evt.target.checked)
                        }}
                        checked={Checked}
                        className='form-check-input'
                        type='checkbox'
                        value='1'
                        data-kt-check='true'
                        data-kt-check-target='.widget-13-check'
                    />
                  </div>
                </th>
                <th className='min-w-25px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>STT</span>
                </th>
                <th className='min-w-50px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Box Id</span>
                </th>
                <th className='min-w-130px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Device Id</span>
                </th>
                <th className='min-w-100px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Version</span>
                </th>
                <th className='min-w-50px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Mode</span>
                </th>
                <th className='min-w-130px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Add Time</span>
                </th>
                <th className='min-w-130px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Update Time</span>
                </th>
                <th className='min-w-150px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Status</span>
                </th>
              </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
              {orders &&
                  orders.map((order: OrderModel, index: number) => {
                    if (keyusertrue==0&&keytrue==0&&keydate==0) {
                      if(index===0){
                        total_Order_Running=1
                        if((Date.now()-order.update_time)/1000/60>=30){
                          total_Buff=1
                        }

                      }else{
                        total_Order_Running=1+total_Order_Running;
                        if((Date.now()-order.update_time)/1000/60>=30){
                          total_Buff=1+total_Buff;
                        }

                      }
                      let order_Item = {
                        id: total_Order_Running,
                        device_id: order.device_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.device_id}
                              item={order}
                          />
                      )
                    }else if((order.device_id.indexOf(keyuser)>=0 || order.box_id.indexOf(keyuser)>=0) &&keyusertrue==1&&keytrue==0&&keydate==0){
                      if(index===0){
                        total_Order_Running=1
                        if((Date.now()-order.update_time)/1000/60>=30){
                          total_Buff=1
                        }

                      }else{
                        total_Order_Running=1+total_Order_Running;
                        if((Date.now()-order.update_time)/1000/60>=30){
                          total_Buff=1+total_Buff;
                        }

                      }
                      let order_Item = {
                        id: total_Order_Running,
                        device_id: order.device_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.device_id}
                              item={order}
                          />
                      )
                    }else if((key.indexOf(order.device_id)>=0 || order.device_id.indexOf(key)>=0   || key.indexOf(order.device_id.toString()) >=0 || order.box_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                            || order.rom_version.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                            || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0)
                        &&keytrue==1&&keyusertrue==0&&keydate==0){
                      if(index===0){
                        total_Order_Running=1
                        if((Date.now()-order.update_time)/1000/60>=30){
                          total_Buff=1
                        }

                      }else{
                        total_Order_Running=1+total_Order_Running;
                        if((Date.now()-order.update_time)/1000/60>=30){
                          total_Buff=1+total_Buff;
                        }

                      }
                      let order_Item = {
                        id: total_Order_Running,
                        device_id: order.device_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.device_id}
                              item={order}
                          />
                      )
                    }else if(keytrue==0&&keyusertrue==0&&keydate==1){
                      if(index===0){
                        total_Order_Running=1
                        if((Date.now()-order.update_time)/1000/60>=5){
                          total_Buff=1
                        }

                      }else{
                        total_Order_Running=1+total_Order_Running;
                        if((Date.now()-order.update_time)/1000/60>=5){
                          total_Buff=1+total_Buff;
                        }

                      }
                      let order_Item = {
                        id: total_Order_Running,
                        device_id: order.device_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.device_id}
                              item={order}
                          />
                      )
                    }
                    else if(order.device_id.indexOf(keyuser)>=0&&keytrue==0&&keyusertrue==1&&keydate==1
                    ){
                      if(index===0){
                        total_Order_Running=1

                      }else{
                        total_Order_Running=1+total_Order_Running;

                      }
                      let order_Item = {
                        id: total_Order_Running,
                        device_id: order.device_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.device_id}
                              item={order}
                          />
                      )
                    }else if((key.indexOf(order.device_id)>=0 || order.device_id.indexOf(key)>=0   || key.indexOf(order.device_id.toString()) >=0 || order.box_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                            || order.rom_version.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                            || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0)
                        &&keytrue==1&&keyusertrue==0&&keydate==1
                    ){
                      if(index===0){
                        total_Order_Running=1
                        if((Date.now()-order.update_time)/1000/60>=30){
                          total_Buff=1
                        }

                      }else{
                        total_Order_Running=1+total_Order_Running;
                        if((Date.now()-order.update_time)/1000/60>=30){
                          total_Buff=1+total_Buff;
                        }

                      }
                      let order_Item = {
                        id: total_Order_Running,
                        device_id: order.device_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.device_id}
                              item={order}
                          />
                      )
                    }
                    else if(((key.indexOf(order.device_id)>=0 || order.device_id.indexOf(key)>=0 || key.indexOf(order.device_id.toString()) >=0 || order.box_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                            || order.rom_version.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                            || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0) && order.device_id.indexOf(keyuser)>=0 )
                        &&keytrue==1&&keyusertrue==1&&keydate==0) {
                      if(index===0){
                        total_Order_Running=1
                        if((Date.now()-order.update_time)/1000/60>=5){
                          total_Buff=1
                        }

                      }else{
                        total_Order_Running=1+total_Order_Running;
                        if((Date.now()-order.update_time)/1000/60>=5){
                          total_Buff=1+total_Buff;
                        }

                      }
                      let order_Item = {
                        id: total_Order_Running,
                        device_id: order.device_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.device_id}
                              item={order}
                          />
                      )
                    }
                    else if(((key.indexOf(order.device_id)>=0 || order.device_id.indexOf(key)>=0   || key.indexOf(order.device_id.toString()) >=0 || order.box_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                            || order.rom_version.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                            || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0) && order.device_id.indexOf(keyuser)>=0)
                        &&keytrue==1&&keyusertrue==1&&keydate==1) {
                      if(index===0){
                        total_Order_Running=1
                        if((Date.now()-order.update_time)/1000/60>=5){
                          total_Buff=1
                        }

                      }else{
                        total_Order_Running=1+total_Order_Running;
                        if((Date.now()-order.update_time)/1000/60>=5){
                          total_Buff=1+total_Buff;
                        }

                      }
                      let order_Item = {
                        id: total_Order_Running,
                        device_id: order.device_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.device_id}
                              item={order}
                          />
                      )
                    }
                    return null
                  })}
              </tbody>
              {/* end::Table body */}
            </table>
            {loading===true&&<div style={{width:'1%',margin:"auto"}}>
              <div  className="spinner-grow text-success" role="status" style={{}}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
  )
}

export {OrderList}
