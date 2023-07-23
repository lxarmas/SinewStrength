//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Training_programs = require('./models/Training_programs')
//associations could go here!

User.hasMany(Training_programs);
Training_programs.belongsTo(User);

module.exports = {
   db,
   models: {
      User,
      Training_programs,
   },
}
