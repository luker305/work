'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    //操作成功
  success(data,status){
    this.ctx.body = { 
        code: 0,
        data
    }
    this.ctx.status = status || 200
  }
  //操作失败
  fail(code,message){
    this.ctx.body = {
        code,
        message,
        data: {}
    }
    this.ctx.status = 200
  }
}

module.exports = BaseController;
