'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      main_sys_id:{
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING,
        unique: true
      },
      gender: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING
      },
      main_sys_id:{
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      in_service: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      deleted:{
        type: Sequelize.INTEGER
      },
      createdAt:{
        type: Sequelize.DATE
      },
      updatedAt:{
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
