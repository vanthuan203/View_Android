import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { OrderList } from './OrderListFind'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { OrderModel,OrderModelCmt ,OrderModelFollower} from './models/Order'
import { RootState } from 'setup'
import DeviceShow from "./modals/ProfileModal";
import EditModal from "./modals/EditModal";
import { actions } from './redux/OrdersRedux'
import {FormGroup, Input, Label} from "reactstrap";

const WidgetsPage: React.FC = () => {

  const dispatch = useDispatch()
  const [keytrue, setKeyTrue] = useState(0)
  const [key, setKey] = useState("")
  const [keycheck, setKeyCheck] = useState(0)
  const [size, setSize] = useState(50)
  const [sort, setSort] = useState("DESC")
  const [sort_type, setSort_type] = useState("add_time")
  let [page_index, setPage_index] = useState(0)
  let [state, setState] = useState(-1)
  const orders: OrderModel[] = useSelector<RootState>(({ devices }) => devices.orders, shallowEqual) as OrderModel[] || []
  let page: number =
      (useSelector<RootState>(({devices}) => devices?.page, shallowEqual) as number) || 0
  const currentOrder: OrderModel = useSelector<RootState>(({ devices }) => devices.currentOrder, shallowEqual) as OrderModel || undefined
  const currentOrderBox: OrderModel = useSelector<RootState>(({ devices }) => devices.currentOrderBox, shallowEqual) as OrderModel || undefined
  let [useEff, setuseEff] = useState(0)
  let [page_Update, setPage_Update] = useState(page)
  let role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  const [listPage,setListPage]=useState([{
    id:0
  },])
  useEffect(() => {
    if(key.trim().length==0&&useEff>0){
      setKeyTrue(1)
    }
  }, [key])

  useEffect(() => {
    listPage.splice(0,listPage.length);
    page_Update=page;
    setPage_Update(page_Update)
    if(page_Update==1){
      let orderitem = {
        id: 1,
      }
      setListPage([...listPage, orderitem])
      listPage.push(orderitem)
    }else{
      for(let i=0;i<page_Update;i++) {
        if(listPage.filter(item=>item.id!=i)){
          let orderitem = {
            id: i+1,
          }
          setListPage([...listPage, orderitem])
          listPage.push(orderitem)
        }
      }
    }
  }, [page])

  useEffect(() => {
    if(Array.isArray(orders)){
      orders.splice(0,orders.length);
    }
    if(useEff>0){
        dispatch(actions.requestOrders(size,page_index,sort,sort_type,key,state))
    }
    setKeyTrue(0)
    page_index=0
    setPage_index(0)
  }, [size,sort,sort_type,state,keytrue==1])

  useEffect(() => {
    if(Array.isArray(orders)){
      orders.splice(0,orders.length);
    }
    if(useEff>0){
      dispatch(actions.requestOrders(size,page_index,sort,sort_type,key,state))
    }
  }, [page_index])

  useEffect(() => {
    if(useEff==0){
      dispatch(actions.requestOrders(size,page_index,sort,sort_type,key,state))
    }
    useEff=useEff+1
    setuseEff(useEff)
  }, [useEff==0])
  return (
    <>
      <div className='row gy-5 gx-xl-12'>
        <div>
          <div style={{float:"left",marginBottom:10}}>
            <span style={{width:"auto",padding:10,height:40,fontSize:12,backgroundColor:'#c0e1ce',color:"black",textAlign:"center",float:"left"}}>Size</span>
            <Input style={{marginRight:10,width:"auto",height:40,fontSize:12,backgroundColor:'#c0e1ce',color:"black",textAlign:"center",float:"left"}}
                //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                   onChange={(e) => {
                     setSize(parseInt(e.target.value))
                   }}
                   className="form-control form-control-solid"
                   type="select"
                   value={size}
            >
              <option key={10} value={10}>
                {10}
              </option>
              <option key={25} value={25}>
                {25}
              </option>
              <option key={50} value={50}>
                {50}
              </option>
              <option key={100} value={100}>
                {100}
              </option>
              <option key={250} value={250}>
                {250}
              </option>
              <option key={500} value={500}>
                {500}
              </option>
              <option key={1000} value={1000}>
                {1000}
              </option>
            </Input>
          </div>
          <div style={{float:"left",marginBottom:10}}>
            <span style={{width:"auto",padding:10,height:40,fontSize:12,backgroundColor:'#c7d5cd',color:"black",textAlign:"center",float:"left"}}>Page</span>
            <Input style={{marginRight:10,width:"auto",height:40,fontSize:12,backgroundColor:'#c7d5cd',color:"black",textAlign:"center",float:"left"}}
                //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                   onChange={(e) => {
                     setPage_index(parseInt(e.target.value))
                   }}
                   className="form-control form-control-solid"
                   type="select"
                   value={page_index}
            >
              {
                listPage.map((item, index) => {
                  return(
                      <option key={item.id-1} value={item.id-1}>
                        {item.id+"/"+page}</option>)
                })
              }
            </Input>
          </div>
          <div style={{float:"left",marginBottom:10}}>
            <span  style={{width:"auto",padding:10,height:40,fontSize:12,backgroundColor:'rgba(79,166,220,0.66)',color:"black",textAlign:"center",float:"left"}}>Sort</span>
            <Input style={{marginRight:10,width:"auto",height:40,fontSize:12,backgroundColor:'rgba(79,166,220,0.66)',color:"black",textAlign:"center",float:"left"}}
                //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                   onChange={(e) => {
                     setSort_type(e.target.value)
                   }}
                   className="form-control form-control-solid"
                   type="select"
                   value={sort_type}
            >
              <option key={"update_time"} value={"update_time"}>
                {"update_time".toUpperCase()}
              </option>
              <option key={"add_time"} value={"add_time"}>
                {"add_time".toUpperCase()}
              </option>
            </Input>
          </div>
          <div style={{float:"left",marginBottom:10}}>
            <span style={{width:"auto",padding:10,height:40,fontSize:12,backgroundColor:'rgba(218,119,119,0.97)',color:"black",textAlign:"center",float:"left"}}>Type</span>
            <Input style={{marginRight:10,width:"auto",height:40,fontSize:12,backgroundColor:'rgba(218,119,119,0.97)',color:"black",textAlign:"center",float:"left"}}
                //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                   onChange={(e) => {
                     setSort(e.target.value)
                   }}
                   className="form-control form-control-solid"
                   type="select"
                   value={sort}
            >
              <option key={"DESC"} value={"DESC"}>
                {"DESC"}
              </option>
              <option key={"ASC"} value={"ASC"}>
                {"ASC"}
              </option>
            </Input>
          </div>

          <div style={{float:"left",marginBottom:10}}>
            <span style={{width:"auto",padding:10,height:40,fontSize:12,backgroundColor:'#9cee9c',color:"black",textAlign:"center",float:"left"}}>State</span>
            <Input style={{marginRight:10,width:"auto",height:40,fontSize:12,backgroundColor:'#9cee9c',color:"black",textAlign:"center",float:"left"}}
                //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                   onChange={(e) => {
                     setState(parseInt(e.target.value))
                   }}
                   className="form-control form-control-solid"
                   type="select"
                   value={state}
            >
              <option key={-1} value={-1}>
                {"ALL"}
              </option>
              <option key={1} value={1}>
                {"ON"}
              </option>
              <option key={0} value={0}>
                {"OFF"}
              </option>
            </Input>
          </div>

          <div style={{float:"left",marginBottom:10}}>
            <Input style={{marginRight:1,width:200,maxWidth:500,minWidth:60,height:40,float:"left"}}
                   id="note"
                   name="note"
                   value={key}
                   placeholder="device..."
                   onChange={(e) => {
                     setKey(e.target.value)
                   }}
                   type="text"
            />
            <button style={{padding:4,color:"white",backgroundColor:"rgba(51,50,50,0.68)",height:40,float:"left"}}
                    onClick={() => {setKeyTrue(1)
                    }}
                    className='btn btn-sm'
            >
              Search
            </button>
          </div>


        </div>

        <div className='col-xl-12'>
          <OrderList done={1} orders={orders} page={page} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
        {
            currentOrder&&<DeviceShow  key={currentOrder?.device_id} device_id={currentOrder?.device_id} />
        }
        {
            currentOrderBox&&<EditModal key={currentOrderBox?.device_id} item={currentOrderBox} />
        }
      </div>
    </>
  )
}

export default WidgetsPage
