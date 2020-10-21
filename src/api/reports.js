import { getAction } from '@/utils/ajax'

const getEnterpriseReportList = (params) => getAction('/common/reports/enterprise', params)
const getHotelReportList = (params) => getAction('/common/reports/hotel', params)
const getMineReportList = (params) => getAction('/common/reports/mine', params)
const getEquipsReportList = (params) => getAction('/common/reports/equips', params)
const getExceptionReportList = (params) => getAction('/common/reports/exception', params)

export {
  getEnterpriseReportList,
  getHotelReportList,
  getMineReportList,
  getEquipsReportList,
  getExceptionReportList
}
