/* eslint valid-jsdoc: "off" */

'use strict';
const fecha = require('fecha')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1675763894105_7231';


  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.jwt = {
    secret: 'zwq'
  }




  // 配置单数据库mysql，数据库实例
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'zwq',
      // 密码
      password: '12345',
      // 数据库名
      database: 'householder-list',
    },
    //所有数据库配置的默认值
    default: {},
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'householder-list',
    host: '127.0.0.1',
    port: '3306',
    username: 'zwq',
    password: '12345',
    timezone: '+08:00',
    define: {
      //timestamps: false, // 不要添加时间戳属性 (updatedAt, createdAt)
      
      createdAt: 'createdTime',
      updatedAt: 'lastModifiedTime',
      // 禁止修改表名
      // 默认情况下，sequelize 会自动将所有传递的模型名称转换为复数形式。 如果不想这样做，请设置以下内容
      freezeTableName: true,  
      underscored: false, //true:By now underscore option manage foreign keys and create_at, modifed_at fields only.
      // underscored选项  （通常设置为false）Sequelize允许对模型设置underscored选项。
      // 如果为true，则此选项会将所有属性上的field选项设置为其名称的下划线版本。 
      getterMethods: {
        createdTime() {
          const createdTime = this.getDataValue('createdTime');
          if (createdTime) {
            return fecha.format(createdTime, 'YYYY-MM-DD HH:mm:ss');
          }
        },
        lastModifiedTime() {
          const lastModifiedTime = this.getDataValue('lastModifiedTime');
          if (lastModifiedTime) {
            return fecha.format(lastModifiedTime, 'YYYY-MM-DD HH:mm:ss');
          }
        },
      }
    },
  }





  // add your middleware config here
  config.middleware = ['auth'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
