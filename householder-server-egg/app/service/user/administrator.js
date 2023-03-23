'use strict';

const Service = require('egg').Service;

class RegistrarService extends Service {
    // 登录
  async getAdministratorByLogin(userName, password) {
    // ......查询一条数据，得到一个json对象{}
    return await this.app.mysql.get('administrator', { userName: userName, password: password});
  }
}

module.exports = RegistrarService;
