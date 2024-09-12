export interface AccountModel {
  id:number
  max_acc:number,
  max_mysql:number,
  max_profile:number,
  max_task:number,
  update_time:number,
  checked?:boolean
}

export interface AccountLimitModel {
  task:string,
  priority:number,
  state:number,
  platform:string,
  update_time:number,
  checked?:boolean
}

export interface PlatformModel {
  activity:number,
  priority:number,
  state:number,
  platform:string,
  update_time:number,
  checked?:boolean
}



export interface ProxySettingModel {
  id:string,
  max_follower:number,
  max_subscriber:number,
  max_like:number,
  max_day_activity:number,
  max_activity_24h:number,
  platform:string,
  update_time:number,
  checked?:boolean
}

export interface OrderModelChecked {
  id:number
}

export interface AccountForm {
  id:number,
  max_acc:number,
  max_mysql:number,
  max_profile:number,
  max_task:number,
}

export interface AccountLimitForm {
  id:number
  user:string,
  service:number,
  maxorder:number,
  maxrunning:number,
}

export interface ProxySettingForm {
  id:number
  option_proxy:number,
  total_port:number,
  total_sock_port:number,
  username:string,
  password:string,
  cron:string
}
