/*
 * @Author: eamiear
 * @Date: 2019-08-07 16:43:10
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-10-21 16:50:22
 */

import { getAction, postFormAction, postAction } from '@/utils/ajax'

// 酒店
const getHotelList = (params) => getAction('/common/hotel/list', { ...params })
const getHotelListAll = () => getAction('/common/hotel/all')
const editHotel = () => postFormAction('/common/editHotel', {})
const addHotel = () => postFormAction('/common/addHotel', {})
const delHotel = (id) => postAction('/common/delHotel', {id})
const getUserListByHotel = (params) => getAction('/common/getHotelUserList', params)
const bindHotelUser = (hotelId, userId) => postAction('/common/bindHotelUser', { hotelId, userId })
const unbindHotelUser = (hotelId, userId) => postAction('/common/unbindHotelUser', { hotelId, userId })
const getHotelSetting = (id) => getAction('/common/getHotelSetting', {id})
const addHotelSetting = (params) => postAction('/common/addHotelSetting', params)
const editHotelSetting = (params) => postAction('/common/editHotelSetting', params)

// 企业
const getCompanyList = (params) => getAction('/common/company/list', params)
const getCompanyListAll = () => getAction('/common/company/all')
const editCompany = (params) => postAction('/common/company/edit', params)
const addCompany = (params) => postAction('/common/company/add', params)
const delCompany = (params) => postAction('/common/company/del', params)

// 房间
const getRoomCascader = () => getAction('/common', {
  CMD: 'get_building_floor_room'
})
const getRoomDeviceList = (params) => getAction('/common/room/devices', {
  CMD: 'get_room_device',
  device: JSON.stringify(params)
})
const getRoomList = (params) => getAction('/common/room/list', {
  CMD: 'get_room',
  room: JSON.stringify(params)
})
const addRoom = (params) => postFormAction('/common', {
  CMD: 'add_room',
  room: JSON.stringify(params)
})
const editRoom = (params) => getAction('/common', {
  CMD: 'update_room',
  room: JSON.stringify(params)
})
const delRoom = (id) => getAction('/common', {
  CMD: 'delete_room',
  room: JSON.stringify({
    id
  })
})
const bindRoomDevice= (params = {}) => postFormAction('/common', {
  CMD: 'bind_room_device',
  device: JSON.stringify(params)
})
const unbindRoomDevice = (params = {}) => postFormAction('/common', {
  CMD: 'unbind_room_device',
  device: JSON.stringify(params)
})

// 灯控
const handleLampPower = (params = {}) => postFormAction('/common', {
  CMD: 'tigger_room_device',
  device: JSON.stringify({ ...params, deviceChildType: '01' })
})
// 开关
const handleSwitchPower = (params = {}) => postFormAction('/common', {
  CMD: 'tigger_room_device',
  device: JSON.stringify({ ...params, deviceChildType: '0417' })
})

const getPowerStatus = () => getAction('/common', {
  CMD: 'get_alltype'
})

// 总控
const triggerAllPower = (deviceType) => getAction('/common', {
  CMD: 'tigger_room_device',
  device: JSON.stringify({deviceType})
})

// 楼栋
const getBuildingList = (params = {}) => getAction('/common/building/list', {
  CMD: 'get_building',
  building: JSON.stringify(params)
})
const getSelectBuildingList = () => getAction('/common', {
  CMD: 'get_select_building'
})

const addBuilding = (params = {}) => postFormAction('/common', {
  CMD: 'add_building',
  building: JSON.stringify(params)
})
const editBuilding = (params = {}) => postFormAction('/common', {
  CMD: 'update_building',
  building: JSON.stringify(params)
})
const delBuilding = (id) => postFormAction('/common', {
  CMD: 'delete_building',
  building: JSON.stringify({id})
})

// floor
const getFloorList = (params = {}) => getAction('/common/floor/list', {
  CMD: 'get_floor',
  floor: JSON.stringify(params)
})
const getFloorByBuildingId = (buildingId) => getAction('/common', {
  CMD: 'get_building_floor',
  floor: JSON.stringify({
    buildingId
  })
})
const addFloor = (params = {}) => postFormAction('/common', {
  CMD: 'add_floor',
  floor: JSON.stringify(params)
})
const editFloor = (params = {}) => postFormAction('/common', {
  CMD: 'update_floor',
  floor: JSON.stringify(params)
})
const delFloor = (id) => postFormAction('/common', {
  CMD: 'delete_floor',
  floor: JSON.stringify({id})
})

export {
  getHotelList,
  getHotelListAll,
  editHotel,
  addHotel,
  delHotel,
  getUserListByHotel,
  bindHotelUser,
  unbindHotelUser,
  getHotelSetting,
  addHotelSetting,
  editHotelSetting,

  // 企业
  getCompanyList,
  getCompanyListAll,
  editCompany,
  addCompany,
  delCompany,

  // 房
  getRoomCascader,
  getRoomDeviceList,
  getRoomList,
  addRoom,
  editRoom,
  delRoom,
  bindRoomDevice,
  unbindRoomDevice,
  handleLampPower,
  handleSwitchPower,
  getPowerStatus,
  triggerAllPower,

  getBuildingList,
  getSelectBuildingList,
  addBuilding,
  editBuilding,
  delBuilding,

  getFloorList,
  getFloorByBuildingId,
  addFloor,
  editFloor,
  delFloor
}
