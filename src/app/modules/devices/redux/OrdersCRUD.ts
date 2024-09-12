import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton,deleteFunciton } from 'utils/ApiHelper'
import {OrderForm, OrderFormManual, OrderModel, OrderPost} from '../models/Order'



export async function getListOrder(size:number,page:number,sort:string,sort_type:string,key:string,state:number) {
  const res:any = await getFunciton("device/get_List_Device?size="+size+"&page="+page+"&sort="+sort+"&sort_type="+sort_type+"&key="+key+"&state="+state)
  return res
}
export async function getListProfilesByDevice(device_id:string) {
  const res:any = await getFunciton("profile/get_List_Profile?device_id="+device_id)
  return res
}
export async function getListOrderCmt(videoid:string) {
  const res:any = await getFunciton("videocomment/findorder?videoid="+videoid)
  return res
}

export async function getListOrderFollowerTiktok(tiktok_id:string) {
  const res:any = await getFunciton("channel_tiktok/findorder?tiktok_id="+tiktok_id)
  return res
}

export async function getOrderFilter(key:string,user:string) {
  const res:any = await getFunciton("videobuffh/getorderfilterbuffhhistory?key="+key+'&user='+user)
  return res
}

export async function updateSetting(channel_prior:number) {
  console.log("api/updateSetting?channel_prior="+channel_prior)
  const res:any = await getFunciton("api/updateSetting?channel_prior="+channel_prior)
  return res
}

export async function updateOrder(device_id:string,state:number) {
  
    const res:any = await getFunciton("device/update_State?device_id="+device_id+"&state="+state)
    return res
}

export async function updateMode(device_id:string,mode:string) {

  const res:any = await getFunciton("device/update_Mode?device_id="+device_id+"&mode="+mode)
  return res
}

export async function updateOrderCmt(orderid:string) {
  const res:any = await getFunciton("videocomment/updateRefundHis?orderid="+orderid)
  return res
}

export async function updateOrderBox(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("device/update",order)
  return res
}


export async function addOrder(order:OrderForm) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}
export async function addOrderManual(order:OrderFormManual) {
  const res:any = await postWithoutTokenFunciton("videobuffh/orderbuffh",order)
  return res
}

export async function addOrderMulti(order:OrderPost) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}
export async function bhorderv2( videoid:string) {
  const res = await postWithoutTokenFunciton("videoview/findorder", {
    videoid:videoid
  })
  return res
}

export async function findorder( videoid:string) {
  const res = await postWithoutTokenFunciton("videoview/findorder", {
    videoid:videoid
  })
  return res
}



export async function addGroup(groupName:string) {
  const res:any = await postWithoutTokenFunciton("/group/insert",{
    name: groupName
  })
  return res
}

export async function deleteGroup(id:number) {
  const res:any = await deleteFunciton("/group/delete?id="+id)
  return res
}

export async function deleteChannel(device_id:string) {
  const res:any = await deleteFunciton("/device/delete_Device?device_id="+device_id)
  return res
}
