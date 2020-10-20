import { getAction } from '@/utils/ajax'

const getEnterpriseReportList = (params) => getAction('/common/reports/enterprise', params)

const getHotelReportList = (params) => getAction('/common/reports/hotel', params)

const getMineReportList = (params) => getAction('/common/reports/mine', params)

export {
  getEnterpriseReportList,
  getHotelReportList,
  getMineReportList
}
