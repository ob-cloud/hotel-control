import Mock from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'


const totalCount = 5701

const getHotelList = (options) => {
  console.log('mock: ', options)
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      name: Mock.mock('@cword(5, 10)'),
      company: Mock.mock('@cword(5, 10)'),
      contacts: Mock.mock('@cname()'),
      contact: Mock.mock('@integer(10000000000, 19000000000)'),
      frontPhone: Mock.mock('@integer(10000000000, 19000000000)'),
      isChain: Mock.mock('@integer(0,1)'),
      salesmanId: Mock.mock('@id()'),
      salesman: Mock.mock('@cname()'),
      createAt: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock: ', builder({
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

const getUserListByHotel = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      id: tmpKey,
      username: Mock.mock('@cname()'),
    })
  }
  console.log('mock: ', builder({
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

const bindHotelUser = (options) => {
  const body = getBody(options)
  if (!body.hotelId || !body.userId) {
    return builder({ code: false }, 'hotelId或userId错误', 401)
  }
  return builder({}, '成功')
}

const unbindHotelUser = (options) => {
  const body = getBody(options)
  if (!body.userId) {
    return builder({ code: false }, 'userId错误', 401)
  }
  return builder({}, '成功')
}

Mock.mock(/\/common\/getHotelList/, 'get', getHotelList)

Mock.mock(/\/common\/getHotelUserList/, 'get', getUserListByHotel)

Mock.mock(/\/common\/bindHotelUser/, 'post', bindHotelUser)
Mock.mock(/\/common\/unbindHotelUser/, 'post', unbindHotelUser)
