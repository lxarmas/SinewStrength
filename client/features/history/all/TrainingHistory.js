import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllProgramsAsync, selectAllPrograms } from './allProgramsHistorySlice';
import './TrainingHistory.css'
import background from '../../../assets/SinewStrengthAlbum/pictures/arnold.jpg'

const TrainingHistory = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const username = useSelector((state) => state.auth.me.username);
   const isLoggedIn = useSelector((state) => !!state.auth.me.id);
   const allPrograms = useSelector(selectAllPrograms);
   const [expandedProgram, setExpandedProgram] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if(isLoggedIn) {
         dispatch(fetchAllProgramsAsync(username));
         setTimeout(() => {
            setIsLoading(false);
         }, 1000);
      }else {
         setIsLoading(false)
      }
   }, [dispatch, username]);

   const handleExpandView = (programIndex) => {
      setExpandedProgram(programIndex === expandedProgram ? null : programIndex);
   };

   const handleViewAll = (programIndex, programId) => {
      if (allPrograms[programIndex].active) {
         navigate('/track-your-progress');
      } else {
         navigate(`/training-history/${programId}`)
      }
   }

   let createdAt;
   let updatedAt;
   if (expandedProgram !== null) {
      createdAt = new Date(allPrograms[expandedProgram].createdAt).toLocaleString();
      updatedAt = new Date(allPrograms[expandedProgram].updatedAt).toLocaleString();
   }

   if (!isLoggedIn && !isLoading && !username) {
      return (
         <div className="training-history" style={{ backgroundColor: 'black' }}>
            <p style={{ fontSize: '26px', color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
               You Must Be Logged In To View Your Training History
            </p>
         </div>
      );
   };

   if (isLoading) {
      return (
         <div className="training-history">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
               <h1>Loading Your Program History...</h1>
            </div>            
         </div>
      );
   };

   if (!isLoading && !allPrograms || allPrograms.length === 0) {
      return (
         <div className="training-history" style={{ backgroundColor: 'black'}}>
            <p style={{ fontSize: '26px', color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
               You Don't Have A Training History
            </p>
         </div>
      );
   };

   return (
      <div className='training-history' style={{ backgroundImage: `url(${background})`}}>
         <div className='program-container'>
            <h1 className='program-title'>Training History</h1>
            {allPrograms && allPrograms.map((program, programIndex) => (
               <div className='program-info-container' key={programIndex}>
                  <h3 className='program-info-title'>Program ID: #{program.id}</h3>
                  <h3 className='program-info-name'>{program.name}</h3>
                  <div className='expand-button-container'>
                     <button
                        className='expand-button'
                        onClick={() => handleExpandView(programIndex)}
                     >
                        {expandedProgram === programIndex ? 'Collapse' : 'Expand'}
                     </button>
                  </div>
                  <div className='expanded-info-container'>
                     {expandedProgram === programIndex && (
                        <div className='info-box-container'>
                           {program.active && (
                              <h4 className='active-status'>ACTIVE</h4>
                           )}
                           <table className="info-box-table">
                              <thead>
                                 <tr>
                                    <th>Length</th>
                                    <th>Program Completion</th>
                                    <th>Created</th>
                                    <th>Last Updated</th>
                                    <th>Full Training Details</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td>{program.weeks.length} weeks</td>
                                    <td>{program.completed ? 'Completed' : 'Incomplete'}</td>
                                    <td>{createdAt}</td>
                                    <td>{updatedAt}</td>
                                    <td>
                                       <button
                                          className='view-all-button'
                                          onClick={() => handleViewAll(programIndex, program.id)}
                                       >
                                          View All
                                       </button>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default TrainingHistory;