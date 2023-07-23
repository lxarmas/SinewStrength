const Sequelize = require('sequelize');
const db = require('../db');

const Training_programs = db.define('training_programs', {
   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   description: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   weeks: {
      type: Sequelize.ARRAY(
         Sequelize.JSONB({
            number: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
            days: {
               type: Sequelize.ARRAY(
                  Sequelize.JSONB({
                     day: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        validate: {
                           isIn: [['Monday', 'Wednesday', 'Friday']],
                        },
                     },
                     exercises: {
                        type: Sequelize.ARRAY(
                           Sequelize.JSONB({
                              name: {
                                 type: Sequelize.STRING,
                                 allowNull: false,
                                 validate: {
                                    isIn: [['Squat', 'Bench', 'Row', 'Press', 'Deadlift']],
                                 },
                              },
                              sets: {
                                 type: Sequelize.ARRAY(
                                    Sequelize.JSONB({
                                       name: {
                                          type: Sequelize.STRING,
                                          allowNull: false,
                                          validate: {
                                             isIn: [['Set 1', 'Set 2', 'Set 3', 'Set 4', 'Set 5', 'Set 6']],
                                          },
                                       },
                                       reps: {
                                          type: Sequelize.INTEGER,
                                          allowNull: false,
                                       },
                                       weight: {
                                          type: Sequelize.INTEGER,
                                          allowNull: false,
                                       },
                                    })
                                 ),
                              },
                              completed: {
                                 type: Sequelize.BOOLEAN,
                                 defaultValue: false,
                              },
                           })
                        ),
                     },
                     completed: {
                        type: Sequelize.BOOLEAN,
                        defaultValue: false,
                     },
                  })
               ),
            },
            completed: {
               type: Sequelize.BOOLEAN,
               defaultValue: false,
            },
         })
      ),
   },
   completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
   },
   active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
   },
});

module.exports = Training_programs;