/*
 * @Author: eamiear
 * @Date: 2019-08-05 17:32:41
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-11-23 09:58:40
 */

import { getAction, postFormAction, deleteAction, postAction, putAction } from '@/utils/ajax'

// hotel device
const getHotelDeviceList = ({hotelId, oboxSerialId, deviceName = undefined, pageNo, pageSize}) => getAction('/device/getDevice', {hotelId, oboxSerialId, deviceName, pageNo, pageSize})
const delHotelDevice = (deviceSerialId) => deleteAction('/device/delDevice', {deviceSerialId})
const editHotelDevice = (deviceSerialId, deviceName) => putAction(`/device/reDeviceName`, { deviceSerialId, deviceName })
// const stopHotelDevice = (deviceSerialId, isStop) => postAction('/device/stopDevice', {deviceSerialId, isStop})
const stopHotelDevice = (deviceSerialId, stop) => postAction(`/device/stopDevice`, { deviceSerialId, stop })

const scanHotelDevice = ({hotelId, oboxSerialId, electric = undefined}) => postAction('/device/obox/scanDevice', {hotelId, oboxSerialId, electric})
const pauseScanDevices = (hotelId, oboxSerialId) => postAction(`/device/stopScanDevice`, {hotelId, oboxSerialId})

// hotel infrared
const getHotelIrList = ({hotelId, serialId, state, deviceName, pageNo, pageSize}) => getAction('/device/getHotelIr', {hotelId, serialId, state, deviceName, pageNo, pageSize})
const editHotelIr = (serialId, deviceName) => putAction('/device/editIr', {serialId, deviceName})
const delHotelInfrared = (serialId) => deleteAction('/device/delIr', {serialId})
const controlHotelIrDevice = ({hotelId, serialId, indexOsm, key}) => postAction('/device/wifi/controlIr', {hotelId, serialId, indexOsm, key})
const stopHotelInfrared = (serialId, state) => putAction('/device/editIr', {serialId, state})

// hotel obox
const getHotelOboxList = ({hotelId, serialId, state, oboxName, pageNo, pageSize}) => getAction('/device/getHotelObox', {hotelId, serialId, state, oboxName, pageNo, pageSize})
const getAllHotelOboxList = (hotelId) => getAction('/device/getOboxList', {hotelId})
const editHotelObox = (oboxSerialId, oboxName) => putAction('/device/editObox', {oboxSerialId, oboxName})
const delHotelObox = (oboxSerialId) => postAction('/device/delObox', {oboxSerialId})

// 开关
const getSwitchStatus = (serialId) => postFormAction('/common', {
  CMD: 'query_node_real_status',
  serialId
})

const editSwitchStatus = (serialId, status) => postFormAction('/common', {
  CMD: 'setting_node_status',
  serialId,
  status
})

// 温湿度
const getDeviceStatusHistory = (serialId, fromDate, toDate, type = '02') => getAction('/common', {
  CMD: 'query_device_status_history',
  serialId,
  from_data: fromDate,
  to_data: toDate,
  type
})

export {
  // 设备
  getHotelDeviceList,
  delHotelDevice,
  scanHotelDevice,
  editHotelDevice,
  stopHotelDevice,
  pauseScanDevices,

  // 红外
  getHotelIrList,
  editHotelIr,
  delHotelInfrared,
  controlHotelIrDevice,
  stopHotelInfrared,

  getHotelOboxList,
  getAllHotelOboxList,
  editHotelObox,
  delHotelObox,

  getDeviceStatusHistory,
  getSwitchStatus,
  editSwitchStatus
}
