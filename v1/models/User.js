const Sequelize = require('sequelize');
const sequelize = require('../../db/config');

const User = sequelize.define('users', {
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
  main_sys_id: {
    type: Sequelize.INTEGER
  },
  avatar: {
    type: Sequelize.STRING
  },
  in_service: {
    type: Sequelize.INTEGER
  },
  password: {
    type: Sequelize.STRING
  },
  created_by: {
    type: Sequelize.INTEGER,
  },
  deleted: {
    type: Sequelize.INTEGER
  },
},
  // {
  //     timestamps: true
  // }
)

Campaign.belongsTo(User, { foreignKey: 'campaign_manager'})

Campaign.belongsTo(User, { foreignKey: 'created_by'})

// User.hasMany(Campaign, {foreignKey: 'campaign_manager'})
bp_campaign.belongsTo(User, { foreignKey: 'aquisition_member_id' });
User.hasMany(bp_campaign, { foreignKey: 'aquisition_member_id' });
// User.hasMany(bp_campaign, { foreignKey: 'aquisition_member_id' }, {onDelete: 'CASCADE'});
module.exports = User;