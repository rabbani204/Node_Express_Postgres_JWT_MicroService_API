'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('campaigns', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING
      },
      campaign_manager: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
        },
        allowNull: false
      },
      campaign_place: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      campaign_duration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      campaign_status: {
        type: Sequelize.STRING
      },
      campaign_start_time: {
        type: Sequelize.STRING
      },
      campaign_start_date: {
        type: Sequelize.STRING
      },
      created_by: {
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
      createdAt:{
        type: Sequelize.DATE
      },
      updatedAt:{
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Campaigns');
  }
};