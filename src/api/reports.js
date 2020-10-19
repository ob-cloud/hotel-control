import { getAction } from '@/utils/ajax'

const getEnterpriseReportList = (params) => getAction('/common/enterprise/list', params)

export {
  getEnterpriseReportList,
}
