/*
 * @Author: eamiear
 * @Date: 2019-08-07 16:43:10
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-10-22 16:39:02
 */

import { getAction, postFormAction, postAction, deleteAction } from '@/utils/ajax'

// 酒店
const getHotelList = (params) => getAction('/sys/hotel/listHotel', { ...params })
const getHotelListAll = () => getAction('/sys/hotel/listAllHotel')
const editHotel = () => postAction('/sys/hotel/editHotel', {})
const addHotel = () => postAction('/sys/hotel/addHotel', {})
const delHotel = (ids) => deleteAction('/sys/hotel/deleteBatchHotel', {ids})
const getUserListByHotel = (params) => getAction('/common/getHotelUserList', params)
const bindHotelUser = (hotelId, userId) => postAction('/common/bindHotelUser', { hotelId, userId })
const unbindHotelUser = (hotelId, userId) => postAction('/common/unbindHotelUser', { hotelId, userId })
const getHotelSetting = (hotelId) => getAction('/sys/hotel/listHotelSetting', {hotelId})
const addHotelSetting = (params) => postAction('/sys/hotel/addOrUpdateHotelSetting', params)
const editHotelSetting = (params) => postAction('/sys/hotel/addOrUpdateHotelSetting', params)

// 企业
const getCompanyList = (params) => getAction('/sys/hotel/listCompany', params)
const getCompanyListAll = () => getAction('/sys/hotel/listAllCompany')
const editCompany = (params) => postAction('/sys/hotel/editCompany', params)
const addCompany = (params) => postAction('/sys/hotel/addCompany', params)
const delCompany = (params) => postAction('/sys/hotel/deleteBatchCompany', params)

// 房间
const getRoomDeviceList = (params) => getAction('/common/room/devices', {
  CMD: 'get_room_device',
  device: JSON.stringify(params)
})

const getRoomList = ({hotelId, name, floorName, roomName, pageNo, pageSize}) => getAction('/sys/hotel/listRoom', {hotelId, name, floorName, roomName, pageNo, pageSize})
const addRoom = ({hotelId, name, pid}) => postFormAction('/sys/hotel/addOrUpdateRoom', {hotelId, name, pid})
const editRoom = ({hotelId, name, pid, id}) => getAction('/sys/hotel/addOrUpdateRoom', {hotelId, name, pid, id})
const delRoom = (id) => getAction('/sys/hotel/deleteRoom', {id})

const getHotelRoomGatewayDeviceList = ({id, serialId, pageNo, pageSize}) => getAction('/sys/hotel/listRoomGatewayDeviceList', {id, serialId, pageNo, pageSize})
const getHotelRoomInfraredDeviceList = ({id, serialId, pageNo, pageSize}) => getAction('/sys/hotel/listRoomGatewayDeviceList', {id, serialId, pageNo, pageSize})
const bindRoomGateway = ({id, serialId}) => postAction('/sys/hotel/bindRoomGateway', {id, serialId})
const unbindRoomGateway = ({serialId}) => postAction('/sys/hotel/unbindRoomGateway', {serialId})
const bindRoomInfrared = ({id, serialId}) => postAction('/sys/hotel/bindRoomInfrared', {id, serialId})
const unbindRoomInfrared = ({serialId}) => postAction('/sys/hotel/unbindRoomInfrared', {serialId})

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
const getBuildingList = ({hotelId, name, pageNo, pageSize}) => getAction('/sys/hotel/listTower', {hotelId, name, pageNo, pageSize})
const getSelectBuildingList = () => getAction('/common', {
  CMD: 'get_select_building'
})

const addBuilding = ({hotelId, name}) => postAction('/sys/hotel/addOrUpdateTower', {hotelId, name})
const editBuilding = ({hotelId, name, id}) => postAction('/sys/hotel/addOrUpdateTower', {hotelId, name, id})
const delBuilding = (id) => deleteAction('/common', {id})

// floor
const getFloorList = ({hotelId, name, floorName, pageNo, pageSize}) => getAction('/sys/hotel/listFloor', {hotelId, name, floorName, pageNo, pageSize})
const getFloorByBuildingId = (buildingId) => getAction('/common', {
  CMD: 'get_building_floor',
  floor: JSON.stringify({
    buildingId
  })
})
const addFloor = ({hotelId, name, pid}) => postFormAction('/sys/hotel/addOrUpdateFloor', {hotelId, name, pid})
const editFloor = ({hotelId, name, pid, id}) => postFormAction('/sys/hotel/addOrUpdateFloor', {hotelId, name, pid, id})
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
  getRoomDeviceList,
  getRoomList,
  addRoom,
  editRoom,
  delRoom,

  getHotelRoomGatewayDeviceList,
  getHotelRoomInfraredDeviceList,
  bindRoomGateway,
  unbindRoomGateway,
  bindRoomInfrared,
  unbindRoomInfrared,

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
