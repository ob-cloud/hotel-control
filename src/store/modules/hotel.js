import Vue from 'vue'
import { getHotelListAll } from '@/api/hotel'
import { isAjaxSuccess } from '@/utils/util'
import { HOTELID, HOTEL_LIST } from '@/store/mutation-types'
const hotel = {
  state: {
    hotelId: '',
    hotelList: []
  },

  mutations: {
    SET_HOTELID: (state, hotelId) => {
      state.hotelId = hotelId
      Vue.ls.set(HOTELID, hotelId)
    },
    SET_HOTELLIST: (state, hotelList) => {
      state.hotelList = hotelList
      Vue.ls.set(HOTEL_LIST, hotelList)
    }
  },

  actions: {
    GetHotelList ({ commit }) {
      return new Promise((resolve, reject) => {
        getHotelListAll().then(response => {
          if (!isAjaxSuccess(response.code)) {
            reject()
          }
          const hotelList = response.result || []
          if (hotelList && hotelList.length > 0) {
            const firstHotel = hotelList[0]
            commit('SET_HOTELID', firstHotel.id)
            commit('SET_HOTELLIST', hotelList)
          } else {
            reject(new Error('getHotelListAll: hotel list must be a non-null array!'))
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateHotelId ({ commit }, hotelId) {
      console.log('UpdateHotelId: ', hotelId)
      commit('SET_HOTELID', hotelId)
      return Promise.resolve()
    }
  }
}

export default hotel
