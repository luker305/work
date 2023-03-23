'use strict';

const Service = require('egg').Service;

class HouseholderService extends Service {
  async getHouseholderByLogin(userName, password) {
    // ......查询一条数据，得到一个json对象{}
    return await this.app.mysql.get('householder', { userName: userName, password: password,enableStatus:1,deleted:0});
  }

  // 分页查询
  async query(params = {}) {
    const { app } = this
    return await app.model.User.Householder.query({
      ...params,
      attributes: [
        'uuid', 'name', 'userName', 'title', 'tel', 'QQ', 'weChat', 'enableStatus'
      ]
    })
  }

  // 根据Id获取住户信息
  async get(uuid) {
    const { app } = this 
    return await app.model.User.Householder.get({
      uuid,
      attributes: [
        'uuid', 'name', 'userName', 'title', 'tel', 'QQ', 'weChat', 'enableStatus'
      ]
    })
  }

  // 更新住户信息
  async saveModify(params = {}) {
    const { app } = this
    let { householder, userUuid, userName } = params
    // const { password } = householder
    // const modifyInfo = app.getModifyInfo(userUuid, userName)

    // if(password) {
    //   householder.password = password
    // }

    // householder = { ...householder}
    // console.log('householder',  householder)

    return await app.model.User.Householder.saveModify(householder)
  }

  // 新建住户
  async saveNew(params = {}) {
    const { app } = this
    let { householder, userUuid, userName } = params
    // const creatorInfo = app.getCreateInfo(userUuid, userName)

    householder = {
      ...householder,
      // ...creatorInfo,
      // password: md5(householder.password),
      enableStatus: true,
      deleted: '0'
    }

    return await app.model.User.Householder.saveNew(householder)
  }

  // 删除住户信息
  async delModify(params = {}) {
    const { app } = this
    // const { userUuid, userName } = params
    // console.log(params)
    // const modifyInfo = app.getModifyInfo(userUuid, userName)
    const householder = {
      // ...modifyInfo,
      ...params
    }

    await app.model.User.Householder.delModify(householder)
  }


  // 分页查询已删除信息
  async delQuery(params = {}) {
    const { app } = this
    return await app.model.User.Householder.delQuery({
      ...params,
      attributes: [
        'uuid', 'name', 'userName', 'title', 'tel', 'QQ', 'weChat'
      ]
    })
  }


  // 恢复住户信息
  async reModify(params = {}) {
    const { app } = this
    const householder = {
      ...params
    }

    await app.model.User.Householder.reModify(householder)
  }
}

module.exports = HouseholderService;

// controller  -> service ->model ->schema
