import Mock from 'mockjs2'
import { builder, getBody } from '../util'


const totalCount = 60


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
const getDeviceList = () => {
  console.log('mock getDeviceList: ', builder({
    total: totalCount,
    records: deviceList
  }))

  return builder({
    total: totalCount,
    records: deviceList
  })
}


// 网关
const oboxList = [{
  "userName": "",
  "obox_name": "修改obox的名称检查obox名称的长度",
  "obox_serial_id": "b3057fa180",
  "obox_version": "0300020004020302",
  "id": 3,
  "obox_status": 1,
  "userId": 0,
  "oboxId": 3,
  "isBind": 1
}, {
  "userName": "",
  "obox_name": "OBOXeca9",
  "obox_serial_id": "a9ec1ea281",
  "obox_version": "0200020002020202",
  "id": 4,
  "obox_status": 1,
  "userId": 0,
  "oboxId": 4,
  "isBind": 0
}, {
  "userName": "",
  "obox_name": "OBOX9529",
  "obox_serial_id": "2995000000",
  "obox_version": "0600010004020600",
  "id": 5,
  "obox_status": 0,
  "userId": 0,
  "oboxId": 5,
  "isBind": 0
}, {
  "userName": "",
  "obox_name": "OBOX9526",
  "obox_serial_id": "2695000000",
  "obox_version": "0600010004020600",
  "id": 6,
  "obox_status": 1,
  "userId": 0,
  "oboxId": 6,
  "isBind": 1
}, {
  "userName": "",
  "obox_name": "OBOXedac",
  "obox_serial_id": "aced1ea281",
  "obox_version": "0300020004020302",
  "id": 8,
  "obox_status": 1,
  "userId": 0,
  "oboxId": 8,
  "isBind": 0
}, {
  "userName": "",
  "obox_name": "OBOXecee",
  "obox_serial_id": "eeec1ea281",
  "obox_version": "0300020004020302",
  "id": 10,
  "obox_status": 1,
  "userId": 0,
  "oboxId": 10,
  "isBind": 0
}, {
  "userName": "",
  "obox_name": "OBOXeca1",
  "obox_serial_id": "a1ec1ea281",
  "obox_version": "0300020004020302",
  "id": 11,
  "obox_status": 1,
  "userId": 0,
  "oboxId": 11,
  "isBind": 0
}, {
  "userName": "",
  "obox_name": "OBOXeccc",
  "obox_serial_id": "ccec1ea281",
  "obox_version": "0300020004020302",
  "id": 12,
  "obox_status": 1,
  "userId": 0,
  "oboxId": 12,
  "isBind": 0
}, {
  "userName": "",
  "obox_name": "OBOXedae",
  "obox_serial_id": "aeed1ea281",
  "obox_version": "0300020004020302",
  "id": 13,
  "obox_status": 1,
  "userId": 0,
  "oboxId": 13,
  "isBind": 0
}, {
  "userName": "",
  "obox_name": "OBOXed15",
  "obox_serial_id": "15ed1ea281",
  "obox_version": "0300020004020302",
  "id": 14,
  "obox_status": 1,
  "userId": 0,
  "oboxId": 14,
  "isBind": 0
}]
const getOBOXList = () => {
  console.log('mock getOBOXList: ', builder({
    total: totalCount,
    records: oboxList
  }))

  return builder({
    total: totalCount,
    records: oboxList
  })
}


// 红外
const infrared = [{
  "userName": "",
  "name": "IR Transponder",
  "deviceId": "11e25c3a7d",
  "online": 0,
  "state": "[]",
  "type": "51",
  "version": Mock.mock('@integer(100000000, 12900000000)'),
  "action": "[{\"functionId\":1,\"data\":[\"\"],\"functionName\":\"send\",\"function\":\"send\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"download\"]},{\"functionId\":2,\"data\":[\"\"],\"functionName\":\"receive learning\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":3,\"data\":[\"\"],\"functionName\":\"receive pairing\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":4,\"data\":[0],\"functionName\":\"learning\",\"function\":\"learning\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]},{\"functionId\":5,\"data\":[0],\"functionName\":\"pairing\",\"function\":\"pairing\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]}]",
  "userId": 0
}, {
  "userName": "",
  "name": "IR Transponder",
  "deviceId": "12e25c3a7d",
  "online": 0,
  "state": "[]",
  "type": "51",
  "version": Mock.mock('@integer(100000000, 12900000000)'),
  "action": "[{\"functionId\":1,\"data\":[\"\"],\"functionName\":\"send\",\"function\":\"send\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"download\"]},{\"functionId\":2,\"data\":[\"\"],\"functionName\":\"receive learning\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":3,\"data\":[\"\"],\"functionName\":\"receive pairing\",\"function\":\"receive\",\"dataType\":\"raw\",\"functionTag\":\"control\",\"dataTranType\":[\"upload\"]},{\"functionId\":4,\"data\":[0],\"functionName\":\"learning\",\"function\":\"learning\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]},{\"functionId\":5,\"data\":[0],\"functionName\":\"pairing\",\"function\":\"pairing\",\"dataType\":\"int\",\"functionTag\":\"config\",\"dataTranType\":[\"upload\",\"download\"]}]",
  "userId": 0
}, {
  "userName": "",
  "name": "IR Transponder",
  "deviceId": "ba606a224f",
  "online": 0,
  "state": "[]",
  "type": "51",
  "version": Mock.mock('@integer(100000000, 12900000000)'),
  "action": "[{\"data\":[\"\"],\"dataTranType\":[\"download\"],\"dataType\":\"raw\",\"function\":\"send\",\"functionId\":1,\"functionName\":\"send\",\"functionTag\":\"control\"},{\"data\":[\"\"],\"dataTranType\":[\"upload\"],\"dataType\":\"raw\",\"function\":\"receive\",\"functionId\":2,\"functionName\":\"receive learning\",\"functionTag\":\"control\"},{\"data\":[\"\"],\"dataTranType\":[\"upload\"],\"dataType\":\"raw\",\"function\":\"receive\",\"functionId\":3,\"functionName\":\"receive pairing\",\"functionTag\":\"control\"},{\"data\":[0],\"dataTranType\":[\"upload\",\"download\"],\"dataType\":\"int\",\"function\":\"learning\",\"functionId\":4,\"functionName\":\"learning\",\"functionTag\":\"config\"},{\"data\":[0],\"dataTranType\":[\"upload\",\"download\"],\"dataType\":\"int\",\"function\":\"pairing\",\"functionId\":5,\"functionName\":\"pairing\",\"functionTag\":\"config\"}]",
  "userId": 0
}, {
  "userName": "",
  "name": "IR Transponder",
  "deviceId": "456653e350",
  "online": 0,
  "state": "[]",
  "type": "51",
  "version": Mock.mock('@integer(100000000, 12900000000)'),
  "action": "[{\"data\":[\"\"],\"dataTranType\":[\"download\"],\"dataType\":\"raw\",\"function\":\"send\",\"functionId\":1,\"functionName\":\"send\",\"functionTag\":\"control\"},{\"data\":[\"\"],\"dataTranType\":[\"upload\"],\"dataType\":\"raw\",\"function\":\"receive\",\"functionId\":2,\"functionName\":\"receive learning\",\"functionTag\":\"control\"},{\"data\":[\"\"],\"dataTranType\":[\"upload\"],\"dataType\":\"raw\",\"function\":\"receive\",\"functionId\":3,\"functionName\":\"receive pairing\",\"functionTag\":\"control\"},{\"data\":[0],\"dataTranType\":[\"upload\",\"download\"],\"dataType\":\"int\",\"function\":\"learning\",\"functionId\":4,\"functionName\":\"learning\",\"functionTag\":\"config\"},{\"data\":[0],\"dataTranType\":[\"upload\",\"download\"],\"dataType\":\"int\",\"function\":\"pairing\",\"functionId\":5,\"functionName\":\"pairing\",\"functionTag\":\"config\"}]",
  "userId": 0
}]
const getInfraredList = () => {
  console.log('mock getInfraredList: ', builder({
    total: totalCount,
    records: infrared
  }))

  return builder({
    total: totalCount,
    records: infrared
  })
}

const stopCardPower = (options) => {
  const body = getBody(options)
  if (!body.id) {
    return builder({ code: false }, 'id不能为空', 401)
  }
  return builder({}, '成功')
}

const stopInfrared = (options) => {
  const body = getBody(options)
  if (!body.id) {
    return builder({ code: false }, 'id不能为空', 401)
  }
  return builder({}, '成功')
}


Mock.mock(/\/common\/device\/list/, 'get', getDeviceList)
Mock.mock(/\/common\/obox\/list/, 'get', getOBOXList)
Mock.mock(/\/common\/infrared\/list/, 'get', getInfraredList)
Mock.mock(/\/common\/stopCardPower/, 'post', stopCardPower)
Mock.mock(/\/common\/stopInfrared/, 'post', stopInfrared)

