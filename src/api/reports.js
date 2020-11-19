import { getAction, putAction } from '@/utils/ajax'

// 集团
const getEnterpriseReportList = ({type = 3, price = 'asc', pageNo, pageSize}) => getAction('/table/getAgentDetails', {type, price, pageNo, pageSize})
const getEnterpriseReportStatistic = (type = 3) => getAction('/table/getAgentTotal', {type})

// 酒店
const getHotelReportList = ({hotelId, type = 3, price = 'asc', pageNo, pageSize}) => getAction('/table/getHotelDetails', {hotelId, type, price, pageNo, pageSize})
const getHotelReportStatistic = (hotelId, type = 3) => getAction('/table/getHotelTotal', {hotelId, type})

// 我的
// const getMineReportList = ({hotelId, type = 3, pageNo, pageSize}) => getAction('/table/reports/mine', {hotelId, type, pageNo, pageSize})
const getMineReportList = ({type = 3, price = 'asc', pageNo, pageSize}) => getAction('/table/getAgentDetails', {type, price, pageNo, pageSize})
const getMineReportStatistic = (type = 3) => getAction('/table/getAgentTotal', {type})

// 设备
const getEquipsReportList = ({hotelId, type = 3, pageNo, pageSize}) => getAction('/table/getDeviceDetails', {hotelId, type, pageNo, pageSize})
const getEquipsReportStatistic = (hotelId, type = 3) => getAction('/table/getDeviceTotal', {hotelId, type})

// 异常
const getExceptionReportList = ({hotelId, type, title, msgContent, pageNo, pageSize}) => getAction('/table/getExceptionList', {hotelId, type, title, msgContent, pageNo, pageSize})

const handleException = ({id, isOper}) => putAction('/table/editException', {id, isOper})

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
