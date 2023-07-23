import React, { useEffect, useState } from 'react';
import { archiveProgram, deleteProgram, fetchTrainingProgramAsync, logExerciseProgress, selectTrainingProgram } from './trainingProgramSlice';
import './TYP.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const customToastErrorStyle = {
   position: 'bottom-center',
   autoClose: false,
   hideProgressBar: true,
   closeOnClick: false,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   closeButton: false,
   className: 'custom-toast-error',
   toastClassName: 'custom-toast-error-message',
   bodyClassName: 'custom-toast-error-body',
   style: {
      background: '#660000',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '10px 14px',
      width: '700px',
      marginLeft: '-194px',
   },
};

const TrackYourProgress = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isLoggedIn = useSelector((state) => !!state.auth.me.id);
   const username = useSelector((state) => state.auth.me.username);
   const [isLoading, setIsLoading] = useState(true);
   const trainingProgram = useSelector(selectTrainingProgram);
   const [modificationMode, setModificationMode] = useState(false);
   const [selectedWeek, setSelectedWeek] = useState(0);
   const [hoveredExercises, setHoveredExercises] = useState({});
   const [isArchiving, setIsArchiving] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const [progress, setProgress] = useState(0);
   const [exercises, setExercises] = useState({});

   useEffect(() => {
      if(isLoggedIn) {
         dispatch(fetchTrainingProgramAsync(username));
         setTimeout(() => {
            setIsLoading(false);
         }, 1000);
      }else {
         setIsLoading(false)
      }
   }, [dispatch, username]);

   useEffect(() => {
      const initialExercises = {};

      if (trainingProgram.weeks) {
         trainingProgram.weeks.forEach((week, weekIndex) => {
            week.days.forEach((day, dayIndex) => {
               day.exercises.forEach((exercise, exerciseIndex) => {
               initialExercises[`${weekIndex}-${dayIndex}-${exerciseIndex}`] = exercise.completed;
               });
            });
         });
      }

      setExercises(initialExercises);
   }, [trainingProgram]);
   
   useEffect(() => {
      const completedExercises = Object.values(exercises).filter((exercise) => exercise);
      const progressPercentage = Math.floor((completedExercises.length / Object.keys(exercises).length) * 100);
      setProgress(progressPercentage);
   }, [exercises]);

   const handleExerciseCompletion = (trainingProgramId, weekIndex, dayIndex, exerciseIndex) => {
      dispatch(logExerciseProgress({ username, trainingProgramId, weekIndex, dayIndex, exerciseIndex }));
      handleMouseLeave(exerciseIndex);
   };

   const handleMouseEnter = (buttonIndex) => {
      setHoveredExercises((prevHoveredExercises) => ({
         ...prevHoveredExercises,
         [buttonIndex]: true,
      }));
   };

   const handleMouseLeave = (buttonIndex) => {
      setHoveredExercises((prevHoveredExercises) => ({
         ...prevHoveredExercises,
         [buttonIndex]: false,
      }));
   };

   const handleArchiveAndCreate = (trainingProgramId) => {
      setIsArchiving(true);
      setTimeout(() => {
         dispatch(archiveProgram({ username, trainingProgramId }));
         setIsArchiving(false);
         navigate('/start-your-training');
      }, 1500);
   };

   const handleProgramArchive = (trainingProgramId) => {
      toast.warn(({ closeToast }) => (
         <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px' }}>Are you sure you want to archive your program?</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
               <button onClick={() => {
                  setIsArchiving(true);
                  setTimeout(() => {
                     dispatch(archiveProgram({ username, trainingProgramId }));
                     setIsArchiving(false);
                  }, 1000);
                  closeToast();
               }}
               style={{
                  padding: '8px 16px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  borderRadius: '4px',
                  backgroundColor: 'white',
               }}
               >
                  Confirm
               </button>
               <button onClick={() => {
                  closeToast();
               }}
               style={{
                  padding: '8px 16px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  borderRadius: '4px',
                  backgroundColor: 'white',
               }}
               >
                  Cancel
               </button>
            </div>
         </div>
      ), customToastErrorStyle);
   };

   const handleProgramDelete = (trainingProgramId) => {
      toast.warn(({ closeToast }) => (
         <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px' }}>Are you sure you want to delete your program?</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
               <button onClick={() => {
                  setIsDeleting(true);
                  setTimeout(() => {
                     dispatch(deleteProgram({ username, trainingProgramId }));
                     setIsDeleting(false);
                  }, 1000);
                  closeToast();
               }}
               style={{
                  padding: '8px 16px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  borderRadius: '4px',
                  backgroundColor: 'white',
               }}
               >
                  Confirm
               </button>
               <button onClick={() => {
                  closeToast();
               }}
               style={{
                  padding: '8px 16px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  borderRadius: '4px',
                  backgroundColor: 'white',
               }}
               >
                  Cancel
               </button>
            </div>
         </div>
      ), customToastErrorStyle);
   };

   if (!isLoggedIn && !isLoading && !username) {
      return (
         <div className="training-sessions-tracker">
            <p style={{ fontSize: '26px', color: 'red', textAlign: 'center', fontWeight: 'bold', margin: '0', marginTop: '-8px', paddingBottom: '43px' }}>
               You Must Be Logged In To Access This Feature
            </p>
         </div>
      );
   };

   if (isLoading) {
      return (
         <div className="training-sessions-tracker">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
               <h1>Loading Your Program...</h1>
            </div>
         </div>
      );
   };

   if (!isLoading && !trainingProgram || !trainingProgram.weeks) {
      return (
         <div className="training-sessions-tracker">
            <p style={{ fontSize: '26px', color: 'red', textAlign: 'center', fontWeight: 'bold', margin: '0', marginTop: '-8px', paddingBottom: '43px'}}>
               You Don't Have An Active Training Program
            </p>
         </div>
      );
   };

   let completedProgramStatus = '';
   if (trainingProgram.completed) {
      completedProgramStatus = 'completedStatus-';
   }

   return (
      <div className="progress-bar-container">
      <div className={`${completedProgramStatus}training-sessions-tracker`}>
         {trainingProgram.completed && (
            <div className='program-complete'>
               <h1 style={{ fontSize: '40px', textAlign: 'center',fontFamily: `palatino  bold `}}>
                  PROGRAM COMPLETE!
               </h1>
               {/* <img src={logo} alt='logo' className="TYPlogo" /> */}
               {/* <p style={{ fontSize: '22px',marginBottom: '30px', textAlign: 'center',color: 'white', }}>
                  *You can archive this program and start a new one!*
               </p> */}
            </div>
         )}
         {/* {trainingProgram.weeks && trainingProgram.weeks[selectedWeek].completed && !trainingProgram.completed && (
            <h1 style={{ fontSize: '22px', textAlign: 'center',color: '#12b900'}}>
               Training Week Complete!
            </h1>
         )} */}
         {trainingProgram.weeks && trainingProgram.weeks[selectedWeek].completed ? (
            <>
               {/* Week Selector */}
               <div className='completedStatus-week-selector'>
                  <label htmlFor="week-selector"><h2>Select Week:</h2></label>
                  <select
                     id="week-selector"
                     value={selectedWeek}
                     onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
                  >
                     {trainingProgram.weeks && trainingProgram.weeks.map((week, index) => (
                        <option key={index} value={index}>
                           Week {index + 1}
                        </option>
                     ))}
                  </select>
               </div>
               {/* WEEK COMPLETE -Display content for the selected week */}
               <div className='completedStatus-week-container'>
                  <h1 className='completedStatus-week-title'>WEEK {selectedWeek + 1}</h1>
                  {trainingProgram.weeks[selectedWeek].days.map((day, dayIndex) => (
                     <div className="day-container" key={dayIndex}>
                        <h3 className="completedStatus-day-title">{day.day}</h3>
                        <div className="modification-mode-container">
                           <label className="modification-mode-label">
                              <input
                                 className="modification-mode-checkbox"
                                 type="checkbox"
                                 checked={modificationMode}
                                 onChange={() => setModificationMode(!modificationMode)}
                              />
                              <span className="completedStatus-modification-mode-checkbox-label">Enable Modification Mode</span>
                           </label>
                        </div>
                        <div className="completedStatus-exercises-container">
                           {day.exercises.map((exercise, exerciseIndex) => (
                              <div className="completedStatus-exercise-container" key={exerciseIndex}>
                                 <h4 className="completedStatus-exercise-title">{exercise.name}</h4>
                                 {modificationMode && exercise.completed && (
                                    <button
                                       className="completedStatus-button"
                                       onClick={() =>
                                          handleExerciseCompletion(trainingProgram.id, selectedWeek, dayIndex, exerciseIndex)
                                       }
                                       onMouseEnter={() => handleMouseEnter(`${dayIndex} + ${exerciseIndex}`)}
                                       onMouseLeave={() => handleMouseLeave(`${dayIndex} + ${exerciseIndex}`)}
                                    >
                                       {hoveredExercises[`${dayIndex} + ${exerciseIndex}`] ? 'Incomplete' : 'Completed'}
                                    </button>
                                 )}
                                 <table className="completedStatus-exercise-table">
                                    <thead>
                                       <tr>
                                          <th>Sets</th>
                                          <th>Reps</th>
                                          <th>Weight</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {exercise.sets.map((set, setIndex) => (
                                          <tr key={setIndex}>
                                             <td>{set.name}</td>
                                             <td>{set.reps}</td>
                                             <td>{set.weight}</td>
                                          </tr>
                                       ))}
                                    </tbody>
                                 </table>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </>
         ) : (
            <>
               {/* Week Selector */}
               <div className='week-selector'>
                  <label htmlFor="week-selector"><h2>Select Week:</h2></label>
                  <select
                     id="week-selector"
                     value={selectedWeek}
                     onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
                  >
                     {trainingProgram.weeks && trainingProgram.weeks.map((week, index) => (
                        <option key={index} value={index}>
                           Week {index + 1}
                        </option>
                     ))}
                  </select>
               </div>
               {/* WEEK NOT COMPLETE - Display content for the selected week */}
               <div className='week-container'>
                  <h1 className='week-title'>WEEK {selectedWeek + 1}</h1>
                  {trainingProgram.weeks && trainingProgram.weeks[selectedWeek].days.map((day, dayIndex) => (
                     <div className="day-container" key={dayIndex}>
                        {day.completed ? (
                           <>
                              <h3 className="completedStatus-day-title">{day.day}</h3>
                              <div className="modification-mode-container">
                                 <label className="modification-mode-label">
                                    <input
                                       className="modification-mode-checkbox"
                                       type="checkbox"
                                       checked={modificationMode}
                                       onChange={() => setModificationMode(!modificationMode)}
                                    />
                                    <span className="completedStatus-modification-mode-checkbox-label">Enable Modification Mode</span>
                                 </label>
                              </div>
                              <div className="completedStatus-exercises-container">
                                 {day.exercises.map((exercise, exerciseIndex) => (
                                    <div className="completedStatus-exercise-container" key={exerciseIndex}>
                                       <h4 className="completedStatus-exercise-title">{exercise.name}</h4>
                                       {modificationMode && exercise.completed &&  (
                                          <button
                                             className="completedStatus-button"
                                             onClick={() =>
                                                handleExerciseCompletion(trainingProgram.id, selectedWeek, dayIndex, exerciseIndex)
                                             }
                                             onMouseEnter={() => handleMouseEnter(`${dayIndex} + ${exerciseIndex}`)}
                                             onMouseLeave={() => handleMouseLeave(`${dayIndex} + ${exerciseIndex}`)}
                                          >
                                             {hoveredExercises[`${dayIndex} + ${exerciseIndex}`] ? 'Incomplete' : 'Completed'}
                                          </button>
                                       )}
                                       <table className="completedStatus-exercise-table">
                                          <thead>
                                             <tr>
                                                <th>Sets</th>
                                                <th>Reps</th>
                                                <th>Weight</th>
                                             </tr>
                                          </thead>
                                          <tbody>
                                             {exercise.sets.map((set, setIndex) => (
                                                <tr key={setIndex}>
                                                   <td>{set.name}</td>
                                                   <td>{set.reps}</td>
                                                   <td>{set.weight}</td>
                                                </tr>
                                             ))}
                                          </tbody>
                                       </table>
                                    </div>
                                 ))}
                              </div>
                           </>
                        ) : (
                           <>
                              <h3 className="day-title">{day.day}</h3>
                              <div className="modification-mode-container">
                                 <label className="modification-mode-label">
                                    <input
                                       className="modification-mode-checkbox"
                                       type="checkbox"
                                       checked={modificationMode}
                                       onChange={() => setModificationMode(!modificationMode)}
                                    />
                                    <span className="modification-mode-checkbox-label">Enable Modification Mode</span>
                                 </label>
                              </div>
                              <div className="exercises-container">
                                 {day.exercises.map((exercise, exerciseIndex) => (
                                    <React.Fragment key={exerciseIndex}>
                                       {exercise.completed ? (
                                          <div className="completedStatus-exercise-container" key={exerciseIndex}>
                                             <h4 className="completedStatus-exercise-title">{exercise.name}</h4>
                                             {modificationMode && exercise.completed && (
                                                <button
                                                   className="completedStatus-button"
                                                   onClick={() =>
                                                      handleExerciseCompletion(trainingProgram.id, selectedWeek, dayIndex, exerciseIndex)
                                                   }
                                                   onMouseEnter={() => handleMouseEnter(`${dayIndex} + ${exerciseIndex}`)}
                                                   onMouseLeave={() => handleMouseLeave(`${dayIndex} + ${exerciseIndex}`)}
                                                >
                                                   {hoveredExercises[`${dayIndex} + ${exerciseIndex}`] ? 'Incomplete' : 'Completed'}
                                                </button>
                                             )}
                                             <table className="completedStatus-exercise-table">
                                                <thead>
                                                   <tr>
                                                      <th>Sets</th>
                                                      <th>Reps</th>
                                                      <th>Weight</th>
                                                   </tr>
                                                </thead>
                                                <tbody>
                                                   {exercise.sets.map((set, setIndex) => (
                                                      <tr key={setIndex}>
                                                         <td>{set.name}</td>
                                                         <td>{set.reps}</td>
                                                         <td>{set.weight}</td>
                                                      </tr>
                                                   ))}
                                                </tbody>
                                             </table>
                                          </div>
                                       ) : (
                                          <div className="exercise-container" key={exerciseIndex}>
                                             <h4 className="exercise-title">{exercise.name}</h4>
                                             {modificationMode && (
                                                <button
                                                   className="button"
                                                   onClick={() =>
                                                      handleExerciseCompletion(trainingProgram.id, selectedWeek, dayIndex, exerciseIndex)
                                                   }
                                                   onMouseEnter={() => handleMouseEnter(`${dayIndex} + ${exerciseIndex}`)}
                                                   onMouseLeave={() => handleMouseLeave(`${dayIndex} + ${exerciseIndex}`)}
                                                >
                                                   Complete Exercise
                                                </button>
                                             )}
                                             <table className="exercise-table">
                                                <thead>
                                                   <tr>
                                                      <th>Sets</th>
                                                      <th>Reps</th>
                                                      <th>Weight</th>
                                                   </tr>
                                                </thead>
                                                <tbody>
                                                   {exercise.sets.map((set, setIndex) => (
                                                      <tr key={setIndex}>
                                                         <td>{set.name}</td>
                                                         <td>{set.reps}</td>
                                                         <td>{set.weight}</td>
                                                      </tr>
                                                   ))}
                                                </tbody>
                                             </table>
                                          </div>
                                       )}
                                    </React.Fragment>
                                 ))}
                              </div>
                           </>
                        )}
                     </div>
                  ))}
               </div>
            </>
         )}
         <div className='bottom-buttons'>
            {trainingProgram.completed ? (
               <button
                  className="complete-archive-button"
                  onClick={() =>
                     handleArchiveAndCreate(trainingProgram.id)
                  }
               >
                  {isArchiving ? (
                     'Archiving...'
                  ) : (
                     'Archive & Create New'
                  )}
               </button>
            ) : (
               <button
                  className="archive-button"
                  onClick={() =>
                     handleProgramArchive(trainingProgram.id)
                  }
               >
                  {isArchiving ? (
                     'Archiving...'
                  ) : (
                     'Archive Program'
                  )}
               </button>
            )}
            <button
               className="delete-button"
               onClick={() =>
                  handleProgramDelete(trainingProgram.id)
               }
            >
               {isDeleting ? (
                  'Deleting...'
               ) : (
                  'Delete Program'
               )}
            </button>
            
         </div>
         <ToastContainer />
         <footer className="sticky-footer">
            <div className="custom-progress-bar">
               <div className="progress-bar" style={{ width: `${progress}%` }}>
                  <div className="progress-bar-percentage">{`${progress}%`}</div>
               </div>
            </div>
         </footer>
         </div>
         
      </div>
   );
};

export default TrackYourProgress;