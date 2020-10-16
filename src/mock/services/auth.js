import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const username = ['admin', 'super']
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3'
const password = ['25d55ad283aa400af464c76d713c07ad'] // admin, 123456

const login = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }
  const userInfo = {
    'id': Mock.mock('@guid'),
    "username": "admin",
    "realname": Mock.mock('@name'),
    "password": "",
    "salt": "WNWUAAmO",
    "avatar": 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    "birthday": null,
    "sex": null,
    "email": null,
    "phone": null,
    "orgCode": null,
    "status": 1,
    "delFlag": 0,
    "activitiSync": true,
    "workNo": null,
    "post": null,
    "telephone": null,
    "createBy": "cc6",
    "createTime": "2020-08-20 16:32:48",
    "updateBy": "admin",
    "updateTime": "2020-09-01 17:42:41",
    "hotels": [{
      id: Mock.mock('@id'),
      name: Mock.mock('@cword(3, 5)') + '酒店',
    }]
  }
  console.log('mock login: ', builder({ token: '4291d7da9005377ec9aec4a71ea837f', userInfo }, '', 0, { 'Custom-Header': Mock.mock('@guid') }, true))
  return builder({ token: '4291d7da9005377ec9aec4a71ea837f', userInfo }, '', 0, { 'Custom-Header': Mock.mock('@guid') }, true)
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
