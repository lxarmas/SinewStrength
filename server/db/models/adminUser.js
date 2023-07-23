const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('postgres://username:password@localhost:8080/strength-training-webapp');

class AdminUser extends Model {
   validPassword(password) {
      return bcrypt.compareSync(password, this.password);
   }
}

AdminUser.init({
   username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
         const hash = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
         this.setDataValue('password', hash);
      }
   },
}, 
{
   sequelize,
   modelName: 'AdminUser',
   hooks: {
      beforeCreate: async (user) => {
         if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
         }
      },
      beforeUpdate: async (user) => {
         if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
         }
      }
   },
});

sequelize.sync();

module.exports = AdminUser;