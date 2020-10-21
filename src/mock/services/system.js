import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const getUserPermission = () => {
  return builder({
    "auth": [{
      "action": "user:add",
      "describe": "添加用户按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "user:del",
      "describe": "删除用户按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:map:upload",
      "describe": "上传平面图",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:map:edit",
      "describe": "平面图编辑节点",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:map:delete",
      "describe": "删除节点",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:map:control",
      "describe": "节点控制",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:classroom:add",
      "describe": "添加教室按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:classroom:edit",
      "describe": "编辑教室按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:classroom:delete",
      "describe": "删除教室按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:classroom:device:view",
      "describe": "查看教室设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:classroom:device:bind",
      "describe": "绑定教室设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:classroom:device:unbind",
      "describe": "解绑教室设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:classroom:power",
      "describe": "课室电源按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:building:add",
      "describe": "添加楼栋按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:building:edit",
      "describe": "编辑楼栋按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:building:delete",
      "describe": "删除楼栋按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:building:power",
      "describe": "楼栋电源按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:floor:add",
      "describe": "添加楼层按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:floor:edit",
      "describe": "编辑楼层按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:floor:delete",
      "describe": "删除楼层按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:floor:power",
      "describe": "楼层电源按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:normal:add",
      "describe": "添加设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:normal:edit",
      "describe": "编辑设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:normal:delete",
      "describe": "删除设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:normal:control",
      "describe": "控制设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:infrared:edit",
      "describe": "编辑红外设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:infrared:delete",
      "describe": "删除红外设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:infrared:control",
      "describe": "控制红外设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:gateway:edit",
      "describe": "编辑网关设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:gateway:delete",
      "describe": "删除网关设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:group:add",
      "describe": "添加编组按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:group:edit",
      "describe": "编辑编组按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:group:delete",
      "describe": "删除编组按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "scene:add",
      "describe": "添加场景按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "scene:edit",
      "describe": "编辑场景按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "scene:delete",
      "describe": "删除场景按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "scene:control",
      "describe": "执行场景按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:classroom:lamp",
      "describe": "课室灯控按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:classroom:switch",
      "describe": "课室开关控按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:building:lamp",
      "describe": "楼栋灯控按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:building:switch",
      "describe": "楼栋开关控按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:floor:lamp",
      "describe": "楼层灯控按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:floor:switch",
      "describe": "楼层开关控按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:group:add",
      "describe": "添加设备分组按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:group:edit",
      "describe": "编辑设备分组按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:equip:delete",
      "describe": "删除设备分组按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:equip:control",
      "describe": "设备分组组控按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:equip:member",
      "describe": "设备分组组员按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:gateway:add",
      "describe": "添加网关按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:group:equip",
      "describe": "编组设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:group:grouping",
      "describe": "分组详情按钮",
      "type": "1",
      "status": "1"
    }],
    "menu": [{
      "redirect": null,
      "path": "/dashboard/analysis",
      "component": "dashboard/Analysis",
      "route": "1",
      "meta": {
        "keepAlive": false,
        "internalOrExternal": false,
        "icon": "home",
        "title": "首页"
      },
      "name": "dashboard-analysis",
      "id": "9502685863ab87f0ad1134142788a385"
    }, {
      "redirect": null,
      "path": "/hotel",
      "component": "Layouts/RouteView",
      "route": "1",
      "children": [{
        "path": "/hotel/list",
        "component": "hotel/Hotel",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "酒店信息"
        },
        "name": "hotel-list",
        "id": "1280342084147073026"
      }, {
        "path": "/hotel/company",
        "component": "hotel/Company",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "企业信息"
        },
        "name": "hotel-Company",
        "id": "12803420841470711126"
      }, {
        "path": "/hotel/building",
        "component": "hotel/Building",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "楼栋信息"
        },
        "name": "hotel-building",
        "id": "1291553686949117954"
      }, {
        "path": "/hotel/floor",
        "component": "hotel/Floor",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "楼层信息"
        },
        "name": "hotel-floor",
        "id": "1291553802414112770"
      }, {
        "path": "/hotel/room",
        "component": "hotel/Room",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "房间信息"
        },
        "name": "hotel-room",
        "id": "1291552096649396225"
      }],
      "meta": {
        "keepAlive": false,
        "internalOrExternal": false,
        "icon": "box-plot",
        "title": "酒店管理"
      },
      "name": "hotel",
      "id": "1280341937132523522"
    }, {
      "redirect": null,
      "path": "/device",
      "component": "Layouts/RouteView",
      "route": "1",
      "children": [{
        "path": "/device/normal",
        "component": "device/Normal",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "设备"
        },
        "name": "device-normal",
        "id": "1280342524867760130"
      }, {
        "path": "/device/infrared",
        "component": "device/Infrared",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "红外"
        },
        "name": "device-infrared",
        "id": "1280342629033299970"
      }, {
        "path": "/device/gateway",
        "component": "device/Gateway",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "网关"
        },
        "name": "device-gateway",
        "id": "1291554608555147265"
      }],
      "meta": {
        "keepAlive": false,
        "internalOrExternal": false,
        "icon": "build",
        "title": "设备管理"
      },
      "name": "device",
      "id": "1280342342457479170"
    }, {
      "redirect": null,
      "path": "/reports",
      "component": "Layouts/RouteView",
      "route": "1",
      "children": [{
        "path": "/reports/enterprise",
        "component": "reports/Enterprise",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "集团经营报表"
        },
        "name": "reports-enterprise",
        "id": "1280341032697974786"
      }, {
        "path": "/reports/hotel",
        "component": "reports/Hotel",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "酒店经营报表"
        },
        "name": "reports-hotel",
        "id": "1280341032697974786"
      }, {
        "path": "/reports/mine",
        "component": "reports/Mine",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "我的酒店报表"
        },
        "name": "reports-mine",
        "id": "1280341032697974786"
      }, {
        "path": "/reports/equips",
        "component": "reports/Equips",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "网关红外报表"
        },
        "name": "reports-equips",
        "id": "1280341032697974786"
      }, {
        "path": "/reports/offline",
        "component": "reports/Offline",
        "route": "1",
        "hidden": true,
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "设备离线统计"
        },
        "name": "reports-offline",
        "id": "1280341032697974786"
      }, {
        "path": "/reports/exception",
        "component": "reports/Exception",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "设备异常报表"
        },
        "name": "reports-exception",
        "id": "1280341032697974786"
      }],
      "meta": {
        "keepAlive": false,
        "internalOrExternal": false,
        "icon": "obicon-scene",
        "title": "报表管理"
      },
      "name": "reports",
      "id": "1280340922102566913"
    }, {
      "redirect": null,
      "path": "/isystem",
      "component": "Layouts/RouteView",
      "route": "1",
      "children": [{
        "path": "/isystem/setting",
        "component": "system/SysSetting",
        "route": "1",
        hideChildrenInMenu: true,
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "系统配置"
        },
        redirect: '/isystem/setting/base',
        "name": "isystem-setting",
        "id": "1242639108812083202",
        children: [{
          "path": "/isystem/setting/base",
          "component": "system/SysSettingBase",
          "route": "1",
          "hidden": true,
          "meta": {
            "keepAlive": false,
            "internalOrExternal": false,
            "title": "基础配置"
          },
          "name": "isystem-base-setting",
          "id": "1242639108812083202"
        }]
      }, {
        "path": "/isystem/user",
        "component": "system/UserList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "用户管理"
        },
        "name": "isystem-user",
        "id": "1242639108812083202"
      }, {
        "path": "/isystem/role",
        "component": "system/RoleList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "角色管理"
        },
        "name": "isystem-role",
        "id": "1242640677855072258"
      }, {
        "path": "/isystem/annountcement",
        "component": "system/SysAnnouncementList",
        "route": "1",
        "hidden": false,
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "系统消息"
        },
        "name": "isystem-annountcement",
        "id": "1243092567156932610"
      }, {
        "path": "/isystem/log",
        "component": "system/SysLogList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "系统日志"
        },
        "name": "isystem-log",
        "id": "1300347295869571074"
      }, {
        "path": "/isystem/permission",
        "component": "system/MenuList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "菜单管理"
        },
        "name": "isystem-permission",
        "id": "54dd5457a3190740005c1bfec55b1c34"
      }],
      "meta": {
        "keepAlive": false,
        "internalOrExternal": false,
        "icon": "setting",
        "title": "系统管理"
      },
      "name": "isystem",
      "id": "d7d6e2e4e2934f2c9385a623fd98c6f3"
    }]
  })
}

const totalCount = 60
const getAnnouncementList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      id: Mock.mock('@id()'),
      title: Mock.mock('@cword(3, 5)'),
      target: Mock.mock('@cword(3, 5)'),
      type: Mock.mock('@integer(1, 2)'),
      status: Mock.mock('@integer(0, 1)'),
      createAt: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock getAnnouncementList: ', builder({
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

Mock.mock(/\/sys\/permission\/getUserPermission/, 'get', getUserPermission)
Mock.mock(/\/sys\/announcement\/list/, 'get', getAnnouncementList)
