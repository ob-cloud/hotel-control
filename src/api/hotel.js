/*
 * @Author: eamiear
 * @Date: 2019-08-07 16:43:10
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-11-23 15:22:18
 */

import { getAction, postAction, deleteAction, putAction } from '@/utils/ajax'

// 酒店
const getHotelList = (params) => getAction('/sys/hotel/listHotel', { ...params })
const getHotelListAll = () => getAction('/sys/hotel/listAllHotel')
const editHotel = ({address, companyId, hotelName, contact, contactPhone, id, saleManId, telephone, description}) => putAction('/sys/hotel/editHotel', {address, companyId, hotelName, id, saleManId, contact, contactPhone, telephone, description})
const addHotel = ({address, companyId, hotelName, saleManId, telephone, description}) => postAction('/sys/hotel/addHotel', {address, companyId, hotelName, saleManId, telephone, description})
const delHotel = (ids) => deleteAction('/sys/hotel/deleteBatchHotel', {ids})
const getUserListByHotel = ({hotelId, type = 1, pageNo, pageSize}) => getAction('/sys/user/pageBindHotel', {hotelId, type, pageNo, pageSize})
const getUserPageByHotel = ({pageNo, pageSize, type = 1}) => getAction('/sys/user/pageByType', {pageNo, pageSize, type})
const bindHotelUser = (hotelId, userIds) => postAction('/sys/hotel/bindHotel', { hotelId, userIds })
const unbindHotelUser = (hotelId, userIds) => postAction('/sys/hotel/unbindHotel', { hotelId, userIds })
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
const getRoomList = ({hotelId, name, floorName, roomName, pageNo, pageSize}) => getAction('/sys/hotel/listRoom', {hotelId, name, floorName, roomName, pageNo, pageSize})
const addRoom = ({name, floorId}) => postAction('/sys/hotel/addOrUpdateRoom', {name, floorId})
const editRoom = ({name, floorId, id}) => postAction('/sys/hotel/addOrUpdateRoom', {name, floorId, id})
const delRoom = (ids) => deleteAction('/sys/hotel/deleteBatchRoom', {ids})

const getRoomGatewayList = ({roomId, pageNo, pageSize}) => getAction('/room/getRoomObox', {roomId, pageNo, pageSize})
const getRoomInfraredList = ({roomId, pageNo, pageSize}) => getAction('/room/getRoomIr', {roomId, pageNo, pageSize})
const getRoomGatewayDeviceList = ({roomId, pageNo, pageSize}) => getAction('/room/getRoomOboxDevice', {roomId, pageNo, pageSize})
const getRoomInfraredDeviceList = ({roomId, pageNo, pageSize}) => getAction('/room/getRoomIrDevice', {roomId, pageNo, pageSize})
const bindRoomGateway = ({id, deviceSerialId, roomId}) => postAction('/room/bandObox', {id, deviceSerialId, roomId})
const unbindRoomGateway = ({id, deviceSerialId, roomId}) => postAction('/room/unBandObox', {id, deviceSerialId, roomId})
const bindRoomInfrared = ({id, deviceSerialId, roomId}) => postAction('/room/bandIr', {id, deviceSerialId, roomId})
const unbindRoomInfrared = ({id, deviceSerialId, roomId}) => postAction('/room/unBandIr', {id, deviceSerialId, roomId})
const getRoomUnbindGatewayList = ({hotelId, pageNo, pageSize}) => getAction('/room/getUnBandObox', {hotelId, pageNo, pageSize})
const getRoomUnbindInfraredList = ({hotelId, pageNo, pageSize}) => getAction('/room/getUnBandIr', {hotelId, pageNo, pageSize})

// 楼栋
const getBuildingList = ({hotelId, name, pageNo, pageSize}) => getAction('/sys/hotel/listBuilding', {hotelId, name, pageNo, pageSize})
const getBuildingListWithoutPage = (hotelId) => getAction('/sys/hotel/listAllBuilding', {hotelId})

const addBuilding = ({hotelId, name}) => postAction('/sys/hotel/addOrUpdateBuild', {hotelId, name})
const editBuilding = ({hotelId, name, id}) => postAction('/sys/hotel/addOrUpdateBuild', {hotelId, name, id})
const delBuilding = (ids) => deleteAction('/sys/hotel/deleteBatchBuild', {ids})

// 楼层
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
  getRoomUnbindGatewayList,
  getRoomUnbindInfraredList,

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
