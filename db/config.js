require('dotenv').config();

const Sequelize = require ('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS,{
    dialect: 'postgres',
    // host: 'localhost',
    host: process.env.DB_HOST,
    port: 5432,
    // timezone: process.NODE_ENV === 'development' ? '+06:00' : '+02:00',
    dialectOptions: {
        // useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true,
        timezone: new Date().getTimezoneOffset()
    },
})

module.exports = sequelize;
