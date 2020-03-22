'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('form_inputs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
      },
      input_type: {
        type:   Sequelize.STRING,
      },
      is_require:{
          type: Sequelize.BOOLEAN
      },
      input_data:{
        type: Sequelize.JSONB
      },
      form_id:{
        type: Sequelize.INTEGER,
        references: {
          model: {
              tableName: "forms"
          },
          key: "id"
        },
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    })
    // .then(() => queryInterface.addConstraint('form_input',['form_id'],{
    //   type: 'FOREIGN KEY',
    //   name: 'FK_form_id_forms', 
    //   references: {
    //     table: 'forms',
    //     field: 'id',
    //   },
    //   onDelete: 'no action',
    //   onUpdate: 'no action',
    // }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('form_input');
  }
};
