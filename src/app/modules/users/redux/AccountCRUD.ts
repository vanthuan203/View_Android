import axios from 'axios'
import {postWithoutTokenFunciton, getFunciton, deleteFunciton} from 'utils/ApiHelper'
import { AccountModel,AccountForm } from '../models/Account'



export async function getListAccount() {
  const res:any = await getFunciton("user/get_List_Users")
  return res
}


export async function updateAccount(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("user/update_User",account)
  return res
}

export async function addAccount(user:AccountForm) {
  const res:any = await postWithoutTokenFunciton("user/add_User",user)
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