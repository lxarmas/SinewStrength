import React, { useEffect, useState } from 'react';
import { logSetProgress, logExerciseProgress } from './trainingProgramSlice';
import './TrainingSessionsTracker.css';
import trainingProgram from '../training programs/Intermediate/IntermediateTrainingProgram';

const TrainingSessionsTracker = () => {
//   const [trainingProgram, setTrainingProgram] = useState(null);
  const [modificationMode, setModificationMode] = useState(false);

  const testProgram = trainingProgram;

  const handleSetCompletion = (exerciseName, setNumber, weight, repetitions) => {
    // Perform set completion logic
    // Log the set progress
    logSetProgress(exerciseName, setNumber, weight, repetitions);
  };

  useEffect(() => {
    // Fetch exercise data

    // Provide actual values for exerciseName and totalSets
    const exerciseName = 'Example Exercise';
    const totalSets = 3;

    // Log the exercise progress
    logExerciseProgress(exerciseName, totalSets);
  }, []);

  return (
   <div className="training-sessions-tracker">
   {trainingProgram?.weeks.map((week, weekIndex) => (
     <div className="week-container" key={weekIndex}>
       <h5 className="week-title">Week {weekIndex + 1}</h5>
       <div className="table-container">
         <table className="training-table">
           <thead>
             <tr>
               <th>Day</th>
             </tr>
           </thead>
           <tbody>
             {week.days.map((day, dayIndex) => (
               <tr key={dayIndex}>
                 <td className="day-cell">{day.day}</td>
                 {day.exercises.map((exercise, exerciseIndex) => (
                   <React.Fragment key={exerciseIndex}>
                     <thead>
                        <tr>
                           <th>Exercise</th>
                           <th>Sets</th>
                           <th>Reps</th>
                           <th>Weight</th>
                        </tr>
                     </thead>
                     <tbody>
                     <td className="exercise-cell">{exercise.name}</td>
                     {exercise.sets.map((set, setIndex) => (
                        <td key={setIndex} className='set-cell'>{set.name}</td>
                     ))}
                     <td>
                        {exercise.sets.map((set, setIndex) => (
                           <td key={setIndex} className='rep-cell'>{set.reps}</td>
                        ))}
                     </td>

                     {[...Array(12)].map((_, i) => {
                       const set = exercise.sets.find((s) => s.name === `Set ${i + 1}`);
                       return (
                         <td key={i} className="set-cell">
                           {set && modificationMode ? (
                             <React.Fragment>
                                 <select
                                    className="input-box"
                                    defaultValue="completed"
                                 >
                                    <option value="completed">Completed</option>
                                    <option value="failed">Failed</option>
                                 </select>
                               <button
                                 className="button"
                                 onClick={() =>
                                   logSetProgress(weekIndex, dayIndex, exerciseIndex, i)
                                 }
                               >
                                 Log Set
                               </button>
                             </React.Fragment>
                           ) : (
                             set && (

                                 <span>{set.weight}</span>
                             )
                           )}
                         </td>
                       );
                     })}
                     </tbody>
                   </React.Fragment>
                 ))}
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   ))}

   <div className="modification-mode-container">
     <label className="modification-mode-label">
       Modification Mode:
       <input
         className="modification-mode-checkbox"
         type="checkbox"
         checked={modificationMode}
         onChange={() => setModificationMode(!modificationMode)}
       />
       <span className="modification-mode-checkbox-label">Enable Modification Mode</span>
     </label>
   </div>
 </div>
);
};

export default TrainingSessionsTracker;