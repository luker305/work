'use strict'

const { sequelize } = require("../../../config/plugin")
const { checkUpdate } = require("../../extend/application")

module.exports = app => {
  const { Sequelize, model, checkUpdate } = app
  const { Op } = Sequelize
  const HouseholderModel = require("../../schema/householder.js")(model)

  // 分页查询
  HouseholderModel.query = async ({ attributes, pagination = {}, filter = {} }) => {
    const { page, pageSize: limit} = pagination
    const { keywordsLike, status } = filter
    const condition = {
      offset: (page - 1) * limit,
      limit,
      attributes,
      where: {}
    }
    if(status) {
      condition.where.enableStatus = status
    }
    if(keywordsLike) {
      condition.where[Op.or] = [
        { name: { [Op.like]: `%${keywordsLike}%` } },
        { userName: { [Op.like]: `%${keywordsLike}%` } },
        { QQ: { [Op.like]: `%${keywordsLike}%` } },
        { weChat: { [Op.like]: `%${keywordsLike}%` } },
        { tel: { [Op.like]: `%${keywordsLike}%` } },
        { title: { [Op.like]: `%${keywordsLike}%` } },
      ]
    }
    condition.where.deleted = 0

    const { count, rows } = await HouseholderModel.findAndCountAll(condition)

    return { page, count, rows }
  }

  // 根据Id获取住户信息
  HouseholderModel.get = async ({ uuid , attributes }) => {
    const householder = await HouseholderModel.findByPk(uuid, {
      attributes,
    })
    // console.log('根据Id获取住户信息结果：', householder)
    return householder
  }
  
  // 根据ID的值来更新住户信息
  HouseholderModel.saveModify = async (householder) => {
    const {
      uuid, name, tel, QQ, weChat,title, enableStatus, password
    } = householder
    const updateField = {
      name, tel, QQ, weChat,title,enableStatus
    }
    if(password) {
      updateField.password = password
    }
    const result = await HouseholderModel.update(updateField, {
      where: {
        uuid,
      }
    })
    // sequlize在update()返回一个数组，表示更新的数量
    // console.log('更新了：', result)
    checkUpdate(result, '住户信息更新失败')
    return uuid
  }

  // 新增住户
  HouseholderModel.saveNew = async (householder) => {
    const houhol = await HouseholderModel.create(householder)
    // console.log('新增住户', houhol)
    return houhol.uuid
  }

  // 删除住户
  HouseholderModel.delModify = async (householder) => {
    const { uuid, lastModifierId, lastModifierName } = householder
    const updateField = {
      // lastModifierId,
      // lastModifierName,
      deleted: '1'
    }
    const result = await HouseholderModel.update(updateField, {
      where: {
        uuid,
      }
    })
    // result 是数组，[1] 影响了1行， [4]  影响了4行
    checkUpdate(result, '住户信息删除失败，请稍后再试！')

    // console.log(result)
    return result
  }


  // 分页查询已删除信息
  HouseholderModel.delQuery = async ({ attributes, pagination = {}, filter = {} }) => {
    const { page, pageSize: limit} = pagination
    const { keywordsLike, status } = filter
    const condition = {
      offset: (page - 1) * limit,
      limit,
      attributes,
      where: {}
    }
    if(keywordsLike) {
      condition.where[Op.or] = [
        { name: { [Op.like]: `%${keywordsLike}%` } },
        { userName: { [Op.like]: `%${keywordsLike}%` } },
        { QQ: { [Op.like]: `%${keywordsLike}%` } },
        { weChat: { [Op.like]: `%${keywordsLike}%` } },
        { tel: { [Op.like]: `%${keywordsLike}%` } },
        { title: { [Op.like]: `%${keywordsLike}%` } },
      ]
    }
    condition.where.deleted = 1

    const { count, rows } = await HouseholderModel.findAndCountAll(condition)

    return { page, count, rows }
  }


  // 恢复住户
  HouseholderModel.reModify = async (householder) => {
    const { uuid } = householder
    const updateField = {
      enableStatus: '1',
      deleted: '0'
    }
    const result = await HouseholderModel.update(updateField, {
      where: {
        uuid,
      }
    })
    checkUpdate(result, '住户信息恢复失败，请稍后再试！')

    return result
  }

  return HouseholderModel
}