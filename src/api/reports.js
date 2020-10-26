import { getAction, postAction } from '@/utils/ajax'

// 集团
const getEnterpriseReportList = ({type = 3, price = 'asc', pageNo, pageSize}) => getAction('/table/getAgentDetails', {type, price, pageNo, pageSize})
const getEnterpriseReportStatistic = () => getAction('/table/getAgentTotal')

// 酒店
const getHotelReportList = ({hotelId, type = 3, price = 'asc', pageNo, pageSize}) => getAction('/table/getHotelDetails', {hotelId, type, price, pageNo, pageSize})
const getHotelReportStatistic = (hotelId) => getAction('/table/getHotelTotal', {hotelId})

// 我的
const getMineReportList = ({hotelId, type = 3, pageNo, pageSize}) => getAction('/table/reports/mine', {hotelId, type, pageNo, pageSize})

// 设备
const getEquipsReportList = ({hotelId, type = 3, pageNo, pageSize}) => getAction('/table/getDeviceDetails', {hotelId, type, pageNo, pageSize})
const getEquipsReportStatistic = (hotelId) => getAction('/table/getDeviceTotal', {hotelId})

// 异常
const getExceptionReportList = ({hotelId, type, title, msgContent, pageNo, pageSize}) => getAction('/table/getExceptionList', {hotelId, type, title, msgContent, pageNo, pageSize})

const handleException = (id, isOper) => postAction('/table/editException', {id, isOper})

export {
  getEnterpriseReportList,
  getEnterpriseReportStatistic,
  getHotelReportList,
  getHotelReportStatistic,
  getMineReportList,
  getEquipsReportList,
  getEquipsReportStatistic,
  getExceptionReportList,
  handleException
}
