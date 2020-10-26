import Mock from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'


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
      time: Mock.mock('@date'),
      hotels: Mock.mock('@integer(10, 1000)'),
      totalBuilding: Mock.mock('@integer(10, 1000)'),
      totalUseRoom: Mock.mock('@integer(10, 1000)'),
      utilizationRate: Mock.mock('@integer(10, 1000)'),
      price: Mock.mock('@integer(10, 1000)'),
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

const getEnterpriseReportStatistic = () => {
  console.log('mock getEnterpriseReportStatistic: ', builder({
    "arrears": Mock.mock('@integer(100, 5000)'),
    "averPrice": Mock.mock('@integer(100, 5000)'),
    "hotelId": "",
    "totalPrice": Mock.mock('@integer(100, 5000)'),
    "totalRoom": 0,
    "usrRoom": 0,
    "utilizationRate": Mock.mock('@integer(100, 5000)'),
  }))

  return builder({
    "arrears": Mock.mock('@integer(100, 5000)'),
    "averPrice": Mock.mock('@integer(100, 5000)'),
    "hotelId": "",
    "totalPrice": Mock.mock('@integer(100, 5000)'),
    "totalRoom": 0,
    "usrRoom": 0,
    "utilizationRate": Mock.mock('@integer(100, 5000)'),
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
      time: Mock.mock('@date'),
      totalBuilding: Mock.mock('@integer(10, 1000)'),
      totalUseRoom: Mock.mock('@integer(10, 1000)'),
      utilizationRate: Mock.mock('@integer(10, 1000)'),
      price: Mock.mock('@integer(10, 1000)'),
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

const getHotelReportStatistic = () => {
  console.log('mock getHotelReportStatistic: ', builder({
    "arrears": Mock.mock('@integer(100, 5000)'),
    "averPrice": Mock.mock('@integer(100, 5000)'),
    "hotelId": "",
    "totalPrice": Mock.mock('@integer(100, 5000)'),
    "totalRoom": 0,
    "usrRoom": 0,
    "utilizationRate": Mock.mock('@integer(100, 5000)'),
  }))

  return builder({
    "arrears": Mock.mock('@integer(100, 5000)'),
    "averPrice": Mock.mock('@integer(100, 5000)'),
    "hotelId": "",
    "totalPrice": Mock.mock('@integer(100, 5000)'),
    "totalRoom": 0,
    "usrRoom": 0,
    "utilizationRate": Mock.mock('@integer(100, 5000)'),
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
      time: Mock.mock('@date'),
      hotels: Mock.mock('@integer(10, 1000)'),
      totalBuilding: Mock.mock('@integer(10, 1000)'),
      totalUseRoom: Mock.mock('@integer(10, 1000)'),
      utilizationRate: Mock.mock('@integer(10, 1000)'),
      price: Mock.mock('@integer(10, 1000)'),
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
      time: Mock.mock('@date'),
      hotelName: Mock.mock('@cword(3, 5)') + '酒店',
      deviceTotal: Mock.mock('@integer(10, 1000)'),
      oboxline: Mock.mock('@integer(0, 100)'),
      irLiner: Mock.mock('@integer(0, 100)'),
      oboxRate: Mock.mock('@integer(0, 100)'),
      irRate: Mock.mock('@integer(0, 100)'),
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
    tableDeviceResponse: result
  })
}


const getEquipsReportStatistic = () => {
  console.log('mock getEquipsReportStatistic: ', builder({
    "deviceTotal": Mock.mock('@integer(100, 5000)'),
		"hotelId": "",
		"irLine": Mock.mock('@integer(100, 5000)'),
		"irRate": Mock.mock('@integer(100, 5000)'),
		"irTotal": Mock.mock('@integer(100, 5000)'),
		"oboxLine": Mock.mock('@integer(100, 5000)'),
		"oboxRate": Mock.mock('@integer(100, 5000)'),
		"oboxTotal": Mock.mock('@integer(100, 5000)'),
  }))

  return builder({
    "deviceTotal": Mock.mock('@integer(100, 5000)'),
		"hotelId": "",
		"irLine": Mock.mock('@integer(100, 5000)'),
		"irRate": Mock.mock('@integer(100, 5000)'),
		"irTotal": Mock.mock('@integer(100, 5000)'),
		"oboxLine": Mock.mock('@integer(100, 5000)'),
		"oboxRate": Mock.mock('@integer(100, 5000)'),
		"oboxTotal": Mock.mock('@integer(100, 5000)'),
  })
}

const getExceptionReportList = (options) => {
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
      title: Mock.mock('@cword(3, 5)'),
      msgContent: Mock.mock('@cword(3, 5)'),
      type: Mock.mock('@integer(0, 2)'),
      isOper: Mock.mock('@integer(0, 1)'),
      operUser: Mock.mock('@cname()'),
      createTime: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock getExceptionReportList: ', builder({
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

const handleException = (options) => {
  const body = getBody(options)
  if (!body.id) {
    return builder({ code: false }, 'Id错误', 401)
  }
  return builder({}, '成功')
}

Mock.mock(/\/table\/getAgentDetails/, 'get', getEnterpriseReportList)
Mock.mock(/\/table\/getAgentTotal/, 'get', getEnterpriseReportStatistic)
Mock.mock(/\/table\/getHotelDetails/, 'get', getHotelReportList)
Mock.mock(/\/table\/getHotelTotal/, 'get', getHotelReportStatistic)
Mock.mock(/\/table\/reports\/mine/, 'get', getMineReportList)
Mock.mock(/\/table\/getDeviceDetails/, 'get', getEquipsReportList)
Mock.mock(/\/table\/getDeviceTotal/, 'get', getEquipsReportStatistic)
Mock.mock(/\/table\/getExceptionList/, 'get', getExceptionReportList)
Mock.mock(/\/table\/editException/, 'post', handleException)
