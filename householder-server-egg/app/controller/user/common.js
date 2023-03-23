'use strict';

// const Controller = require('egg').Controller;
const Controller = require('../../core/base_controller')

class CommonController extends Controller {
  async login() {
    //登录的后台逻辑代码
    const { ctx , app } = this //const app = this.app;const ctx = this.ctx
    const{ userName, password, userType } = ctx.request.body
    // console.log(ctx.request.body)//输出测试

    let user
    if(userType == 'administrator'){
      //管理员的逻辑代码
      user = await ctx.service.user.administrator.getAdministratorByLogin(userName, password)
    }else{
      //房主的逻辑代码
      user = await ctx.service.user.householder.getHouseholderByLogin(userName, password)
    }

    // console.log(user)//测试数据是否账号密码是否匹配

    if(app._.isEmpty(user)){
      return this.fail(ctx.ERROR_CODE,'账号或密码有误！')
    }

    const { uuid: userUuid, name: name } = user
    const result = { name, userUuid, userName, userType }
    ctx.setToken(result)
    user.userType=userType
    // console.log(user)
    this.success(user)
    
  }
}

module.exports = CommonController;
