'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      duration:{
        type: Sequelize.STRING
      },
      feedback:{
        type: Sequelize.STRING
      },
      assigned_by: {
        type: Sequelize.INTEGER,
        references: {
          model: {
              tableName: "users"
          },
          key: "id"
        },
        allowNull: false
      },
      aquisition_member_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
              tableName: "users"
          },
          key: "id"
        },
        allowNull: false
      },
      deleted:{
        type: Sequelize.INTEGER
      },
      task_start_time: {
        type: Sequelize.TIME
      },
      task_start_date: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('tasks');
  }
};
