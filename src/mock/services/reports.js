import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'


const totalCount = 60

const getEnterpriseReportList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      id: Mock.mock('@id()'),
      businessDay: Mock.mock('@date'),
      hotelAccount: Mock.mock('@integer(10, 1000)'),
      roomAccount: Mock.mock('@integer(10, 1000)'),
      usageAccount: Mock.mock('@integer(10, 1000)'),
      usageRate: Mock.mock('@integer(10, 1000)'),
      rent: Mock.mock('@integer(10, 1000)'),
      createAt: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock getEnterpriseReportList: ', builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  }))

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  })
}


const getHotelReportList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      id: Mock.mock('@id()'),
      businessDay: Mock.mock('@date'),
      roomAccount: Mock.mock('@integer(10, 1000)'),
      usageAccount: Mock.mock('@integer(10, 1000)'),
      usageRate: Mock.mock('@integer(10, 1000)'),
      rent: Mock.mock('@integer(10, 1000)'),
      createAt: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock getHotelReportList: ', builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  }))

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  })
}


const getMineReportList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      id: Mock.mock('@id()'),
      businessDay: Mock.mock('@date'),
      hotelAccount: Mock.mock('@integer(10, 1000)'),
      roomAccount: Mock.mock('@integer(10, 1000)'),
      usageAccount: Mock.mock('@integer(10, 1000)'),
      usageRate: Mock.mock('@integer(10, 1000)'),
      rent: Mock.mock('@integer(10, 1000)'),
      createAt: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock getMineReportList: ', builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  }))

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  })
}


const getEquipsReportList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      id: Mock.mock('@id()'),
      businessDay: Mock.mock('@date'),
      hotelName: Mock.mock('@cword(3, 5)') + '酒店',
      roomCount: Mock.mock('@integer(10, 1000)'),
      deviceCount: Mock.mock('@integer(10, 1000)'),
      gatewayOfflineCount: Mock.mock('@integer(0, 100)'),
      infraredOfflineCount: Mock.mock('@integer(0, 100)'),
      gatewayOfflineRate: Mock.mock('@integer(0, 100)'),
      infraredOfflineRate: Mock.mock('@integer(0, 100)'),
      createAt: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock getEquipsReportList: ', builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  }))

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  })
}

Mock.mock(/\/common\/reports\/enterprise/, 'get', getEnterpriseReportList)
Mock.mock(/\/common\/reports\/hotel/, 'get', getHotelReportList)
Mock.mock(/\/common\/reports\/mine/, 'get', getMineReportList)
Mock.mock(/\/common\/reports\/equips/, 'get', getEquipsReportList)
