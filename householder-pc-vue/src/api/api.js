import  { post, get} from './http'

export default {
    //公共
    login: (params) => post('user/login', params),//登录

    // 住户信息管理
    householder: {
        query: (params) => post('householder/query', params), //显示住户信息列表
        get: (params) => get('householder/get', params), //查找指定id的住户
        saveModify: (params) => post('householder/saveModify', params), //更新住户信息
        saveNew: (params) => post('householder/saveNew', params), //新增住户信息
        delModify: (params) => post('householder/delModify', params), //删除一条住户信息（更新deleted字段为1）
        delQuery: (params) => post('householder/delQuery', params), //显示已删除的住户信息列表
        reModify: (params) => post('householder/reModify', params), //恢复一条住户信息（更新deleted字段为0）
    }
}