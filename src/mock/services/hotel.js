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
      hotelName: Mock.mock('@cword(3, 5)') + '酒店',
      companyName: Mock.mock('@cword(3, 5)') + '有限公司',
      companyId: Mock.mock('@id()'),
      contact: Mock.mock('@cname()'),
      contactPhone: Mock.mock('@integer(10000000000, 19000000000)'),
      telephone: Mock.mock('@integer(10000000000, 19000000000)'),
      salesManId: Mock.mock('@id()'),
      salesManName: Mock.mock('@cname()'),
      address: Mock.mock('@country(true)'),
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
      root: Mock.mock('@id()'),
      buildingId: Mock.mock('@id()'),
      buildingName: Mock.mock('@integer(1, 20)'),
      towerName: Mock.mock('@integer(1, 20)'),
      deviceState: "",
      floorId: Mock.mock('@id()'),
      pid: Mock.mock('@id()'),
      floorName: Mock.mock('@integer(1, 20)'),
      roomName: Mock.mock('@integer(3, 14)'),
      name: Mock.mock('@integer(3, 14)'),
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
const getHotelRoomGatewayList = () => {
  const result = []
  result.push({
    "userName": "",
    "obox_name": "OBOXeca9",
    "obox_serial_id": "b3057fa180",
    "obox_version": "0300020004020302",
    "id": 3,
    "obox_status": 1,
    "userId": 0,
    "oboxId": 3,
    "isBind": 1
  })
  console.log('mock getHotelRoomGatewayList: ', builder({
    records: result
  }))

  return builder({
    records: result
  })
}
const getHotelRoomInfraredList = () => {
  const result = []
  result.push({
    "userName": "",
    "name": "IR Transponder",
    "deviceId": "11e25c3a7d",
    "online": 0,
    "state": "[]",
    "type": "51",
    "version": Mock.mock('@integer(100000000, 12900000000)'),
    "action": "[{\"functionId\":1,\"data\":[\"\"],\"functionName\":\"send\",\"function\":\"send\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"download\"]},{\"functionId\":2,\"data\":[\"\"],\"functionName\":\"receive learning\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":3,\"data\":[\"\"],\"functionName\":\"receive pairing\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":4,\"data\":[0],\"functionName\":\"learning\",\"function\":\"learning\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]},{\"functionId\":5,\"data\":[0],\"functionName\":\"pairing\",\"function\":\"pairing\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]}]",
    "userId": 0
  })
  console.log('mock getHotelRoomInfraredDeviceList: ', builder({
    records: result
  }))

  return builder({
    records: result
  })
}
const getHotelRoomGatewayDeviceList = () => {
  const result = deviceList
  console.log('mock getHotelRoomGatewayDeviceList: ', builder({
    records: result
  }))

  return builder({
    records: result
  })
}
const getHotelRoomInfraredDeviceList = () => {
  const result = []
  result.push({
    "userName": "",
    "name": "IR Transponder",
    "deviceId": "11e25c3a7d",
    "online": 0,
    "state": "[]",
    "type": "51",
    "version": Mock.mock('@integer(100000000, 12900000000)'),
    "action": "[{\"functionId\":1,\"data\":[\"\"],\"functionName\":\"send\",\"function\":\"send\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"download\"]},{\"functionId\":2,\"data\":[\"\"],\"functionName\":\"receive learning\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":3,\"data\":[\"\"],\"functionName\":\"receive pairing\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":4,\"data\":[0],\"functionName\":\"learning\",\"function\":\"learning\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]},{\"functionId\":5,\"data\":[0],\"functionName\":\"pairing\",\"function\":\"pairing\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]}]",
    "userId": 0
  })
  console.log('mock getHotelRoomInfraredDeviceList: ', builder({
    records: result
  }))

  return builder({
    records: result
  })
}

const bindRoomGateway = (options) => {
  const body = getBody(options)
  if (!body.id) {
    return builder({ code: false }, 'Id错误', 401)
  }
  return builder({}, '成功')
}
const unbindRoomGateway = (options) => {
  const body = getBody(options)
  if (!body.serialId) {
    return builder({ code: false }, 'Id错误', 401)
  }
  return builder({}, '成功')
}
const bindRoomInfrared = (options) => {
  const body = getBody(options)
  if (!body.id) {
    return builder({ code: false }, 'Id错误', 401)
  }
  return builder({}, '成功')
}
const unbindRoomInfrared = (options) => {
  const body = getBody(options)
  if (!body.serialId) {
    return builder({ code: false }, 'Id错误', 401)
  }
  return builder({}, '成功')
}

// 栋
const getBuildingList = () => {
  const result = []
  for (let i = 1; i < Mock.mock('@integer(5, 20)'); i++) {
    result.push({
      id: Mock.mock('@id()'),
      buildingId: Mock.mock('@id()'),
      buildingName: Mock.mock('@integer(1, 20)'),
      name: Mock.mock('@integer(1, 20)'),
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
      towerName: Mock.mock('@integer(1, 20)'),
      pid: Mock.mock('@id()'),
      deviceState: "",
      floorId: Mock.mock('@id()'),
      floorName: Mock.mock('@integer(1, 20)'),
      name: Mock.mock('@integer(1, 20)'),
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
      companyName: Mock.mock('@cword(3, 5)') + '有限公司',
      description: Mock.mock('@county(true)'),
      createBy: Mock.mock('@cname()'),
      createTime: Mock.mock('@datetime'),
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


var deviceList = [{
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

Mock.mock(/\/sys\/hotel\/listHotel/, 'get', getHotelList)
Mock.mock(/\/sys\/hotel\/listAllHotel/, 'get', getHotelListAll)

Mock.mock(/\/common\/getHotelUserList/, 'get', getUserListByHotel)

Mock.mock(/\/sys\/hotel\/editHotel/, 'post', editHotel)
Mock.mock(/\/sys\/hotel\/addHotel/, 'post', editHotel)
Mock.mock(/\/sys\/hotel\/deleteBatchHotel/, 'post', delHotel)

Mock.mock(/\/common\/bindHotelUser/, 'post', bindHotelUser)
Mock.mock(/\/common\/unbindHotelUser/, 'post', unbindHotelUser)

// 企业
Mock.mock(/\/sys\/hotel\/listCompany/, 'get', getCompanyList)
Mock.mock(/\/sys\/hotel\/listAllCompany/, 'get', getCompanyListAll)


Mock.mock(/\/sys\/hotel\/listRoom/, 'get', getRoomList)
Mock.mock(/\/sys\/hotel\/listTower/, 'get', getBuildingList)
Mock.mock(/\/sys\/hotel\/listFloor/, 'get', getFloorList)

Mock.mock(/\/common\/room\/devices/, 'get', getRoomDeviceList)

Mock.mock(/\/sys\/hotel\/listGatewayList/, 'get', getHotelRoomGatewayList)
Mock.mock(/\/sys\/hotel\/listInfraredList/, 'get', getHotelRoomInfraredList)
Mock.mock(/\/sys\/hotel\/listHotelGatewayDeviceList/, 'get', getHotelRoomGatewayDeviceList)
Mock.mock(/\/sys\/hotel\/listHotelInfraredDeviceList/, 'get', getHotelRoomInfraredDeviceList)
Mock.mock(/\/sys\/hotel\/bindRoomGateway/, 'post', bindRoomGateway)
Mock.mock(/\/sys\/hotel\/unbindRoomGateway/, 'post', unbindRoomGateway)
Mock.mock(/\/sys\/hotel\/bindRoomInfrared/, 'post', bindRoomInfrared)
Mock.mock(/\/sys\/hotel\/unbindRoomInfrared/, 'post', unbindRoomInfrared)
