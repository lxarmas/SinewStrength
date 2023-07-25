// Intermediate Training Program
const IntermediateTrainingProgram = {
   // Program contains 'name', 'description' and an array of 'weeks'
   name: 'Intermediate Training Program',
   description: 'A 12-week strength training program',
   weeks: Array(12).fill().map((_, weekIndex) => ({
      number: weekIndex + 1,
      // Weeks array contains an array of 'days'
      days: [ // Days array contains objects
         {  // Each contains 'day', and an array of 'exercises'
            day: 'Monday',
            exercises: [
               // Exercises array contains objects
               { // Each contains 'name', and array of 'sets'
                  name: 'Squat',
                  sets: [ // Sets array contains objects
                     // { //Each contains 'name', 'reps', and 'weight'
                     //    name: '',
                     //    reps: 0,
                     //    weight: 0,
                     // }
                  ],
               },
               { name: 'Bench', sets: [] },
               { name: 'Row', sets: [] },
            ],
            maxes: {
               squat: 0,
               bench: 0,
               row: 0,
            }
         },
         {
            day: 'Wednesday',
            exercises: [
               { name: 'Squat', sets: [] },
               { name: 'Press', sets: [] },
               { name: 'Deadlift', sets: [] },
            ],
            maxes: {
               press: 0,
               deadlift: 0,
            }
         },
         {
            day: 'Friday',
            exercises: [
               { name: 'Squat', sets: [] },
               { name: 'Bench', sets: [] },
               { name: 'Row', sets: [] },
            ],
         },
      ],
   })),
};

// Intermediate Training Program formulas
const intermediateFormulas = {
   // Function to calculate 1RM for a given exercise
   calculate1RM: (maxWeight, reps) => {
      return maxWeight / (1.0278 - (0.0278 * reps));
   },

   // Function to calculate 5RM based on 1RM
   calculate5RM: (OneRM) => {
      return OneRM * (1.0278 - (0.0278 * 5));
   },

   // Function to calculate starting weight for an exercise
   calculateStartingWeight: (FiveRM, barbell, smallestPlates, prWeek) => {
      const exponent = prWeek - 2;
      const base = 1 / 1.025;
      return Math.round(((FiveRM - barbell) * Math.pow(base, exponent)) / (2 * smallestPlates)) * (2 * smallestPlates) + barbell;
   },

   // Function to calculate weight for a set
   calculateWeight: (exerciseName, firstSetPercent, setName, weekIndex, startingWeightOrTopSetWeight, bb, sP, dayName) => {
      // const setName = set.name;
      const exName = exerciseName;
      const currentWeek = weekIndex + 1;
      const previousWeek = currentWeek - 1;
      const topSetWeight = startingWeightOrTopSetWeight;

      // Special case exercise formulas
      if (exName === 'Press' || exName === 'Deadlift') {
         const startWeight = startingWeightOrTopSetWeight;
         if (setName === 'Set 1') {
            return Math.round(((topSetWeight * firstSetPercent) - bb) / (2 * sP)) * (2 * sP) + bb;
         } else if (setName === 'Set 2') {
            return Math.round(((topSetWeight * (((1 - firstSetPercent) / 3) + firstSetPercent)) - bb) / (2 * sP)) * (2 * sP) + bb;
         } else if (setName === 'Set 3') {
            return Math.round(((topSetWeight * (((1 - firstSetPercent) / 3) * 2 + firstSetPercent)) - bb) / (2 * sP)) * (2 * sP) + bb;
         } else if (setName === 'Set 4') { // Applies to weeks 2-12 // Value for week-1/Set-4 is 'startingWeight', which is added in program population
            return Math.round(((startWeight * Math.pow(1.025, previousWeek)) - bb) / (2 * sP)) * (2 * sP) + bb;
         }
      }

      // Formula structure that applies to most
      if (setName === 'Set 1') {
         return Math.round(((topSetWeight * (firstSetPercent)) - bb) / (2 * sP)) * (2 * sP) + bb;
      } else if (setName === 'Set 2') {
         return Math.round(((topSetWeight * (((1 - firstSetPercent) / 4) + firstSetPercent)) - bb) / (2 * sP)) * (2 * sP) + bb;
      } else if (setName === 'Set 3') {
         return Math.round(((topSetWeight * (((1 - firstSetPercent) / 4) * 2 + firstSetPercent)) - bb) / (2 * sP)) * (2 * sP) + bb;
      } else if (setName === 'Set 4') {
         return Math.round(((topSetWeight * (((1 - firstSetPercent) / 4) * 3 + firstSetPercent)) - bb) / (2 * sP)) * (2 * sP) + bb;
      }

      // Special case formulas
      if (dayName === 'Friday') {
         // Friday-Set 5
         const startWeight = startingWeightOrTopSetWeight;

         if (setName === 'Set 5') {
            return Math.round(((startWeight * Math.pow(1.025, currentWeek)) - bb) / (2 * sP)) * (2 * sP) + bb;
         }

      } else {
         // Monday-Set 5 
         const startWeight = startingWeightOrTopSetWeight;

         if (setName === 'Set 5') {
            return Math.round(((startWeight * Math.pow(1.025, previousWeek)) - bb) / (2 * sP)) * (2 * sP) + bb;
         }

      }

      // Default case: Return 0 if no formula is matched
      return 0;
   },
};

// Function to generate the Intermediate Training Program
const generateIntermediateTrainingProgram = (
   // squatMaxWeight, benchMaxWeight, rowMaxWeight, pressMaxWeight, deadliftMaxWeight,
   // squatReps, benchReps, rowReps, pressReps, deadliftReps,
   // squatFirstSetPercent, benchFirstSetPercent, rowFirstSetPercent, pressFirstSetPercent, deadliftFirstSetPercent,
   // barbell, smallestPlates, prWeek,

   // Shortcut values
   sMW, bMW, rMW, pMW, dMW,
   sR, bR, rR, pR, dR,
   sFSP, bFSP, rFSP, pFSP, dFSP,
   bb, sP, prW
) => {

   // Calculate 1RM for each exercise
   const squatMax = intermediateFormulas.calculate1RM(sMW, sR);
   const benchMax = intermediateFormulas.calculate1RM(bMW, bR);
   const rowMax = intermediateFormulas.calculate1RM(rMW, rR);
   const pressMax = intermediateFormulas.calculate1RM(pMW, pR);
   const deadliftMax = intermediateFormulas.calculate1RM(dMW, dR);

   // Calculate 5RM for each exercise
   const squatMax5 = intermediateFormulas.calculate5RM(squatMax);
   const benchMax5 = intermediateFormulas.calculate5RM(benchMax);
   const rowMax5 = intermediateFormulas.calculate5RM(rowMax);
   const pressMax5 = intermediateFormulas.calculate5RM(pressMax);
   const deadliftMax5 = intermediateFormulas.calculate5RM(deadliftMax);

   // Calculate starting weight for each exercise
   const squatStartingWeight = intermediateFormulas.calculateStartingWeight(squatMax5, bb, sP, prW);
   const benchStartingWeight = intermediateFormulas.calculateStartingWeight(benchMax5, bb, sP, prW);
   const rowStartingWeight = intermediateFormulas.calculateStartingWeight(rowMax5, bb, sP, prW);
   const pressStartingWeight = intermediateFormulas.calculateStartingWeight(pressMax5, bb, sP, prW);
   const deadliftStartingWeight = intermediateFormulas.calculateStartingWeight(deadliftMax5, bb, sP, prW);

   // Initialize the training program
   const program = IntermediateTrainingProgram;

   // Populate the sets for each exercise in the program
   program.weeks.forEach((week, weekIndex) => {
      week.days.forEach((day) => {
         day.exercises.forEach((exercise) => {
            const dayName = day.day;
            const exerciseName = exercise.name;
            const sets = exercise.sets;

            // Clear sets to prevent duplication
            sets.length = 0;

            // SQUAT
            if (exerciseName === 'Squat') {
               sets.push({ name: 'Set 1', reps: 5, weight: 0 });
               sets.push({ name: 'Set 2', reps: 5, weight: 0 });
               sets.push({ name: 'Set 3', reps: 5, weight: 0 });
               sets.push({ name: 'Set 4', reps: 5, weight: 0 });
               if (dayName === 'Monday') {
                  sets.push({ name: 'Set 5', reps: 5, weight: 0 });
               } else if (dayName === 'Friday') {
                  sets.push({ name: 'Set 5', reps: 3, weight: 0 });
                  sets.push({ name: 'Set 6', reps: 8, weight: 0 });
               }

               // Week 1
               if (weekIndex === 0) {
                  // SET 5
                  if (dayName === 'Monday') {
                     sets[4].weight = squatStartingWeight;
                  } else if (dayName === 'Friday') {
                     sets[4].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[4].name, weekIndex, squatStartingWeight, bb, sP, dayName);
                  }
                  

                  // SETS 1-3
                  sets[0].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[0].name, weekIndex, squatStartingWeight, bb, sP, dayName);
                  sets[1].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[1].name, weekIndex, squatStartingWeight, bb, sP, dayName);
                  sets[2].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[2].name, weekIndex, squatStartingWeight, bb, sP, dayName);

                  // SET 4
                  if (dayName === 'Wednesday') {
                     // Wednesday
                     sets[3].weight = sets[2].weight;
                  } else {
                     // Other days
                     sets[3].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[3].name, weekIndex, squatStartingWeight, bb, sP, dayName);
                  }

               // Weeks 2-12
               } else {
                  const squatTopSetMonday = intermediateFormulas.calculateWeight(exerciseName, sFSP, 'Set 5', weekIndex, squatStartingWeight, bb, sP, 'Monday');

                  // SET 5
                  if (sets[4]) {
                     sets[4].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[4].name, weekIndex, squatStartingWeight, bb, sP, dayName);
                  }

                  // SETS 1-3
                  sets[0].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[0].name, weekIndex, squatTopSetMonday, bb, sP, dayName);
                  sets[1].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[1].name, weekIndex, squatTopSetMonday, bb, sP, dayName);
                  sets[2].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[2].name, weekIndex, squatTopSetMonday, bb, sP, dayName);

                  // SET 4
                  if (dayName === 'Wednesday') {
                     // Wednesday
                     sets[3].weight = sets[2].weight;
                  } else {
                     // Other days
                     sets[3].weight = intermediateFormulas.calculateWeight(exerciseName, sFSP, sets[3].name, weekIndex, squatTopSetMonday, bb, sP, dayName);
                  }
               }

               // SET 6 for Fridays
               if (dayName === 'Friday') {
                  sets[5].weight = sets[2].weight;
               }

            // BENCH
            } else if (exerciseName === 'Bench') {
               sets.push({ name: 'Set 1', reps: 5, weight: 0 });
               sets.push({ name: 'Set 2', reps: 5, weight: 0 });
               sets.push({ name: 'Set 3', reps: 5, weight: 0 });
               sets.push({ name: 'Set 4', reps: 5, weight: 0 });
               if (dayName === 'Monday') {
                  sets.push({ name: 'Set 5', reps: 5, weight: 0 });
               } else if (dayName === 'Friday') {
                  sets.push({ name: 'Set 5', reps: 3, weight: 0 });
                  sets.push({ name: 'Set 6', reps: 8, weight: 0 });
               }

               // SET 5
               if (weekIndex === 0 && dayName === 'Monday') {
                  // Week 1 - Monday
                  sets[4].weight = benchStartingWeight;
               } else {
                  // All Weeks for Friday && Weeks 2-12 for Monday
                  sets[4].weight = intermediateFormulas.calculateWeight(exerciseName, bFSP, sets[4].name, weekIndex, benchStartingWeight, bb, sP, dayName);
               }

               // SETS 1-4  //  Applies to all Bench days
               let benchTopSetMonday = 0;
               if (weekIndex === 0){
                  benchTopSetMonday = benchStartingWeight;
               } else {
                  benchTopSetMonday = intermediateFormulas.calculateWeight(exerciseName, bFSP, 'Set 5', weekIndex, benchStartingWeight, bb, sP, 'Monday');
               }

               const benchTopSet = benchTopSetMonday;
               sets[0].weight = intermediateFormulas.calculateWeight(exerciseName, bFSP, sets[0].name, weekIndex, benchTopSet, bb, sP, dayName);
               sets[1].weight = intermediateFormulas.calculateWeight(exerciseName, bFSP, sets[1].name, weekIndex, benchTopSet, bb, sP, dayName);
               sets[2].weight = intermediateFormulas.calculateWeight(exerciseName, bFSP, sets[2].name, weekIndex, benchTopSet, bb, sP, dayName);
               sets[3].weight = intermediateFormulas.calculateWeight(exerciseName, bFSP, sets[3].name, weekIndex, benchTopSet, bb, sP, dayName);

               // SET 6 for Fridays
               if (dayName === 'Friday') {
                  sets[5].weight = sets[2].weight;
               }

            // ROW
            } else if (exerciseName === 'Row') {
               sets.push({ name: 'Set 1', reps: 5, weight: 0 });
               sets.push({ name: 'Set 2', reps: 5, weight: 0 });
               sets.push({ name: 'Set 3', reps: 5, weight: 0 });
               sets.push({ name: 'Set 4', reps: 5, weight: 0 });
               if (dayName === 'Monday') {
                  sets.push({ name: 'Set 5', reps: 5, weight: 0 });
               } else if (dayName === 'Friday') {
                  sets.push({ name: 'Set 5', reps: 3, weight: 0 });
                  sets.push({ name: 'Set 6', reps: 8, weight: 0 });
               }

               // SET 5
               if (weekIndex === 0 && dayName === 'Monday') {
                  // Week 1 - Monday
                  sets[4].weight = rowStartingWeight;
               } else {
                  // All Weeks for Friday && Weeks 2-12 for Monday
                  sets[4].weight = intermediateFormulas.calculateWeight(exerciseName, rFSP, sets[4].name, weekIndex, rowStartingWeight, bb, sP, dayName);
               }

               // SETS 1-4  //  Applies to all Row days
               let rowTopSetMonday = 0;
               if (weekIndex === 0){
                  rowTopSetMonday = rowStartingWeight;
               } else {
                  rowTopSetMonday = intermediateFormulas.calculateWeight(exerciseName, rFSP, 'Set 5', weekIndex, rowStartingWeight, bb, sP, 'Monday');
               }

               const rowTopSet = rowTopSetMonday;
               sets[0].weight = intermediateFormulas.calculateWeight(exerciseName, rFSP, sets[0].name, weekIndex, rowTopSet, bb, sP, dayName);
               sets[1].weight = intermediateFormulas.calculateWeight(exerciseName, rFSP, sets[1].name, weekIndex, rowTopSet, bb, sP, dayName);
               sets[2].weight = intermediateFormulas.calculateWeight(exerciseName, rFSP, sets[2].name, weekIndex, rowTopSet, bb, sP, dayName);
               sets[3].weight = intermediateFormulas.calculateWeight(exerciseName, rFSP, sets[3].name, weekIndex, rowTopSet, bb, sP, dayName);

               // SET 6 for Fridays
               if (dayName === 'Friday') {
                  sets[5].weight = sets[2].weight;
               }

            // PRESS
            } else if (exerciseName === 'Press') {
               sets.push({ name: 'Set 1', reps: 5, weight: 0 });
               sets.push({ name: 'Set 2', reps: 5, weight: 0 });
               sets.push({ name: 'Set 3', reps: 5, weight: 0 });
               sets.push({ name: 'Set 4', reps: 5, weight: 0 });

               // SET 4
               if (weekIndex === 0) {
                  sets[3].weight = pressStartingWeight;
               } else {
                  sets[3].weight = intermediateFormulas.calculateWeight(exerciseName, pFSP, sets[3].name, weekIndex, pressStartingWeight, bb, sP, dayName);
               }

               // SETS 1-3
               const pressTopSet = sets[3].weight;
               sets[2].weight = intermediateFormulas.calculateWeight(exerciseName, pFSP, sets[2].name, weekIndex, pressTopSet, bb, sP, dayName);
               sets[1].weight = intermediateFormulas.calculateWeight(exerciseName, pFSP, sets[1].name, weekIndex, pressTopSet, bb, sP, dayName);
               sets[0].weight = intermediateFormulas.calculateWeight(exerciseName, pFSP, sets[0].name, weekIndex, pressTopSet, bb, sP, dayName);

            // DEADLIFT
            } else if (exerciseName === 'Deadlift') {
               sets.push({ name: 'Set 1', reps: 5, weight: 0 });
               sets.push({ name: 'Set 2', reps: 5, weight: 0 });
               sets.push({ name: 'Set 3', reps: 5, weight: 0 });
               sets.push({ name: 'Set 4', reps: 5, weight: 0 });

               // SET 4
               if (weekIndex === 0) {
                  sets[3].weight = deadliftStartingWeight;
               } else {
                  sets[3].weight = intermediateFormulas.calculateWeight(exerciseName, dFSP, sets[3].name, weekIndex, deadliftStartingWeight, bb, sP, dayName);
               }

               // SETS 1-3
               const deadliftTopSet = sets[3].weight;
               sets[2].weight = intermediateFormulas.calculateWeight(exerciseName, dFSP, sets[2].name, weekIndex, deadliftTopSet, bb, sP, dayName);
               sets[1].weight = intermediateFormulas.calculateWeight(exerciseName, dFSP, sets[1].name, weekIndex, deadliftTopSet, bb, sP, dayName);
               sets[0].weight = intermediateFormulas.calculateWeight(exerciseName, dFSP, sets[0].name, weekIndex, deadliftTopSet, bb, sP, dayName);
            }

            // Maxes for each week

         });
      });
   });
   return program;
};

// Example usage
// const trainingProgram = generateIntermediateTrainingProgram(
//    500, 315, 225, 185, 600,
//    1, 1, 1, 1, 1,
//    .125, .125, .125, .125, .125,
//    2.5, 4
// );

// console.log(JSON.stringify(trainingProgram, null, 2))

export default generateIntermediateTrainingProgram;
