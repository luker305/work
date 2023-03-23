import { Constants } from './constants'

export default {
  //账号状态转换成中文
  formatEnableStatusToCN(status) {
    return Constants.ENABLE_STATUS[status]
  },

  // 账号状态样式
  formatEnableStatusToClass(status) {
    return Constants.ENABLE_STATUS_CLASS[status]
  }

}