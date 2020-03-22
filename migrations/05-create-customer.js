'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers', {
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
      },
      phone: {
        type: Sequelize.STRING,
        unique: true
      },
      image: {
        type: Sequelize.STRING
      },
      pick_up: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      drop_off: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pick_up_id: {
        type: Sequelize.INTEGER,
      },
      drop_off_id: {
        type: Sequelize.INTEGER,
      },
      institution: {
        type: Sequelize.INTEGER
      },
      campaign_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
              tableName: "campaigns"
          },
          key: "id"
        },
        allowNull: false
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
    return queryInterface.dropTable('Customers');
  }
};