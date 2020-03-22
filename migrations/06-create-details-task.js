'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('detail_tasks', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            feedback: {
                type: Sequelize.STRING
            },

            phone_call_status: {
                type: Sequelize.STRING
            },

            reminder_date: {
                type: Sequelize.STRING,
            },

            customer_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "customers"
                    },
                    key: "id"
                },
                allowNull: false
            },

            task_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "tasks"
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
        return queryInterface.dropTable('detail_tasks');
    }
};
