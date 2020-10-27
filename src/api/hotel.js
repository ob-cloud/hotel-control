/*
 * @Author: eamiear
 * @Date: 2019-08-07 16:43:10
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-10-27 17:07:01
 */

import { getAction, postFormAction, postAction, deleteAction, putAction } from '@/utils/ajax'

// 酒店
const getHotelList = (params) => getAction('/sys/hotel/listHotel', { ...params })
const getHotelListAll = () => getAction('/sys/hotel/listAllHotel')
const editHotel = ({address, companyId, hotelName, contact, contactPhone, id, saleManId, telephone, description}) => putAction('/sys/hotel/editHotel', {address, companyId, hotelName, id, saleManId, contact, contactPhone, telephone, description})
const addHotel = ({address, companyId, hotelName, saleManId, telephone, description}) => postAction('/sys/hotel/addHotel', {address, companyId, hotelName, saleManId, telephone, description})
const delHotel = (ids) => deleteAction('/sys/hotel/deleteBatchHotel', {ids})
const getUserListByHotel = () => getAction('/sys/user/listByType', {type: 1})
const getUserPageByHotel = ({pageNo, pageSize, type = 1}) => getAction('/sys/user/pageByType', {pageNo, pageSize, type})
const bindHotelUser = (hotelId, userIds) => postAction('/sys/hotel/bindHotel', { hotelId, userIds })
const unbindHotelUser = (hotelId) => postAction('/sys/hotel/bindHotel', { hotelId })
const getHotelSetting = (hotelId) => getAction('/sys/hotel/listHotelSetting', {hotelId})
const addHotelSetting = ({checkTime, exitTime, hotelId, startTime, endTime, overTime, price}) => postAction('/sys/hotel/addOrUpdateHotelSetting', {checkTime, exitTime, hotelId, startTime, endTime, overTime, price})
const editHotelSetting = ({id, checkTime, exitTime, hotelId, startTime, endTime, overTime, price}) => putAction('/sys/hotel/addOrUpdateHotelSetting', {id, checkTime, exitTime, hotelId, startTime, endTime, overTime, price})

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
const addRoom = ({name, floorId}) => postAction('/sys/hotel/addOrUpdateRoom', {name, floorId})
const editRoom = ({name, floorId, id}) => postAction('/sys/hotel/addOrUpdateRoom', {name, floorId, id})
const delRoom = (id) => deleteAction('/sys/hotel/deleteRoom', {id})

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
const getFloorList = ({hotelId, buildName, floorName, pageNo, pageSize}) => getAction('/sys/hotel/listFloor', {hotelId, buildName, floorName, pageNo, pageSize})
const getFloorByBuildingId = (buildId) => getAction('/sys/hotel/listAllFloor', {buildId})
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
  getUserPageByHotel,
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
