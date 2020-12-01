import { getAction, putAction } from '@/utils/ajax'

// 集团
const getEnterpriseReportList = ({startTime, endTime, price = 'asc', pageNo, pageSize}) => getAction('/table/getAgentDetails', {startTime, endTime, price, pageNo, pageSize})
const getEnterpriseReportStatistic = (startTime, endTime) => getAction('/table/getAgentTotal', {startTime, endTime})

// 酒店
const getHotelReportList = ({hotelId, startTime, endTime, price = 'asc', pageNo, pageSize}) => getAction('/table/getHotelDetails', {hotelId, startTime, endTime, price, pageNo, pageSize})
const getHotelReportStatistic = (hotelId, startTime, endTime) => getAction('/table/getHotelTotal', {hotelId, startTime, endTime})

// 我的
// const getMineReportList = ({hotelId, type = 3, pageNo, pageSize}) => getAction('/table/reports/mine', {hotelId, type, pageNo, pageSize})
const getMineReportList = ({startTime, endTime, price = 'asc', pageNo, pageSize}) => getAction('/table/getAgentDetails', {startTime, endTime, price, pageNo, pageSize})
const getMineReportStatistic = (startTime, endTime) => getAction('/table/getAgentTotal', {startTime, endTime})

// 设备
const getEquipsReportList = ({hotelId, startTime, endTime, pageNo, pageSize}) => getAction('/table/getDeviceDetails', {hotelId, startTime, endTime, pageNo, pageSize})
const getEquipsReportStatistic = (hotelId, startTime, endTime) => getAction('/table/getDeviceTotal', {hotelId, startTime, endTime})

// 异常
const getExceptionReportList = ({hotelId, type, title, msgContent, pageNo, pageSize}) => getAction('/table/getExceptionList', {hotelId, type, title, msgContent, pageNo, pageSize})

const handleException = (id, oper) => putAction('/table/editException', {id, oper})

export {
  getEnterpriseReportList,
  getEnterpriseReportStatistic,
  getHotelReportList,
  getHotelReportStatistic,
  getMineReportList,
  getMineReportStatistic,
  getEquipsReportList,
  getEquipsReportStatistic,
  getExceptionReportList,
  handleException
}
