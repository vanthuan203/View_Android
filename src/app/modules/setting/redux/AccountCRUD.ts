import axios from 'axios'
import {postWithoutTokenFunciton, getFunciton, deleteFunciton} from 'utils/ApiHelper'
import { AccountModel,AccountLimitModel,PlatformModel,ProxySettingModel } from '../models/Account'



export async function getListAccount() {
  const res:any = await getFunciton("setting/get_Setting_System")
  return res
}

export async function getListLimitService() {
  const res:any = await getFunciton("setting/get_Task_Priority")
  return res
}
export async function getListLimitPlatform() {
  const res:any = await getFunciton("setting/get_List_Platform")
  return res
}
export async function getListProxySetting() {
  const res:any = await getFunciton("setting/get_Setting_Platform")
  return res
}


export async function updateAccount(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("setting/update_Setting_System",account)
  return res
}

export async function updateAccountLimit(task_priority:AccountLimitModel) {
  const res:any = await postWithoutTokenFunciton("setting/update_Task_Priority",task_priority)
  return res
}

export async function updatePlatformLimit(platform:AccountLimitModel) {
  const res:any = await postWithoutTokenFunciton("setting/update_Platform",platform)
  return res
}

export async function updateProxySetting(setting_platform:ProxySettingModel) {
  const res:any = await postWithoutTokenFunciton("setting/update_Setting_Platform",setting_platform)
  return res
}

export async function updateResetVPS(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("auth/updaterestart",account)
  return res
}

export async function deleteVps(vps:string) {
  const res:any = await deleteFunciton("auth/delete?username="+vps)
  return res
}

export async function allAccount() {
  const res:any = await getFunciton("auth/gmails/countgmails")
  return res
}