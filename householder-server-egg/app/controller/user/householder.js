'use strict';

const Controller = require('../../core/base_controller')

class HouseholderController extends Controller {
  // 分页查询
  async query() {
    const { ctx } = this
    // console.log(ctx.request.body)
    const householders = await ctx.service.user.householder.query(ctx.request.body)
    this.success(householders)
  }

  // 根据Id获取教师信息
  async get() {
    // console.log('测试111111')
    const { ctx } = this
    // console.log('我是前端传过来的住户id', ctx.query)
    const { householderID: householderUuid } = ctx.query
    // console.log(householderUuid)

    const householder = await ctx.service.user.householder.get(householderUuid)
    this.success(householder)
  }

  // 更新住户信息
  async saveModify() {
    // console.log('测试222222')
    const { ctx } = this
    const rule = {
      householder: 'object'
    }
    // 默认就会对 ctx.request.body 进行检验
    ctx.validate(rule)
    // console.log('kkkkk', ctx.request.body)

    const uuid = await ctx.service.user.householder.saveModify(ctx.request.body)

    this.success(uuid)
  }

  // 新增住户
  async saveNew() {
    const { ctx } = this
    try {
      const rule = {
        householder: 'object'
      }
      ctx.validate(rule) //默认就会对ctx.request.body进行验证
      const uuid = await ctx.service.user.householder.saveNew(ctx.request.body)

      this.success(uuid)
    } catch(err) {
      const { fields = {}, name } = err
      if (name == 'SequelizeUniqueConstraintError') {
        // console.log(fields);
        // console.log(fields['merchant.userName']);
        this.fail(ctx.UNIQUE_CODE, `账号：${fields['householder.userName']} 的住户账号已存在`)
      } else {
        throw new Error(err)
      }
    }
  }

  // 删除住户信息（更新deleted字段值为1）
  async delModify() {
    const { ctx } = this
    await ctx.service.user.householder.delModify(ctx.request.body)

    this.success()
  }


  // 分页查询已删除信息
  async delQuery() {
    const { ctx } = this
    const householders = await ctx.service.user.householder.delQuery(ctx.request.body)
    this.success(householders)
  }


  // 恢复住户信息（更新deleted字段值为0）
  async reModify() {
    const { ctx } = this
    await ctx.service.user.householder.reModify(ctx.request.body)

    this.success()
  }
}

module.exports = HouseholderController;
