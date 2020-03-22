'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bp_campaigns', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
          createdAt:{
            type: Sequelize.DATE
          },
          updatedAt:{
            type: Sequelize.DATE
          }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bp_campaigns');
  }
};