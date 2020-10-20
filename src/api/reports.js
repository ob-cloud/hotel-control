import { getAction } from '@/utils/ajax'

const getEnterpriseReportList = (params) => getAction('/common/enterprise/list', params)

const getHotelReportList = (params) => getAction('/common/hotel/list', params)

const getMineReportList = (params) => getAction('/common/mine/list', params)

export {
  getEnterpriseReportList,
  getHotelReportList,
  getMineReportList
}
