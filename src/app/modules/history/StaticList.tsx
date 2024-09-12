/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ChannelStaticModel, HistoryModel} from 'app/modules/history/models/Account'
import ChannelStaticItem from './components/ChannelStaticItem'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { actions } from './redux/AccountRedux'
import { RootState } from 'setup'
import HistoryItem from "./components/HistoryItem";
type Props = {
  className: string,
}

const StaticList: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }
  const API_URL = process.env.REACT_APP_API_URL
  const [loading, setLoading] = useState(true)
  let [useEff, setuseEff] = useState(0)
  let [totaltimeorder, setTotalTimeOrder] = useState(0)
  let [totaltimeordershow, setTotalTimeOrderShow] = useState(0)
  let [totaltimebuffedorder, setTotalTimeBuffedOrder] = useState(0)
  const role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  const statics:HistoryModel[] = useSelector<RootState>(({ histories }) => histories.statics, shallowEqual) as HistoryModel[] || []
  let count_money=0;
  let count_moneysub=0;
  let count_order=0;

async function getbyday(){
  if(role.indexOf("ROLE_ADMIN")>=0){
    await dispatch(actions.requestStatics(''))
  }else{
    await dispatch(actions.requestStatics(user))
  }
}
  useEffect(() => {
    setLoading(true)
    useEff=useEff+1
    setuseEff(useEff)
    if(useEff<=1){
      getbyday()
    }
    if(statics.length>0){
      setLoading(false)
    }
  }, [statics])
  statics&&statics?.map((item: HistoryModel,index:number) => {
    count_money=item.count_view
    count_moneysub=item.count_viewsub
    count_order=item.count_order
  })
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="page-header" style={{backgroundColor:'#c0e1ce'}}>
        <div className="page-header__content">
          <div className="align-items-center row" style={{margin:10}}>
            <div className="col-lg-12 col-sm-12 c-order__header">
              <p style={{fontSize:11,marginTop:5}} className="fw-bold c-order__list">
                <span  className='fw-bolder fs-3 mb-1'>
                  <span className='badge badge-success 1' style={{fontSize:12,color:"#090909",backgroundColor:"rgb(255,255,255)",marginLeft:5}}>{"Total " +count_order}</span>
                  </span>
                <span  className='fw-bolder fs-3 mb-1'>
                  <span className='badge badge-success 1' style={{fontSize:12,color:"#fcfcfc",backgroundColor:"rgba(20,122,178,0.66)",marginLeft:5}}>{"Revenue $"+((count_money-count_moneysub).toFixed(Number.isInteger(count_money-count_moneysub)==true?0:2))}
                  </span>
                </span>
                <span  className='fw-bolder fs-3 mb-1'>
                  <span className='badge badge-success 1' style={{fontSize:12,color:"#fcfcfc",backgroundColor:"rgba(218,30,30,0.97)",marginLeft:5}}>{"Charge $"+(count_money.toFixed(Number.isInteger(count_money)==true?0:2))}
                  </span>
                </span>
                <span  className='fw-bolder fs-3 mb-1'>
                  <span className='badge badge-success 1' style={{fontSize:12,color:"#fcfcfc",backgroundColor:"rgb(9,9,9)",marginLeft:5}}>{"Refund $"+(count_moneysub.toFixed(Number.isInteger(count_moneysub)==true?0:2))}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className='min-w-30px' style={{fontWeight:"bold",fontSize:12}}>#</th>
                <th className='min-w-100px'  style={{fontWeight:"bold",fontSize:12}}>Date</th>
                <th className='min-w-100px'  style={{fontWeight:"bold",fontSize:12}}>Payments</th>
                <th className='min-w-100px'  style={{fontWeight:"bold",fontSize:12}}>Refunds</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {
                statics&&statics?.map((item: HistoryModel,index:number) => {
                  return <HistoryItem key={+index} item={item} index={index}/>
                })
              }

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

export { StaticList }
