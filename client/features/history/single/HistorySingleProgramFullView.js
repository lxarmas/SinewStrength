import React, { useEffect, useState } from 'react';
import { fetchSingleProgramHistory, selectSingleProgram } from './singleProgramHistorySlice';
import './HSPFV.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const HistorySingleProgramFullView = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch();
   const { programId } = useParams();
   const isLoggedIn = useSelector((state) => !!state.auth.me.id);
   const username = useSelector((state) => state.auth.me.username);
   const [isLoading, setIsLoading] = useState(true);
   const pastProgram = useSelector(selectSingleProgram);
   const [selectedWeek, setSelectedWeek] = useState(0);

   useEffect(() => {
      if (programId) {
         dispatch(fetchSingleProgramHistory({ username, programId }));
      }
      setTimeout(() => {
         setIsLoading(false);
      }, 1000);
   }, [dispatch, username, programId]);

   const handleExitView = () => {
      navigate('/training-history');
   }

   if (!isLoggedIn && !isLoading) {
      return (
         <div className="single-training-history">
            <p style={{ fontSize: '22px', color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
               You Must Be Logged In To Access This Feature
            </p>
         </div>
      );
   };

   if (isLoading) {
      return (
         <div className="single-training-history">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
               <h1>Loading Your Program...</h1>
            </div>
         </div>
      );
   };

   if (!isLoading && !pastProgram || !pastProgram.weeks) {
      return (
         <div className="single-training-history">
            <p style={{ fontSize: '22px', color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
               Could Not Load The Program
            </p>
         </div>
      );
   };

   return (
      <div className={'single-training-history'}>
         <h1 className='single-program-title'>Training History</h1>
         <h3 className='single-program-info-title'>Program ID: #{pastProgram.id}</h3>
         {pastProgram.completed && (
            <>
               <h1 style={{ fontSize: '45px',marginBottom: '30px', textAlign: 'center',color: '#12b900'}}>
                  Program Completed
               </h1>
            </>
         )}
         {pastProgram.weeks && pastProgram.weeks[selectedWeek].completed && !pastProgram.completed && (
            <h1 style={{ fontSize: '28px',marginBottom: '30px', textAlign: 'center',color: ' #12b900'}}>
               Week Completed
            </h1>
         )}
         {pastProgram.weeks && pastProgram.weeks[selectedWeek].completed ? (
            <>
               {/* Week Selector */}
               <div className='single-week-selector'>
                  <label htmlFor="single-week-selector"><h2>Select Week:</h2></label>
                  <select
                     id="single-week-selector"
                     value={selectedWeek}
                     onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
                  >
                     {pastProgram.weeks && pastProgram.weeks.map((week, index) => (
                        <option key={index} value={index}>
                           Week {index + 1}
                        </option>
                     ))}
                  </select>
               </div>
               {/* WEEK COMPLETE -Display content for the selected week */}
               <div className='completedStatus-single-week-container'>
                  <h1 className='completedStatus-single-week-title'>WEEK {selectedWeek + 1}</h1>
                  {pastProgram.weeks[selectedWeek].days.map((day, dayIndex) => (
                     <div className="single-day-container" key={dayIndex}>
                        <h3 className="completedStatus-single-day-title">{day.day}</h3>
                        <div className="single-exercises-container">
                           {day.exercises.map((exercise, exerciseIndex) => (
                              <div className="completedStatus-single-exercise-container" key={exerciseIndex}>
                                 <h4 className="single-exercise-title">{exercise.name}</h4>
                                 <table className="single-exercise-table">
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
               <div className='single-week-selector'>
                  <label htmlFor="single-week-selector"><h2>Select Week:</h2></label>
                  <select
                     id="single-week-selector"
                     value={selectedWeek}
                     onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
                  >
                     {pastProgram.weeks && pastProgram.weeks.map((week, index) => (
                        <option key={index} value={index}>
                           Week {index + 1}
                        </option>
                     ))}
                  </select>
               </div>
               {/* WEEK NOT COMPLETE - Display content for the selected week */}
               <div className='single-week-container'>
                  <h1 className='single-week-title'>WEEK {selectedWeek + 1}</h1>
                  {pastProgram.weeks && pastProgram.weeks[selectedWeek].days.map((day, dayIndex) => (
                     <div className="single-day-container" key={dayIndex}>
                        {day.completed ? (
                           <>
                              <h3 className="completedStatus-single-day-title">{day.day}</h3>
                              <div className="single-exercises-container">
                                 {day.exercises.map((exercise, exerciseIndex) => (
                                    <div className="completedStatus-single-exercise-container" key={exerciseIndex}>
                                       <h4 className="single-exercise-title">{exercise.name}</h4>
                                       <table className="single-exercise-table">
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
                              <h3 className="single-day-title">{day.day}</h3>
                              <div className="single-exercises-container">
                                 {day.exercises.map((exercise, exerciseIndex) => (
                                    <React.Fragment key={exerciseIndex}>
                                       {exercise.completed ? (
                                          <div className="completedStatus-single-exercise-container" key={exerciseIndex}>
                                             <h4 className="single-exercise-title">{exercise.name}</h4>
                                             <table className="single-exercise-table">
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
                                          <div className="single-exercise-container" key={exerciseIndex}>
                                             <h4 className="single-exercise-title">{exercise.name}</h4>
                                             <table className="single-exercise-table">
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
         <div className='bottom-button'>
            <button
               className="exit-button"
               onClick={handleExitView}
            >
               Exit Full View
            </button>
         </div>
      </div>
   );
};

export default HistorySingleProgramFullView;