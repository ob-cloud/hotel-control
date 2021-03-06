import Vue from 'vue'
import { USER_INFO, HOTELID } from '@/store/mutation-types'
const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => { state.user.avatar = Vue.ls.get(USER_INFO).avatar; return state.user.avatar },
  username: state => state.user.username,
  nickname: state => { state.user.realname = Vue.ls.get(USER_INFO).realname; return state.user.realname },
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  permissionList: state => state.user.permissionList,
  userInfo: state => { state.user.info = Vue.ls.get(USER_INFO); return state.user.info },
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  lang: state => state.i18n.lang,
  hotelId: state => { state.hotel.hotelId = Vue.ls.get(HOTELID); return state.hotel.hotelId },
  hotelList: state => state.hotel.hotelList,
  reloadFlag: state => state.app.reloadFlag
}

export default getters
