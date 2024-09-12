import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { AccountModel,AccountForm } from '../models/Account'
import {getListAccount, updateAccount, deleteVps, updateResetVPS} from './AccountCRUD'
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  RequestAccounts: '[Services] Requested',
  AccountsLoadedSuccess: '[Services] Loaded succcess',
  AccountsLoadedFail: '[Services] load fail',
  ShowCurrentAccount: '[Services] Show services',
  RequestUpdate: '[Services] Requested Update',
  UpdateSuccess: '[Services] Update Success',
  UpdateFail: '[Services] Update Fail',
  ClearSelected:'[Services] Clear selected services',
  DeleteVpsRequest: '[Services] Delete services Request',
  DeleteVpsSuccess: '[Services] Delete services Success',
  DeleteMultiVpsRequest: '[Services] Delete services Request',
  DeleteMultiVpsSuccess: '[Services] Delete services Success',
  CheckedChange: '[Services] Checked Change',
  CheckedAllChange: '[Services] Checked All Change',
  UpdateMultiOrderRequest: '[Services] Update Multi services Request',
  UpdateRestartMultiOrderRequest: '[Services] Update Restart Multi services Request',
  UpdateMultiSuccess: '[Services] Update Multi Success',
}

const initialAccountState: IAccountState = {
  services: [],
  loading: false,
  adding:false,
  currentService:undefined
}

export interface IAccountState {
  services: AccountModel[]
  loading: boolean
  adding:boolean
  currentService?:AccountModel
}

export const reducer = persistReducer(
  { storage, key: 'v1-accounts', whitelist: [] },
  (state: IAccountState = initialAccountState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.RequestAccounts: {
        return {
          ...state,
          services: [],
          loading: true
        }
      }
      case actionTypes.AccountsLoadedSuccess: {
        return {
          ...state,
          services: action.payload?.services || [],
          loading: false
        }
      }
      case actionTypes.AccountsLoadedFail: {
        return {
          ...state,
          services: [],
          loading: false
        }
      }
      case actionTypes.RequestUpdate: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.UpdateSuccess: {

        const remapAccounts = state.services.map((item: AccountModel)=>{
          if(item.service_id===action.payload?.service?.service_id){
            return action.payload?.service
          }else {
            return item
          }
        })
        return {
          ...state,
          services: remapAccounts,
          loading: false,
          currentService: undefined
        }
      }
      case actionTypes.DeleteVpsSuccess: {
        return {
          ...state,
          services: state.services.filter((item: AccountModel) => {
            if (action.payload?.service.indexOf(item.service_id)>=0)  {
              return false
            }
            return true
          })
        }
      }
      case actionTypes.UpdateFail: {
        return {
          ...state,
          loading: false
        }
      }
      case actionTypes.ShowCurrentAccount: {
        return {
          ...state,
          currentService: action.payload?.currentService
        }
      }
      case actionTypes.ClearSelected: {
        return {
          ...state,
          currentService: action.payload?.currentService
        }
      }

      case actionTypes.CheckedChange: {
        return {
          ...state,
          services:  state.services.map(item=>{
            if(item.service_id===action.payload?.data?.service_id){
              return {
                ...item,
                checked:action?.payload?.data?.checked
              }
            }
            return item
          })
        }
      }
      case actionTypes.CheckedAllChange: {
        return {
          ...state,
          services:  state.services.map(item=>{
            return {
              ...item,
              checked:action?.payload?.checked
            }
          })
        }
      }
      case actionTypes.UpdateMultiOrderRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.UpdateRestartMultiOrderRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.UpdateMultiSuccess: {
        const remaporders = state.services.map((item:AccountForm) => {
          const findItem = action.payload?.services.find((_item:AccountForm)=>{
            if(_item.service_id===item.service_id){
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
          services: remaporders,
          loading: false,
          adding: false,
          currentService: undefined
        }
      }
      default:
        return state
    }
  }
)

export const actions = {
  requestAccounts: () => ({ type: actionTypes.RequestAccounts }),
  fulfillAccounts: (services: AccountModel[]) => ({ type: actionTypes.AccountsLoadedSuccess, payload: { services } }),
  loadAccountsFail: (message: string) => ({ type: actionTypes.AccountsLoadedFail, payload: { message } }),
  requestUpdate: (service: AccountForm) => ({ type: actionTypes.RequestUpdate, payload: { service } }),
  updateSuccess: (service: AccountModel) => ({ type: actionTypes.UpdateSuccess, payload: { service } }),
  updateFail: (message: string) => ({ type: actionTypes.UpdateFail, payload: { message } }),
  showCurrentAccount: (currentService: AccountModel) => ({ type: actionTypes.ShowCurrentAccount, payload: { currentService } }),
  clearCurrentAccount: () => ({ type: actionTypes.ClearSelected}),
  deleteVpsRequest: (vps: string) => ({ type: actionTypes.DeleteVpsRequest, payload: { vps } }),
  deleteVpsSuccess: (vps: string) => ({ type: actionTypes.DeleteVpsSuccess, payload: { vps } }),
  checkedChange: (data:{username:string,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
  editMultiOrderRequest: (data: AccountForm) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { data } }),
  editRestartMultiOrderRequest: (data: AccountForm) => ({ type: actionTypes.UpdateRestartMultiOrderRequest, payload: { data } }),
  updateMultiSuccess: (services: AccountForm[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { services } }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestAccounts, function* userRequested(param: any) {
    const {data: services} = yield getListAccount()
    yield put(actions.fulfillAccounts(services.services))
  })
  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    //console.log("------update account param-----",param.payload.account)
    const {data: service} = yield updateAccount(param.payload.service)
    console.log("------update service res-----",service.service)
    yield put(actions.updateSuccess(service.service))
  })
  yield takeLatest(actionTypes.DeleteVpsRequest, function* DeleteVpsRequest(param: any) {
    try {
      const payload = param.payload.vps
      const { data: result } = yield deleteVps(payload)
      if (result&&result.vps!==null) {
        yield put(actions.deleteVpsSuccess(payload))
      } else {

      }
    } catch (error) {

    }
  })
  yield takeLatest(actionTypes.UpdateMultiOrderRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
      const { data: result } = yield updateAccount(payload)
      if (result && result.accounts) {
        yield put(actions.updateMultiSuccess(result.accounts))
      } else {
        yield put(actions.updateFail(result.message))
      }
    } catch (error) {
      yield put(actions.updateFail(""))
    }
  })

  yield takeLatest(actionTypes.UpdateRestartMultiOrderRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
      const { data: result } = yield updateResetVPS(payload)
      if (result && result.accounts) {
        yield put(actions.updateMultiSuccess(result.accounts))
      } else {
        yield put(actions.updateFail(result.message))
      }
    } catch (error) {
      yield put(actions.updateFail(""))
    }
  })

}
