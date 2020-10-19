import * as Login from './login'
import * as System from './system'
import * as Messsage from './message'
import * as Reports from './reports'

export default {
  ...Login,
  ...System,
  ...Messsage,
  ...Reports
}
