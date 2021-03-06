import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const info = (options) => {
  console.log('options', options)
  const userInfo = {
    'id': '4291d7da9005377ec9aec4a71ea837f',
    'name': '天野远子',
    'username': 'admin',
    'password': '',
    'avatar': '/avatar2.jpg',
    'status': 1,
    'telephone': '',
    'lastLoginIp': '27.154.74.117',
    'lastLoginTime': 1534837621348,
    'creatorId': 'admin',
    'createTime': 1497160610259,
    'merchantCode': 'TLif2btpzg079h15bk',
    'deleted': 0,
    'roleId': 'admin',
    'role': {}
  }
  // role
  const roleObj = {
    'id': 'admin',
    'name': '管理员',
    'describe': '拥有所有权限',
    'status': 1,
    'creatorId': 'system',
    'createTime': 1497160610259,
    'deleted': 0,
    'permissions': [{
      'roleId': 'admin',
      'permissionId': 'dashboard',
      'permissionName': '仪表盘',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'exception',
      'permissionName': '异常页面权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'result',
      'permissionName': '结果权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'profile',
      'permissionName': '详细页权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'table',
      'permissionName': '表格权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'import',
        'describe': '导入',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'form',
      'permissionName': '表单权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'order',
      'permissionName': '订单管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'permission',
      'permissionName': '权限管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'role',
      'permissionName': '角色管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'table',
      'permissionName': '桌子管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'user',
      'permissionName': '用户管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'import',
        'describe': '导入',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }, {
        'action': 'export',
        'describe': '导出',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }]
  }

  roleObj.permissions.push({
    'roleId': 'admin',
    'permissionId': 'support',
    'permissionName': '超级模块',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'import',
      'describe': '导入',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }, {
      'action': 'export',
      'describe': '导出',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  })

  userInfo.role = roleObj
  return builder(userInfo)
}

const userNav = () => {
  const nav = [
    // dashboard
    {
      'name': 'dashboard',
      'parentId': 0,
      'id': 1,
      'meta': {
        'icon': 'dashboard',
        'title': '仪表盘',
        'show': true
      },
      'component': 'RouteView',
      'redirect': '/dashboard/workplace'
    },
    {
      'name': 'workplace',
      'parentId': 1,
      'id': 7,
      'meta': {
        'title': '工作台',
        'show': true
      },
      'component': 'Workplace'
    },
    {
      'name': 'monitor',
      'path': 'https://www.baidu.com/',
      'parentId': 1,
      'id': 3,
      'meta': {
        'title': '监控页（外部）',
        'target': '_blank',
        'show': true
      }
    },
    {
      'name': 'Analysis',
      'parentId': 1,
      'id': 2,
      'meta': {
        'title': '分析页',
        'show': true
      },
      'component': 'Analysis',
      'path': '/dashboard/analysis'
    },
    {
      'name': 'tests',
      'parentId': 1,
      'id': 8,
      'meta': {
        'title': '测试功能',
        'show': true
      },
      'component': 'TestWork'
    },

    // form
    {
      'name': 'form',
      'parentId': 0,
      'id': 10,
      'meta': {
        'icon': 'form',
        'title': '表单页'
      },
      'redirect': '/form/base-form',
      'component': 'PageView'
    },
    {
      'name': 'basic-form',
      'parentId': 10,
      'id': 6,
      'meta': {
        'title': '基础表单'
      },
      'component': 'BasicForm'
    },
    {
      'name': 'step-form',
      'parentId': 10,
      'id': 5,
      'meta': {
        'title': '分步表单'
      },
      'component': 'StepForm'
    },
    {
      'name': 'advanced-form',
      'parentId': 10,
      'id': 4,
      'meta': {
        'title': '高级表单'
      },
      'component': 'AdvanceForm'
    },

    // list
    {
      'name': 'list',
      'parentId': 0,
      'id': 10010,
      'meta': {
        'icon': 'table',
        'title': '列表页',
        'show': true
      },
      'redirect': '/list/table-list',
      'component': 'PageView'
    },
    {
      'name': 'table-list',
      'parentId': 10010,
      'id': 10011,
      'path': '/list/table-list/:pageNo([1-9]\\d*)?',
      'meta': {
        'title': '查询表格',
        'show': true
      },
      'component': 'TableList'
    },
    {
      'name': 'basic-list',
      'parentId': 10010,
      'id': 10012,
      'meta': {
        'title': '标准列表',
        'show': true
      },
      'component': 'StandardList'
    },
    {
      'name': 'card',
      'parentId': 10010,
      'id': 10013,
      'meta': {
        'title': '卡片列表',
        'show': true
      },
      'component': 'CardList'
    },
    {
      'name': 'search',
      'parentId': 10010,
      'id': 10014,
      'meta': {
        'title': '搜索列表',
        'show': true
      },
      'redirect': '/list/search/article',
      'component': 'SearchLayout'
    },
    {
      'name': 'article',
      'parentId': 10014,
      'id': 10015,
      'meta': {
        'title': '搜索列表（文章）',
        'show': true
      },
      'component': 'SearchArticles'
    },
    {
      'name': 'project',
      'parentId': 10014,
      'id': 10016,
      'meta': {
        'title': '搜索列表（项目）',
        'show': true
      },
      'component': 'SearchProjects'
    },
    {
      'name': 'application',
      'parentId': 10014,
      'id': 10017,
      'meta': {
        'title': '搜索列表（应用）',
        'show': true
      },
      'component': 'SearchApplications'
    },

    // profile
    {
      'name': 'profile',
      'parentId': 0,
      'id': 10018,
      'meta': {
        'title': '详情页',
        'icon': 'profile',
        'show': true
      },
      'redirect': '/profile/basic',
      'component': 'RouteView'
    },
    {
      'name': 'basic',
      'parentId': 10018,
      'id': 10019,
      'meta': {
        'title': '基础详情页',
        'show': true
      },
      'component': 'ProfileBasic'
    },
    {
      'name': 'advanced',
      'parentId': 10018,
      'id': 10020,
      'meta': {
        'title': '高级详情页',
        'show': true
      },
      'component': 'ProfileAdvanced'
    },

    // result
    {
      'name': 'result',
      'parentId': 0,
      'id': 10021,
      'meta': {
        'title': '结果页',
        'icon': 'check-circle-o',
        'show': true
      },
      'redirect': '/result/success',
      'component': 'PageView'
    },
    {
      'name': 'success',
      'parentId': 10021,
      'id': 10022,
      'meta': {
        'title': '成功',
        'hiddenHeaderContent': true,
        'show': true
      },
      'component': 'ResultSuccess'
    },
    {
      'name': 'fail',
      'parentId': 10021,
      'id': 10023,
      'meta': {
        'title': '失败',
        'hiddenHeaderContent': true,
        'show': true
      },
      'component': 'ResultFail'
    },

    // Exception
    {
      'name': 'exception',
      'parentId': 0,
      'id': 10024,
      'meta': {
        'title': '异常页',
        'icon': 'warning',
        'show': true
      },
      'redirect': '/exception/403',
      'component': 'RouteView'
    },
    {
      'name': '403',
      'parentId': 10024,
      'id': 10025,
      'meta': {
        'title': '403',
        'show': true
      },
      'component': 'Exception403'
    },
    {
      'name': '404',
      'parentId': 10024,
      'id': 10026,
      'meta': {
        'title': '404',
        'show': true
      },
      'component': 'Exception404'
    },
    {
      'name': '500',
      'parentId': 10024,
      'id': 10027,
      'meta': {
        'title': '500',
        'show': true
      },
      'component': 'Exception500'
    },

    // account
    {
      'name': 'account',
      'parentId': 0,
      'id': 10028,
      'meta': {
        'title': '个人页',
        'icon': 'user',
        'show': true
      },
      'redirect': '/account/center',
      'component': 'RouteView'
    },
    {
      'name': 'center',
      'parentId': 10028,
      'id': 10029,
      'meta': {
        'title': '个人中心',
        'show': true
      },
      'component': 'AccountCenter'
    },
    // 特殊三级菜单
    {
      'name': 'settings',
      'parentId': 10028,
      'id': 10030,
      'meta': {
        'title': '个人设置',
        'hideHeader': true,
        'hideChildren': true,
        'show': true
      },
      'redirect': '/account/settings/base',
      'component': 'AccountSettings'
    },
    {
      'name': 'BaseSettings',
      'path': '/account/settings/base',
      'parentId': 10030,
      'id': 10031,
      'meta': {
        'title': '基本设置',
        'show': false
      },
      'component': 'BaseSettings'
    },
    {
      'name': 'SecuritySettings',
      'path': '/account/settings/security',
      'parentId': 10030,
      'id': 10032,
      'meta': {
        'title': '安全设置',
        'show': false
      },
      'component': 'SecuritySettings'
    },
    {
      'name': 'CustomSettings',
      'path': '/account/settings/custom',
      'parentId': 10030,
      'id': 10033,
      'meta': {
        'title': '个性化设置',
        'show': false
      },
      'component': 'CustomSettings'
    },
    {
      'name': 'BindingSettings',
      'path': '/account/settings/binding',
      'parentId': 10030,
      'id': 10034,
      'meta': {
        'title': '账户绑定',
        'show': false
      },
      'component': 'BindingSettings'
    },
    {
      'name': 'NotificationSettings',
      'path': '/account/settings/notification',
      'parentId': 10030,
      'id': 10034,
      'meta': {
        'title': '新消息通知',
        'show': false
      },
      'component': 'NotificationSettings'
    }
  ]
  const json = builder(nav)
  console.log('json', json)
  return json
}

const queryPermissionList = () => {
  const menu = [
    {
      component: 'dashboard/Analysis',
      id: '9502685863ab87f0ad1134142788a385',
      meta: { keepAlive: false, icon: 'home', title: '首页' },
      icon: 'home',
      keepAlive: false,
      title: '首页',
      name: 'dashboard-analysis',
      path: '/dashboard/analysis',
      redirect: null,
      route: '1',
    },
    {
      children: [{
        component: 'jeecg/report/ArchivesStatisticst',
        id: '2aeddae571695cd6380f6d6d334d6e7d',
        meta: { keepAlive: false, title: '布局统计报表' },
        keepAlive: false,
        title: '布局统计报表',
        name: 'report-ArchivesStatisticst',
        path: '/report/ArchivesStatisticst',
        route: '1'
      }],
      component: 'layouts/RouteView',
      id: 'f0675b52d89100ee88472b6800754a08',
      meta: { keepAlive: false, icon: 'bar-chart', title: '统计报表' },
      name: 'report',
      path: '/report',
      redirect: null,
      route: '1'
    }
  ]
  const auth = [
    {
      action: 'online:goGenerateCode',
      describe: '代码生成按钮',
      type: '1'
    },
    {
      action: 'user:form:phone',
      describe: '手机号禁用',
      type: '2'
    },
    {
      action: 'user:add',
      describe: '添加用户按钮',
      type: '1'
    }
  ]
  return {
    menu,
    auth
  }
}

const getUserList = () => {
  const result = []
  for (let i = 1; i < Mock.mock('@integer(1,10)'); i++) {
    const tmpKey = i
    result.push({
      key: tmpKey,
      id: tmpKey,
      name: Mock.mock('@cname()'),
    })
  }

  console.log('mock getUserList: ', builder({
    records: result
  }))

  return builder({
    records: result
  })
}

const totalCount = 5701
const getUserListPage = (options) => {
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
      account: Mock.mock('@name()'),
    })
  }
  console.log('mock getUserListPage: ', builder({
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

Mock.mock(/\/api\/user\/info/, 'get', info)
Mock.mock(/\/api\/user\/nav/, 'get', userNav)
Mock.mock(/\/api\/user\/queryPermissionList/, 'get', queryPermissionList)

// Mock.mock(/\/sys\/user\/listAll/, 'get', getUserList)
// Mock.mock(/\/sys\/user\/list/, 'get', getUserListPage)
