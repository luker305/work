'use strict'
const _ = require('lodash')

module.exports = {
    _,

    // 检查update 
    checkUpdate(arr, message) {
        // sequlize在update()返回一个数组，表示更新的数量
        if (arr.includes(0)) {
            const error = new Error(message)
            error.status = 422
            throw error
        }
    }
}