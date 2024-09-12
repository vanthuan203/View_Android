export interface AccountModel {
  id:number
  role:string,
  username:string,
  balance:number,
  password:string,
  discount:number,
  max_order:number,
  note:string,
  vip:number,
  rate:number,
  time_add:number,
  checked?:boolean
}
export interface OrderModelChecked {
  username: string,
  id:number
}

export interface AccountForm {
  username:string,
  balance:number,
  password:string,
  role:string,
  discount:number,
  max_order:number,
  note:string,
  rate:number,
  vip:number
}
