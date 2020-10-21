import Mock from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'


const totalCount = 60

const getHotelList = (options) => {
  // console.log('mock getHotelList: ', options)
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      id: Mock.mock('@id()'),
      name: Mock.mock('@cword(3, 5)') + '酒店',
      company: Mock.mock('@cword(3, 5)') + '有限公司',
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

  console.log('mock getHotelList: ', builder({
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


const getHotelListAll = () => {
  const result = []
  for (let i = 1; i < Mock.mock('@integer(2, 6)'); i++) {
    result.push({
      id: Mock.mock('@id()'),
      name: Mock.mock('@cword(3, 5)') + '酒店',
      company: Mock.mock('@cword(3, 5)') + '有限公司',
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

  console.log('mock getHotelListAll: ', builder({
    records: result
  }))

  return builder({
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
  console.log('mock getUserListByHotel: ', builder({
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

const editHotel = () => {
  return builder({}, '成功')
}

const delHotel = (options) => {
  const body = getBody(options)
  if (!body.id) {
    return builder({ code: false }, 'Id错误', 401)
  }
  return builder({}, '成功')
}


// 房间
const getRoomList = () => {
  const result = []
  for (let i = 1; i < Mock.mock('@integer(5, 20)'); i++) {
    result.push({
      id: Mock.mock('@id()'),
      buildingId: Mock.mock('@id()'),
      buildingName: Mock.mock('@integer(1, 20)'),
      deviceState: "",
      floorId: Mock.mock('@id()'),
      floorName: Mock.mock('@integer(1, 20)'),
      roomName: Mock.mock('@integer(3, 14)'),
      lightState: Mock.mock('@integer(0, 1)'),
      switchState: Mock.mock('@integer(0, 1)'),
      temperature: Mock.mock('@integer(20, 36)'),
    })
  }
  console.log('mock getRoomList: ', builder({
    total: totalCount,
    records: result
  }))

  return builder({
    total: totalCount,
    records: result
  })
}


// 栋
const getBuildingList = () => {
  const result = []
  for (let i = 1; i < Mock.mock('@integer(5, 20)'); i++) {
    result.push({
      id: Mock.mock('@id()'),
      buildingId: Mock.mock('@id()'),
      buildingName: Mock.mock('@integer(1, 20)'),
      deviceState: "",
      lightState: Mock.mock('@integer(0, 1)'),
      switchState: Mock.mock('@integer(0, 1)'),
      allType: 0
    })
  }
  console.log('mock getBuildingList: ', builder({
    total: totalCount,
    records: result
  }))

  return builder({
    total: totalCount,
    records: result
  })
}


// 层
const getFloorList = () => {
  const result = []
  for (let i = 1; i < Mock.mock('@integer(5, 20)'); i++) {
    result.push({
      id: Mock.mock('@id()'),
      buildingId: Mock.mock('@id()'),
      buildingName: Mock.mock('@integer(1, 20)'),
      deviceState: "",
      floorId: Mock.mock('@id()'),
      floorName: Mock.mock('@integer(1, 20)'),
      lightState: Mock.mock('@integer(0, 1)'),
      switchState: Mock.mock('@integer(0, 1)'),
      allType: 0
    })
  }
  console.log('mock getFloorList: ', builder({
    total: totalCount,
    records: result
  }))

  return builder({
    total: totalCount,
    records: result
  })
}

// 企业
const getCompanyList = (options) => {
  // console.log('mock getHotelList: ', options)
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      id: Mock.mock('@id()'),
      name: Mock.mock('@cword(3, 5)') + '有限公司',
      address: Mock.mock('@county(true)'),
      createAt: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock getCompanyList: ', builder({
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


const getCompanyListAll = () => {
  const result = []
  for (let i = 1; i < Mock.mock('@integer(2, 6)'); i++) {
    result.push({
      id: Mock.mock('@id()'),
      name: Mock.mock('@cword(3, 5)') + '有限公司',
      address: Mock.mock('@county(true)'),
      createAt: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock getCompanyListAll: ', builder({
    records: result
  }))

  return builder({
    records: result
  })
}


const deviceList = [{
  "userName": "",
  "device_child_type": "17",
  "device_type": "04",
  "addr": "01",
  "name": "修改设备名称检查名称长度",
  "oboxId": 3,
  "id": 1,
  "lastOpTime": 2020,
  "obox_serial_id": "b3057fa180",
  "online": 1,
  "serialId": "0a3ebba201",
  "state": "0000000000000000",
  "version": "0000000000000000",
  "userId": 0
}, {
  "userName": "",
  "device_child_type": "01",
  "device_type": "01",
  "addr": "02",
  "name": "这是个灯检查灯的长度",
  "oboxId": 3,
  "id": 2,
  "lastOpTime": 2020,
  "obox_serial_id": "b3057fa180",
  "online": 1,
  "serialId": "bef31aa601",
  "state": "0000000000000000",
  "version": "0000000000000000",
  "userId": 0
}, {
  "userName": "",
  "device_child_type": "01",
  "device_type": "01",
  "addr": "03",
  "name": "Lamp3",
  "oboxId": 3,
  "id": 3,
  "lastOpTime": 2020,
  "obox_serial_id": "b3057fa180",
  "online": 1,
  "serialId": "c36c010000",
  "state": "0000000000000000",
  "version": "0000000000000000",
  "userId": 0
}, {
  "userName": "",
  "device_child_type": "7a",
  "device_type": "04",
  "addr": "04",
  "name": "Socket4",
  "oboxId": 3,
  "id": 4,
  "lastOpTime": 2020,
  "obox_serial_id": "b3057fa180",
  "online": 1,
  "serialId": "c46a010000",
  "state": "0400002100000000",
  "version": "0000000000000000",
  "userId": 0
}, {
  "userName": "",
  "device_child_type": "02",
  "device_type": "01",
  "addr": "05",
  "name": "Lamp1",
  "oboxId": 3,
  "id": 5,
  "lastOpTime": 2020,
  "obox_serial_id": "b3057fa180",
  "online": 1,
  "serialId": "3168010000",
  "state": "00fe000000020000",
  "version": "0000000000000000",
  "userId": 0
}, {
  "userName": "",
  "device_child_type": "17",
  "device_type": "04",
  "addr": "38",
  "name": "Socket1",
  "oboxId": 6,
  "id": 6,
  "lastOpTime": 2020,
  "obox_serial_id": "2695000000",
  "online": 1,
  "serialId": "023ebba201",
  "state": "0000000000000000",
  "version": "0000000000000000",
  "userId": 0
}, {
  "userName": "",
  "device_child_type": "17",
  "device_type": "04",
  "addr": "01",
  "name": "Socket1",
  "oboxId": 14,
  "id": 9,
  "lastOpTime": 2020,
  "obox_serial_id": "15ed1ea281",
  "online": 1,
  "serialId": "083ebba201",
  "state": "0000000000000000",
  "version": "ffffffffffffffff",
  "userId": 0
}, {
  "userName": "",
  "device_child_type": "0f",
  "device_type": "0b",
  "addr": "01",
  "name": "插卡取电",
  "oboxId": 14,
  "id": 19,
  "lastOpTime": 2020,
  "obox_serial_id": "15ed1ea281",
  "online": 1,
  "serialId": "083ebca201",
  "state": "0000000000000000",
  "version": "ffffffffffffffff",
  "userId": 0
}]
// 设备
const getRoomDeviceList = () => {
  console.log('mock getRoomDeviceList: ', builder({
    total: totalCount,
    records: deviceList
  }))

  return builder({
    total: totalCount,
    records: deviceList
  })
}

Mock.mock(/\/common\/hotel\/list/, 'get', getHotelList)
Mock.mock(/\/common\/hotel\/all/, 'get', getHotelListAll)

Mock.mock(/\/common\/getHotelUserList/, 'get', getUserListByHotel)

Mock.mock(/\/common\/editHotel/, 'post', editHotel)
Mock.mock(/\/common\/addHotel/, 'post', editHotel)
Mock.mock(/\/common\/delHotel/, 'post', delHotel)

Mock.mock(/\/common\/bindHotelUser/, 'post', bindHotelUser)
Mock.mock(/\/common\/unbindHotelUser/, 'post', unbindHotelUser)

// 企业
Mock.mock(/\/common\/company\/list/, 'get', getCompanyList)
Mock.mock(/\/common\/company\/all/, 'get', getCompanyListAll)


Mock.mock(/\/common\/room\/list/, 'get', getRoomList)
Mock.mock(/\/common\/building\/list/, 'get', getBuildingList)
Mock.mock(/\/common\/floor\/list/, 'get', getFloorList)

Mock.mock(/\/common\/room\/devices/, 'get', getRoomDeviceList)
