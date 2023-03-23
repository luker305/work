'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  //账户相关
  router.post('/user/login',controller.user.common.login)//登录相关

  // 住户管理
  router.post('/householder/query', controller.user.householder.query)  //分页查找
  router.get('/householder/get', controller.user.householder.get)  //根据id获取值
  router.post('/householder/saveModify', controller.user.householder.saveModify) //保存用户信息
  router.post('/householder/saveNew', controller.user.householder.saveNew) //新增住户信息
  router.post('/householder/delModify', controller.user.householder.delModify) //删除住户信息
  router.post('/householder/delQuery', controller.user.householder.delQuery)  //分页查找已删除信息
  router.post('/householder/reModify', controller.user.householder.reModify) //恢复住户信息
};
