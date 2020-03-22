'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    })
    // .then(() => queryInterface.addConstraint('forms',['created_by'],{
    //   type: 'FOREIGN KEY',
    //   name: 'FK_created_by_Users', 
    //   references: {
    //     table: 'Users',
    //     field: 'id',
    //   },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('forms');
  }
};
