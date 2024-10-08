export interface OrderModel {
  id:number,
  balance:number,
  add_time:number,
  total_blance:number,
  user:string,
  service:number,
  platform:string,
  task:string,
  note:string,
}
export interface OrderModelChecked {
  id:number,
  balance:number,
  add_time:string,
  total_blance:number,
  user:string,
  service:number,
  platform:string,
  task:string,
  note:string,
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