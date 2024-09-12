import { Action } from '@reduxjs/toolkit'
import { App } from 'app/App'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { OrderModel,ProfileModel,OrderModelFollower, OrderPost,OrderFormManual, OrderForm, Group, OrderUpdateForm } from '../models/Order'
import {
  getListOrderCmt,
  getListOrder,
  getListProfilesByDevice,
  getOrderFilter,
  updateOrder,
  updateMode,
  updateOrderCmt,
  updateOrderBox,
  addOrder,
  addGroup,
  addOrderManual,
  updateSetting,
  deleteChannel,
  addOrderMulti, getListOrderFollowerTiktok,
} from './OrdersCRUD'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  ShowOrdersFilter:'[Devices] Filter',
  RequestOrders: '[Devices] Requested',
  RequestProfilesByDevice:'[Devices] Requested Profiles',
  ProfilesByDeviceLoadedSuccess: '[Devices] Loaded Profiles succcess',
  RequestOrderCmt: '[Devices] Requested Cmt',
  RequestOrderFollowerTiktok: '[Devices] Requested Follower Tiktok',
  OrdersLoadedSuccess: '[Devices] Loaded succcess',
  OrdersLoadedCmtSuccess: '[Devices] Loaded Cmt succcess',
  OrdersLoadedFollowerTiktokSuccess: '[Devices] Loaded Follower Tiktok succcess',
  OrdersLoadedFail: '[Devices] load fail',
  AddOrderRequest: '[Devices] Add Order Request',
  AddOrderManualRequest: '[Devices] Add Order Manual Request',
  AddOrderSuccess: '[Devices] Add Order Success',
  AddOrdersSuccess: '[Devices] Add Orders Success',
  AddOrderFail: '[Devices] Add Order Fail',
  ShowcurrentOrder: '[Devices] Show Order',
  ShowcurrentOrderBox: '[Devices] Show Order Box',
  RequestUpdate: '[Devices] Requested Update',
  RequestUpdateMode: '[Devices] Requested Mode Update',
  RequestUpdateBox: '[Devices] Requested Box Update',
  RequestUpdateFollower: '[Devices] Requested Follower Update',
  UpdateMultiOrderRequest: '[Devices] Update Multi Order Request',
  UpdateSuccess: '[Devices] Update Success',
  UpdateMultiSuccess: '[Devices] Update Multi Success',
  UpdateMultiCmtSuccess: '[Devices] Update  Multi Cmt Success',
  UpdateMultiFollowerSuccess: '[Devices] Update  Multi Follower Success',
  UpdateFail: '[Devices] Update Fail',
  ClearSelected: '[Devices] Clear selected account',
  GroupLoadedRequest: '[Devices] Group Loaded Request',
  GroupLoadedSuccess: '[Devices] Group Loaded Success',
  GroupLoadedFail: '[Devices] Group Loaded Fail',
  GroupAddRequest: '[Devices] GroupAddRequest',
  GroupAddSuccess: '[Devices] Group Add Success',
  GroupAddFail: '[Devices] Group Add Fail',
  GroupDeleteRequest: '[Devices] Group Delete Request',
  GroupDeleteSuccess: '[Devices] Group Delete Success',
  SelectGroup: '[Devices] Select Group',
  DeleteOrderRequest: '[Devices] Delete Order Request',
  DeleteOrderSuccess: '[Devices] Delete Order Success',
  CheckedChange: '[Devices] Checked Change',
  CheckedChangeProfile: '[Devices] Checked Change Profile',
  CheckedChangeCmt: '[Devices] Checked Change Cmt',
  CheckedChangeFollower: '[Devices] Checked Change Follower',
  CheckedAllChange: '[Devices] Checked All Change',
  CheckedAllChangeCmt: '[Devices] Checked All Change Cmt',
  CheckedAllChangeFollower: '[Devices] Checked All Change Follower',
  CheckedProfilesAllChange: '[Devices] Checked Profiles All Change ',

}

const initialorderstate: Iorderstate = {
  orders: [],
  profiles: [],
  ordersFollowerTiktok: [],
  loading: false,
  page: 0,
  adding: false,
  groups: [],
  currentOrder: undefined,
  currentOrderBox: undefined,
  currentProfile: undefined,
  currentOrderFollowerTiktok: undefined,
  currentGroup: undefined,
  channel_prior: 0,
  
}

export interface Iorderstate {
  profiles: ProfileModel[]
  orders: OrderModel[]
  ordersFollowerTiktok: OrderModelFollower[]
  loading: boolean
  adding: boolean
  page: number,
  currentOrder?: OrderModel
  currentOrderBox?: OrderModel
  currentProfile?:ProfileModel
  currentOrderFollowerTiktok?: OrderModelFollower
  groups: Group[]
  currentGroup?: Group
  channel_prior: number
}
export const reducer = persistReducer(
  { storage, key: 'v1-orders', whitelist: [] },
  (state: Iorderstate = initialorderstate, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.RequestOrders: {
        return {
          ...state,
          orders: [],
          page:0,
          loading: true
        }
      } 
      case actionTypes.RequestProfilesByDevice: {
        return {
          ...state,
          profiles: [],
          loading: true
        }
      }
      case actionTypes.RequestOrderCmt: {
        return {
          ...state,
          ordersCmt: [],
          loading: true
        }
      }
      case actionTypes.RequestOrderFollowerTiktok: {
        return {
          ...state,
          ordersFollowerTiktok: [],
          loading: true
        }
      }
      case actionTypes.ShowOrdersFilter: {
        return {
          ...state,
          orders: [],
          loading: true
        }
      }

      case actionTypes.OrdersLoadedSuccess: {
        return {
          ...state,
          orders: action.payload?.orders || [],
          page:action.payload?.page,
          loading: false
        }
      }
      case actionTypes.OrdersLoadedCmtSuccess: {
        return {
          ...state,
          ordersCmt: action.payload?.orders || [],
          loading: false
        }
      }
      case actionTypes.OrdersLoadedFollowerTiktokSuccess: {
        return {
          ...state,
          ordersFollowerTiktok: action.payload?.orders || [],
          loading: false
        }
      }
      case actionTypes.GroupLoadedSuccess: {
        return {
          ...state,
          groups: action.payload?.groups
        }
      }
      case actionTypes.SelectGroup: {
        return {
          ...state,
          currentGroup: action.payload?.group
        }
      }
      case actionTypes.GroupDeleteSuccess: {
        return {
          ...state,
          currentGroup: undefined,
          groups: state.groups.filter((item: Group) => {
            if (item.id === action.payload?.id) {
              return false
            }
            return true
          })
        }
      }
      case actionTypes.DeleteOrderSuccess: {
        return {
          ...state,
          orders: state.orders.filter((item: OrderModel) => {
            if (item.device_id === action.payload?.device_id) {
              return false
            }
            return true
          })
        }
      }
      case actionTypes.OrdersLoadedFail: {
        return {
          ...state,
          orders: [],
          loading: false
        }
      }
      case actionTypes.ProfilesByDeviceLoadedSuccess: {
        return {
          ...state,
          profiles: action.payload?.profiles || [],
          loading: false
        }
      }
      case actionTypes.RequestUpdate: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.RequestUpdateMode: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.RequestUpdateBox: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.RequestUpdateFollower: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.UpdateMultiOrderRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.UpdateSuccess: {
        const remaporders = state.orders.map((item: OrderModel) => {
          if (item.device_id === action.payload?.device?.device_id) {
            return action.payload?.device
          } else {
            return item
          }
        })
        return {
          ...state,
          orders: remaporders,
          adding: true,
          loading: true,
          currentOrder: undefined
        }
      }
      case actionTypes.UpdateMultiSuccess: {
        const remaporders = state.orders.map((item: OrderModel) => {
          const findItem = action.payload?.device.find((_item:OrderModel)=>{
            if(_item.device_id===item.device_id){
              console.log(_item.device_id)
              return true
            }
            return false
          })
          if(findItem){
            return findItem
          }
          return item
        })
        return {
          ...state,
          orders: remaporders,
          loading: false,
          adding: false,
          currentOrder: undefined
        }
      }
    
      case actionTypes.UpdateMultiFollowerSuccess: {
        const remaporders = state.ordersFollowerTiktok.map((item: OrderModelFollower) => {
          const findItem = action.payload?.channel_tiktok.find((_item:OrderModelFollower)=>{
            if(_item.orderid==item.orderid){
              return true
            }
            return false
          })
          if(findItem){
            return findItem
          }
          return item
        })
        return {
          ...state,
          ordersFollowerTiktok: remaporders,
          loading: false,
          adding: false,
          currentOrderFollowerTiktok: undefined
        }
      }
      case actionTypes.UpdateFail: {
        return {
          ...state,
          loading: false
        }
      }
      case actionTypes.AddOrderRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.AddOrderManualRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.GroupAddSuccess: {
        return {
          ...state,
          groups: state.groups.concat(action.payload?.group)
        }
      }
      case actionTypes.AddOrderSuccess: {
        return {
          ...state,
          adding: false,
          orders: state.orders.concat(action.payload?.order)
        }
      }
      case actionTypes.AddOrdersSuccess: {
        return {
          ...state,
          adding: false,
          orders: state.orders.concat(action.payload?.orders)
        }
      }
      case actionTypes.AddOrderFail: {
        return {
          ...state,
          adding: false,
          message: action.payload?.message
        }
      }
      case actionTypes.ShowcurrentOrder: {
        return {
          ...state,
          currentOrder: action.payload?.currentOrder
        }
      }
      case actionTypes.ShowcurrentOrderBox: {
        return {
          ...state,
          currentOrderBox: action.payload?.currentOrderBox
        }
      }
      case actionTypes.ClearSelected: {
        return {
          ...state,
          currentOrder: action.payload?.currentOrder,
          currentOrderBox: action.payload?.currentOrderBox
        }
      }
      case actionTypes.CheckedChange: {
        return {
          ...state,
          orders:  state.orders.map(item=>{
            if(item.device_id===action.payload?.data?.device_id){
              return {
                ...item,
                checked:action?.payload?.data?.checked
              }
            }
            return item
          })
        }
      }

      case actionTypes.CheckedChangeProfile: {
        return {
          ...state,
          profiles:  state.profiles.map(item=>{
            if(item.profile_id===action.payload?.data?.profile_id){
              return {
                ...item,
                checked:action?.payload?.data?.checked
              }
            }
            return item
          })
        }
      }
     
      case actionTypes.CheckedChangeFollower: {
        return {
          ...state,
          ordersFollowerTiktok:  state.ordersFollowerTiktok.map(item=>{
            if(item.orderid===action.payload?.data?.orderid){
              return {
                ...item,
                checked:action?.payload?.data?.checked
              }
            }
            return item
          })
        }
      }
      case actionTypes.CheckedProfilesAllChange: {
        return {
          ...state,
          profiles:  state.profiles.map(item=>{
            return {
              ...item,
              checked:action?.payload?.checked
            }
          })
        }
      }
      case actionTypes.CheckedAllChange: {
        return {
          ...state,
          orders:  state.orders.map(item=>{
            return {
              ...item,
              checked:action?.payload?.checked
            }
          })
        }
      }
     
      case actionTypes.CheckedAllChangeFollower: {
        return {
          ...state,
          ordersFollowerTiktok:  state.ordersFollowerTiktok.map(item=>{
            return {
              ...item,
              checked:action?.payload?.checked
            }
          })
        }
      }
      
      

      default:
        return state
    }
  }
)

export const actions = {
  requestOrders: (size:number,page:number,sort:string,sort_type:string,key:string,state:number) => ({ type: actionTypes.RequestOrders ,payload:{size,page,sort,sort_type,key,state}}),
  requestProfilesByDevice: (device_id:string) => ({ type: actionTypes.RequestProfilesByDevice,payload:{device_id} }),
  requestOrderCmt: (user:string) => ({ type: actionTypes.RequestOrderCmt ,payload:{user}}),
  requestOrderFollowerTiktok: (user:string) => ({ type: actionTypes.RequestOrderFollowerTiktok ,payload:{user}}),
  showordersfilter: (key: string,user:string) => ({ type: actionTypes.ShowOrdersFilter ,payload: { key,user }} ),
  fulfillorders: (orders: OrderModel[],page:number) => ({ type: actionTypes.OrdersLoadedSuccess, payload: { orders,page } }),
  fulfillProfilesByDevice: (profiles: ProfileModel[]) => ({ type: actionTypes.ProfilesByDeviceLoadedSuccess, payload: { profiles } }),
  fulfillorderFollowerTiktok: (orders: OrderModelFollower[]) => ({ type: actionTypes.OrdersLoadedFollowerTiktokSuccess, payload: { orders } }),
  loadordersFail: (message: string) => ({ type: actionTypes.OrdersLoadedFail, payload: { message } }),
  addOrderRequest: (data: OrderForm) => ({ type: actionTypes.AddOrderRequest, payload: { data } }),
  addOrderManualRequest: (data: OrderFormManual) => ({ type: actionTypes.AddOrderManualRequest, payload: { data } }),
  editMultiOrderRequest: (orderid: string) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { orderid } }),
  addOrderSuccess: (order: OrderModel) => ({ type: actionTypes.AddOrderSuccess, payload: { order } }),
  addOrdersSuccess: (orders: OrderModel[]) => ({ type: actionTypes.AddOrdersSuccess, payload: { orders } }),
  addOrderFail: (message: string) => ({ type: actionTypes.AddOrderFail, payload: { message } }),
  requestUpdate: (device_id: string,state:number) => ({ type: actionTypes.RequestUpdate, payload: { device_id,state} }),
  requestUpdateMode: (device_id: string,mode:string) => ({ type: actionTypes.RequestUpdateMode, payload: { device_id,mode} }),
  requestUpdateBox: (device: OrderModel) => ({ type: actionTypes.RequestUpdateBox, payload: { device } }),
  requestUpdateFollower: (orderid: string) => ({ type: actionTypes.RequestUpdateFollower, payload: { orderid } }),
  updateSuccess: (videoview: OrderModel[]) => ({ type: actionTypes.UpdateSuccess, payload: { videoview } }),
  updateMultiSuccess: (device: OrderModel[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { device } }),
  updateMultiFollowerSuccess: (channel_tiktok: OrderModelFollower[]) => ({ type: actionTypes.UpdateMultiFollowerSuccess, payload: { channel_tiktok } }),
  updateFail: (message: string) => ({ type: actionTypes.UpdateFail, payload: { message } }),
  showcurrentOrder: (currentOrder: OrderModel) => ({ type: actionTypes.ShowcurrentOrder, payload: { currentOrder } }),
  showcurrentOrderBox: (currentOrderBox: OrderModel) => ({ type: actionTypes.ShowcurrentOrderBox, payload: { currentOrderBox } }),
  clearcurrentOrder: () => ({ type: actionTypes.ClearSelected }),
  requestGroups: () => ({ type: actionTypes.GroupLoadedRequest }),
  fulfillGroups: (groups: Group[]) => ({ type: actionTypes.GroupLoadedSuccess, payload: { groups } }),
  addGroupRequest: (groupName: string) => ({ type: actionTypes.GroupAddRequest, payload: { groupName } }),
  addGroupSuccess: (group: Group) => ({ type: actionTypes.GroupAddSuccess, payload: { group } }),
  deleteGroupRequest: (id: number) => ({ type: actionTypes.GroupDeleteRequest, payload: { id } }),
  deleteGroupSuccess: (id: number) => ({ type: actionTypes.GroupDeleteSuccess, payload: { id } }),
  selectGroup: (group: Group) => ({ type: actionTypes.SelectGroup, payload: { group } }),
  deleteOrderRequest: (device_id: string) => ({ type: actionTypes.DeleteOrderRequest, payload: { device_id } }),
  deleteOrderSuccess: (device_id: string) => ({ type: actionTypes.DeleteOrderSuccess, payload: { device_id } }),
  checkedChange: (data:{device_id:string,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedChangeProfile: (data:{profile_id:string,checked:boolean}) => ({ type: actionTypes.CheckedChangeProfile, payload: { data } }),
  checkedChangeCmt: (data:{orderid:number,checked:boolean}) => ({ type: actionTypes.CheckedChangeCmt, payload: { data } }),
  checkedChangeFollower: (data:{orderid:number,checked:boolean}) => ({ type: actionTypes.CheckedChangeFollower, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
  checkedAllChangeCmt: (checked:boolean) => ({ type: actionTypes.CheckedAllChangeCmt, payload: { checked } }),
  checkedAllChangeFollower: (checked:boolean) => ({ type: actionTypes.CheckedAllChangeFollower, payload: { checked } }),
  checkedProfilesAllChange: (checked:boolean) => ({ type: actionTypes.CheckedProfilesAllChange, payload: { checked } }),

}

export function* saga() {
  yield takeLatest(actionTypes.RequestOrders, function* userRequested(param: any) {
    const payload = param.payload
    const { data: orders } = yield getListOrder(payload.size,payload.page,payload.sort,payload.sort_type,payload.key,payload.state)
    yield put(actions.fulfillorders(orders.device,orders.page))
  })
  yield takeLatest(actionTypes.RequestProfilesByDevice, function* userRequested(param: any) {
    const payload = param.payload.device_id
    const {data: profiles} = yield getListProfilesByDevice(payload)
    yield put(actions.fulfillProfilesByDevice(profiles.profiles))
  })
  yield takeLatest(actionTypes.RequestOrderFollowerTiktok, function* userRequestedcmt(param: any) {
    const payload = param.payload.user
    const { data: orders } = yield getListOrderFollowerTiktok(payload)
    yield put(actions.fulfillorderFollowerTiktok(orders.channel_tiktok))
    if(orders.channel_tiktok==null){
      alert("Không tìm thấy thông tin đơn!")
    }
  })
  yield takeLatest(actionTypes.ShowOrdersFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.device,orders.page))
  })

  http://localhost:8080/Fitnees/

  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    const { data: result } = yield updateOrder(param.payload.device_id,param.payload.state)
    console.log(result.device)
    if (result && result.device) {
      yield put(actions.updateMultiSuccess(result.device))
    } else {
      yield put(actions.updateFail(result.message))
    }

  })
  yield takeLatest(actionTypes.RequestUpdateMode, function* updateUserRequestedMode(param: any) {
    const { data: result } = yield updateMode(param.payload.device_id,param.payload.mode)
    console.log(result.device)
    if (result && result.device) {
      yield put(actions.updateMultiSuccess(result.device))
    } else {
      yield put(actions.updateFail(result.message))
    }

  })
  yield takeLatest(actionTypes.RequestUpdateBox, function* updateUserRequestedBox(param: any) {
    const { data: result } = yield updateOrderBox(param.payload.device)
    if (result && result.device) {
      yield put(actions.updateMultiSuccess(result.device))
    } else {
      yield put(actions.updateFail(result.message))
    }

  })
  
  yield takeLatest(actionTypes.AddOrderManualRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
        const { data: result } = yield addOrderManual(payload)
        if (result && (result.videoview)) {
            yield put(actions.addOrderSuccess(result.videoview))
        } else {
          yield put(actions.addOrderFail(result.message))
        }
      
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })
  yield takeLatest(actionTypes.AddOrderRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
        const { data: result } = yield addOrder(payload)
        if (result && (result.channel||result.channels)) {
          if(payload.channel_id.includes("\n")){
            yield put(actions.addOrdersSuccess(result.channels))
          }else{
            yield put(actions.addOrderSuccess(result.channel))
          }
        } else {
          yield put(actions.addOrderFail(result.message))
        }
      
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })

  yield takeLatest(actionTypes.UpdateMultiOrderRequest, function* updateUserRequested(param: any) {
    try {
      const { data: result } = yield updateOrder(param.payload.device_id,param.payload.state)
        if (result && result.device) {
          yield put(actions.updateMultiSuccess(result.device))
        } else {
          yield put(actions.addOrderFail(result.message))
        } 
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })

  yield takeLatest(actionTypes.GroupAddRequest, function* addOrderRequest(param: any) {
    try {
      const payload = param.payload.groupName
      const { data: result } = yield addGroup(payload)
      if (result && result.group) {
        yield put(actions.addGroupSuccess(result.group))
      } else {

      }
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })

  yield takeLatest(actionTypes.DeleteOrderRequest, function* DeleteOrderRequest(param: any) {
    try {
      const payload = param.payload.device_id
      const { data: result } = yield deleteChannel(payload)
      if (result&&result.device!==null) {
        yield put(actions.deleteOrderSuccess(payload))
      } else {

      }
    } catch (error) {

    }
  })


}
