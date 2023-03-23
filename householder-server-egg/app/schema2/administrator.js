const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    uuid: {
      type: DataTypes.STRING(38),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "uuid"
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "userName"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "password"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "realName"
    },
    tel: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tel"
    }
  };
  const options = {
    tableName: "administrator",
    comment: "",
    indexes: []
  };
  const AdministratorModel = sequelize.define("administrator_model", attributes, options);
  return AdministratorModel;
};