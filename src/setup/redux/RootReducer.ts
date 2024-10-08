import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import * as vpstiktok from '../../app/modules/vpstiktok'
import * as orderdone from '../../app/modules/orderdone'
import * as orderpending from '../../app/modules/orderpending'
import * as ordercheckcancel from '../../app/modules/ordercheckcancel'
import * as orderhistory from '../../app/modules/orderhistory'
import * as orderhistoryfind from '../../app/modules/orderhistoryfind'
import * as devices from '../../app/modules/devices'
import * as orderbaohanh from '../../app/modules/orderbaohanh'
import * as histories from '../../app/modules/history'
import * as users from '../../app/modules/users'
import * as setting from '../../app/modules/setting'
import * as balance from '../../app/modules/balance'
import * as services from '../../app/modules/services'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  vpstiktok: vpstiktok.reducer,
  users:users.reducer,
  services:services.reducer,
  orderhistory: orderhistory.reducer,
  histories:histories.reducer,
  orderdone:orderdone.reducer,
  ordercheckcancel:ordercheckcancel.reducer,
  setting:setting.reducer,
  balance:balance.reducer,
  orderbaohanh:orderbaohanh.reducer,
  orderhistoryfind:orderhistoryfind.reducer,
  orderpending:orderpending.reducer,
  devices:devices.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga(),,orderdone.saga(),histories.saga(),orderhistory.saga(),users.saga(),setting.saga(),balance.saga(),services.saga(),ordercheckcancel.saga(),orderbaohanh.saga(),orderhistoryfind.saga(),orderpending.saga()
    ,vpstiktok.saga(),devices.saga()
  ])
}
