export interface OrderModel {
  device_id: string,
  profile_id: string,
  platform: string,
  box_id: string,
  rom_version: string,
  mode: string,
  task: string,
  add_time: number,
  update_time: number,
  get_time: number,
  running: number,
  num_profile: number,
  num_account: number,
  state: number,
  checked:boolean
}

export interface ProfileModel {
  profile_id: string,
  device_id: string,
  acc_die: string,
  acc_live: string,
  add_time: number,
  update_time: number,
  enabled_time: number,
  num_profile: number,
  num_account: number,
  num_account_die: number,
  state: number,
  enabled: number,
  running: number,
  get_time: number,
  platform: string,
  task: string,
  checked:boolean
}

export interface OrderModelFollower {
  orderid:number,
  tiktok_id:string,
  price:number,
  follower_order:number,
  follower_start:number,
  follower_total:number,
  follower_end:number,
  insert_date:number,
  end_date:number,
  cancel:number,
  service:number
  note:string,
  user:string,
  time_check_refill:number,
  time_start:number
  status:string
  info:string,
  checked?:boolean
}


export interface OrderModelCmt {
  vieworder:number,
  service:number,
  orderid:number,
  videoid: string,
  videotitle: string,
  commenttotal: number,
  commentstart:number,
  commentorder:number,
  commentend:number,
  total: number,
  maxthreads: number,
  channelid:string,
  viewstart:number,
  viewend:number,
  enabled: number,
  insertdate: number,
  timestart:number,
  timecheckbh:number,
  enddate: number,
  cancel:number,
  homerate: number ,
  note: string,
  directrate:number,
  timebuff:number,
  timebuffh24h:number,
  view24h:number,
  viewtotal:number,
  timebuffhtotal: number,
  commentrate:number,
  mobilerate:number,
  searchrate:number,
  likerate:number,
  suggestrate:number,
  duration:number,
  optionbuff:number,
  user:string,
  price:number,
  status:string,
  checked?:boolean
}
export interface OrderModelChecked {
  id:number,
  device_id: string
}

export interface OrderUpdateForm {
  videoid: string,
  videotitle: string,
  total: number,
  maxthreads: number,
  channelid:string,
  viewstart:number,
  viewend:number,
  enabled: number,
  insertdate: number,
  enddate: number,
  homerate: number ,
  note: string,
  directrate:number,
  timebuff:number,
  timebuffh24h:number,
  view24h:number,
  viewtotal:number,
  timebuffhtotal: number,
  commentrate:number,
  mobilerate:number,
  searchrate:number,
  likerate:number,
  suggestrate:number,
  optionbuff:number,
  user:string
}

export interface OrderForm {
  device_id: string,
  box_id: string,
  state: number
}
export interface OrderFormManual {
  videoid:string,
  homerate: number,
  note: string,
  directrate: number,
  //view_need: number,
  //list_video:string,
  commentrate: number,
  mobilerate: number,
  searchrate: number,
  enabled: number,
  maxthreads: number,
  viewstart:number,
  //group_id: number,
  likerate: number,
  //comment_list: string,
  suggestrate: number,
  //premium_rate: number,
  //keyword: string
  timebuff:number,
  optionbuff:number,
  user:string
}

export interface OrderPost {
  channel_id: string
  subscribe_need: number
  tab_run: number
  note: string
  group_id: number
}


export interface Group {
  id: number
  insert_date: number
  insert_dateString: string
  name: number
  number_channel: number
}