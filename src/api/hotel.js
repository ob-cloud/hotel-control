/*
 * @Author: eamiear
 * @Date: 2019-08-07 16:43:10
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-10-26 17:57:07
 */

import { getAction, postFormAction, postAction, deleteAction, putAction } from '@/utils/ajax'

// 酒店
const getHotelList = (params) => getAction('/sys/hotel/listHotel', { ...params })
const getHotelListAll = () => getAction('/sys/hotel/listAllHotel')
const editHotel = ({address, companyId, hotelName, id, saleManId, telephone, description}) => putAction('/sys/hotel/editHotel', {address, companyId, hotelName, id, saleManId, telephone, description})
const addHotel = ({address, companyId, hotelName, saleManId, telephone, description}) => postAction('/sys/hotel/addHotel', {address, companyId, hotelName, saleManId, telephone, description})
const delHotel = (ids) => deleteAction('/sys/hotel/deleteBatchHotel', {ids})
const getUserListByHotel = (params) => getAction('/common/getHotelUserList', params)
const bindHotelUser = (hotelId, userId) => postAction('/common/bindHotelUser', { hotelId, userId })
const unbindHotelUser = (hotelId, userId) => postAction('/common/unbindHotelUser', { hotelId, userId })
const getHotelSetting = (hotelId) => getAction('/sys/hotel/listHotelSetting', {hotelId})
const addHotelSetting = (params) => postAction('/sys/hotel/addOrUpdateHotelSetting', params)
const editHotelSetting = (params) => putAction('/sys/hotel/addOrUpdateHotelSetting', params)

// 企业
const getCompanyList = (params) => getAction('/sys/hotel/listCompany', params)
const getCompanyListAll = () => getAction('/sys/hotel/listAllCompany')
const editCompany = (params) => putAction('/sys/hotel/editCompany', params)
const addCompany = (params) => postAction('/sys/hotel/addCompany', params)
const delCompany = (ids) => deleteAction('/sys/hotel/deleteBatchCompany', {ids})

// 房间
const getRoomDeviceList = (params) => getAction('/common/room/devices', {
  CMD: 'get_room_device',
  device: JSON.stringify(params)
})

const getRoomList = ({hotelId, name, floorName, roomName, pageNo, pageSize}) => getAction('/sys/hotel/listRoom', {hotelId, name, floorName, roomName, pageNo, pageSize})
const addRoom = ({hotelId, name, pid}) => postFormAction('/sys/hotel/addOrUpdateRoom', {hotelId, name, pid})
const editRoom = ({hotelId, name, pid, id}) => getAction('/sys/hotel/addOrUpdateRoom', {hotelId, name, pid, id})
const delRoom = (id) => getAction('/sys/hotel/deleteRoom', {id})

const getRoomGatewayList = ({id}) => getAction('/sys/hotel/listGatewayList', {id})
const getRoomInfraredList = ({id}) => getAction('/sys/hotel/listInfraredList', {id})
const getRoomGatewayDeviceList = ({id, serialId, pageNo, pageSize}) => getAction('/sys/hotel/listHotelGatewayDeviceList', {id, serialId, pageNo, pageSize})
const getRoomInfraredDeviceList = ({id, serialId, pageNo, pageSize}) => getAction('/sys/hotel/listHotelInfraredDeviceList', {id, serialId, pageNo, pageSize})
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
const getBuildingList = ({hotelId, name, pageNo, pageSize}) => getAction('/sys/hotel/listBuilding', {hotelId, name, pageNo, pageSize})
const getBuildingListWithoutPage = (hotelId) => getAction('/sys/hotel/listAllBuilding', {hotelId})

const addBuilding = ({hotelId, name}) => postAction('/sys/hotel/addOrUpdateBuild', {hotelId, name})
const editBuilding = ({hotelId, name, id}) => postAction('/sys/hotel/addOrUpdateBuild', {hotelId, name, id})
const delBuilding = (ids) => deleteAction('/sys/hotel/deleteBatchBuild', {ids})

// floor
const getFloorList = ({hotelId, name, floorName, pageNo, pageSize}) => getAction('/sys/hotel/listFloor', {hotelId, name, floorName, pageNo, pageSize})
const getFloorByBuildingId = (buildingId) => getAction('/common', {
  CMD: 'get_building_floor',
  floor: JSON.stringify({
    buildingId
  })
})
const addFloor = ({hotelId, name, buildId}) => postAction('/sys/hotel/addOrUpdateFloor', {hotelId, name, buildId})
const editFloor = ({name, buildId, id}) => postAction('/sys/hotel/addOrUpdateFloor', {name, buildId, id})
const delFloor = (ids) => deleteAction('/sys/hotel/deleteBatchFloor', {ids})

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

  getRoomGatewayList,
  getRoomInfraredList,
  getRoomGatewayDeviceList,
  getRoomInfraredDeviceList,
  bindRoomGateway,
  unbindRoomGateway,
  bindRoomInfrared,
  unbindRoomInfrared,

  handleLampPower,
  handleSwitchPower,
  getPowerStatus,
  triggerAllPower,

  getBuildingList,
  getBuildingListWithoutPage,
  addBuilding,
  editBuilding,
  delBuilding,

  getFloorList,
  getFloorByBuildingId,
  addFloor,
  editFloor,
  delFloor
}
