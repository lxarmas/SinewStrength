const {db, models: {User, Training_programs} } = require('../server/db')



/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
   await db.sync({ force: true }) // clears db and matches models to tables
   console.log('db synced!')

   // Creating Users
   const users = await Promise.all([
      User.create({ username: 'cody', password: '123' }),
      User.create({ username: 'murphy', password: '123' }),
      User.create({ username: 'admin', password: 'admin', isAdmin: true }),
   ])

   // Seed data for Training Program model
   const training_programs = await Promise.all([
      Training_programs.create({
         name: 'Intermediate Training Program',
         description: 'A 12-week strength training program',
         weeks: [
            // Week 1
            {
               number: 1,
               days: [
                  // Monday
                  {
                     day: 'Monday',
                     exercises: [
                        // Exercise: Squat
                        {
                           name: 'Squat',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 55,
                              },
                           ],
                        },
                        // Exercise: Bench
                        {
                           name: 'Bench',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 55,
                              },
                           ],
                        },
                        // Exercise: Row
                        {
                           name: 'Row',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 55,
                              },
                           ],
                        },
                     ],
                  },
                  // Wednesday
                  {
                     day: 'Wednesday',
                     exercises: [
                        // Exercise: Squat
                        {
                           name: 'Squat',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                           ],
                        },
                        // Exercise: Press
                        {
                           name: 'Press',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                           ],
                        },
                        // Exercise: Deadlift
                        {
                           name: 'Deadlift',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                           ],
                        },
                     ],
                  },
                  // Friday
                  {
                     day: 'Friday',
                     exercises: [
                        // Exercise: Squat
                        {
                           name: 'Squat',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 3,
                                 weight: 55,
                              },
                              {
                                 name: 'Set 6',
                                 reps: 8,
                                 weight: 55,
                              },
                           ],
                        },
                        // Exercise: Bench
                        {
                           name: 'Bench',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 3,
                                 weight: 55,
                              },
                           ],
                        },
                        // Exercise: Row
                        {
                           name: 'Row',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 55,
                              },
                           ],
                        },
                     ],
                  },
               ],
            },
            {
               number: 2,
               days: [
                  // Monday
                  {
                     day: 'Monday',
                     exercises: [
                        // Exercise: Squat
                        {
                           name: 'Squat',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 65,
                              },
                           ],
                        },
                        // Exercise: Bench
                        {
                           name: 'Bench',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 65,
                              },
                           ],
                        },
                        // Exercise: Row
                        {
                           name: 'Row',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 65,
                              },
                           ],
                        },
                     ],
                  },
                  // Wednesday
                  {
                     day: 'Wednesday',
                     exercises: [
                        // Exercise: Squat
                        {
                           name: 'Squat',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 60,
                              },
                           ],
                        },
                        // Exercise: Press
                        {
                           name: 'Press',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 60,
                              },
                           ],
                        },
                        // Exercise: Deadlift
                        {
                           name: 'Deadlift',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 60,
                              },
                           ],
                        },
                     ],
                  },
                  // Friday
                  {
                     day: 'Friday',
                     exercises: [
                        // Exercise: Squat
                        {
                           name: 'Squat',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 60,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 3,
                                 weight: 65,
                              },
                              {
                                 name: 'Set 6',
                                 reps: 8,
                                 weight: 65,
                              },
                           ],
                        },
                        // Exercise: Bench
                        {
                           name: 'Bench',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 3,
                                 weight: 55,
                              },
                           ],
                        },
                        // Exercise: Row
                        {
                           name: 'Row',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 55,
                              },
                           ],
                        },
                     ],
                  },
               ],
            },
            {
               number: 3,
               days: [
                  // Monday
                  {
                     day: 'Monday',
                     exercises: [
                        // Exercise: Squat
                        {
                           name: 'Squat',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 75,
                              },
                           ],
                        },
                        // Exercise: Bench
                        {
                           name: 'Bench',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 75,
                              },
                           ],
                        },
                        // Exercise: Row
                        {
                           name: 'Row',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 75,
                              },
                           ],
                        },
                     ],
                  },
                  // Wednesday
                  {
                     day: 'Wednesday',
                     exercises: [
                        // Exercise: Squat
                        {
                           name: 'Squat',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 70,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                           ],
                        },
                        // Exercise: Press
                        {
                           name: 'Press',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                           ],
                        },
                        // Exercise: Deadlift
                        {
                           name: 'Deadlift',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                           ],
                        },
                     ],
                  },
                  // Friday
                  {
                     day: 'Friday',
                     exercises: [
                        // Exercise: Squat
                        {
                           name: 'Squat',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 3,
                                 weight: 55,
                              },
                              {
                                 name: 'Set 6',
                                 reps: 8,
                                 weight: 55,
                              },
                           ],
                        },
                        // Exercise: Bench
                        {
                           name: 'Bench',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 3,
                                 weight: 55,
                              },
                           ],
                        },
                        // Exercise: Row
                        {
                           name: 'Row',
                           sets: [
                              {
                                 name: 'Set 1',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 2',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 3',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 4',
                                 reps: 5,
                                 weight: 50,
                              },
                              {
                                 name: 'Set 5',
                                 reps: 5,
                                 weight: 55,
                              },
                           ],
                        },
                     ],
                  },
               ],
            },
            // Add more weeks
         ],
         userId: 1,
      }),
   ]);

   console.log(`seeded ${users.length} users`)
   console.log(`seeded ${training_programs.length} training programs`)
   console.log(`seeded successfully`)
   return {
      users: {
         cody: users[0],
         murphy: users[1]
      }
   }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
   console.log('seeding...')
   try {
      await seed()
   } catch (err) {
      console.error(err)
      process.exitCode = 1
   } finally {
      console.log('closing db connection')
      await db.close()
      console.log('db connection closed')
   }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
   runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
