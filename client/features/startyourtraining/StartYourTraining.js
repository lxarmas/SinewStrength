import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import generateIntermediateTrainingProgram from '../training programs/Intermediate/IntermediateTrainingProgram';
import './StartYourTraining.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProgram, fetchTrainingProgramAsync, selectTrainingProgram } from '../tracker/trainingProgramSlice';


const customToastErrorStyle = {
   position: 'top-center',
   autoClose: 3000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   className: 'custom-toast-error',
   toastClassName: 'custom-toast-error-message',
   bodyClassName: 'custom-toast-error-body',
   style: {
      background: '#660000',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '12px 16px',
      width: '555px',
      fontSize: '24px',
      height: '65px',
      marginLeft: '-122px'
   },
};

const customToastErrorStyle2 = {
   position: 'top-center',
   autoClose: 3000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   className: 'custom-toast-error',
   toastClassName: 'custom-toast-error-message',
   bodyClassName: 'custom-toast-error-body',
   style: {
      background: '#660000',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '12px 16px',
      width: '710px',
      fontSize: '24px',
      height: '65px',
      marginLeft: '-200px'
   },
};

const customToastErrorStyle3 = {
   position: 'top-center',
   autoClose: 3000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   className: 'custom-toast-error',
   toastClassName: 'custom-toast-error-message',
   bodyClassName: 'custom-toast-error-body',
   style: {
      background: '#660000',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '12px 16px',
      width: '555px',
      fontSize: '24px',
      height: '65px',
      marginLeft: '-122px'
   },
};


const StartYourTraining = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const username = useSelector((state) => state.auth.me.username);
   const isLoggedIn = useSelector((state) => !!state.auth.me.id);
   const trainingProgram = useSelector(selectTrainingProgram);

   useEffect(() => {
      if (username) {
         dispatch(fetchTrainingProgramAsync(username));
      }
   }, [dispatch, username])

   const [maxWeight, setMaxWeight] = useState({
      squat: '',
      bench: '',
      row: '',
      press: '',
      deadlift: '',
   });
   const [reps, setReps] = useState({
      squat: '1',
      bench: '1',
      row: '1',
      press: '1',
      deadlift: '1',
   });
   const [firstSetPercent, setFirstSetPercent] = useState({
      squat: '50',
      bench: '50',
      row: '50',
      press: '62.5',
      deadlift: '62.5',
   });
   const [barbell, setBarbell] = useState('45')
   const barbellNum = parseInt(barbell);
   const [smallestPlates, setSmallestPlates] = useState('2.5');
   const [prWeek, setPrWeek] = useState('5');

   const [isCreatingProgram, setIsCreatingProgram] = useState(false);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (!isLoggedIn) {
         toast.error('Must Be Logged In To Create A Program.', customToastErrorStyle);
         return;
      }
      if (isLoggedIn && trainingProgram.weeks) {
         toast.error('Finish Your Current Program Before Creating Another.', customToastErrorStyle2);
         return;
      }
      if (
            !firstSetPercent.squat || !firstSetPercent.bench || !firstSetPercent.row || !firstSetPercent.press || !firstSetPercent.deadlift
            || !maxWeight.squat || !maxWeight.bench || !maxWeight.row || !maxWeight.press || !maxWeight.deadlift
            || !reps.squat || !reps.bench || !reps.row || !reps.press || !reps.deadlift
            || !barbell || !smallestPlates || !prWeek
         ) {
            toast.error('Fill In All Fields Before Submitting.', customToastErrorStyle3);
            return;
      }

      setIsCreatingProgram(true);

      const sMW = parseInt(maxWeight.squat);
      const bMW = parseInt(maxWeight.bench);
      const rMW = parseInt(maxWeight.row);
      const pMW = parseInt(maxWeight.press);
      const dMW = parseInt(maxWeight.deadlift);
      const sR = parseInt(reps.squat);
      const bR = parseInt(reps.bench);
      const rR = parseInt(reps.row);
      const pR = parseInt(reps.press);
      const dR = parseInt(reps.deadlift);
      const sFSP = parseFloat(firstSetPercent.squat) / 100;
      const bFSP = parseFloat(firstSetPercent.bench) / 100;
      const rFSP = parseFloat(firstSetPercent.row) / 100;
      const pFSP = parseFloat(firstSetPercent.press) / 100;
      const dFSP = parseFloat(firstSetPercent.deadlift) / 100;
      const bb = parseInt(barbell);
      const sP = parseFloat(smallestPlates);
      const prW = parseInt(prWeek);

      setTimeout(() => {
         const newProgram = generateIntermediateTrainingProgram(sMW, bMW, rMW, pMW, dMW, sR, bR, rR, pR, dR, sFSP, bFSP, rFSP, pFSP, dFSP, bb, sP, prW);
         dispatch(createProgram({ username, newProgram }));
         setIsCreatingProgram(false);
         navigate('/track-your-progress');
      }, 2000)
   };

   return (
      <div >
         <div className="STYT-container" >
         <ToastContainer />
         {/* <h2 className="STYT-heading">Let's get started{username ? <span style={{ textTransform: 'uppercase'}}>, {username}</span> : ''}!</h2> */}
         <h1 className='Program-Heading'>Intermediate Training Program</h1>
         <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '28px', color: '#ccc9c9', fontWeight: 'bold', }}>¡Beginner and Advanced Programs Coming Soon!</p>
         <p className='disclaimer'>*This program's weight values are in pounds*</p>
         <form onSubmit={handleSubmit}>
            <table className="STYT-table">
               <thead>
                  <tr>
                     <th>Exercise</th>
                     <th>Max Weight</th>
                     <th>Reps</th>
                     <th>First Set (%)</th>
                     <th>1RM</th>
                     <th>5RM</th>
                     <th>First Top Set</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>Squat</td>
                     <td>
                     <input
                        type="number"
                        min={0}
                        className="STYT-input"
                        value={maxWeight.squat}
                        onChange={(e) => setMaxWeight({ ...maxWeight, squat: e.target.value })}
                     />
                     </td>
                     <td>
                        <input
                           type="number"
                           min={1}
                           className="STYT-input"
                           value={reps.squat}
                           onChange={(e) => setReps({ ...reps, squat: e.target.value })}
                        />
                     </td>
                     <td>
                        <input
                           type="number"
                           step={0.1}
                           max={50}
                           className="STYT-input"
                           value={firstSetPercent.squat}
                           onChange={(e) => setFirstSetPercent({ ...firstSetPercent, squat: e.target.value })}
                        />
                     </td>
                     <td>{maxWeight.squat && reps.squat ? Math.round((maxWeight.squat / (1.0278 - (0.0278 * reps.squat)))) : ''}</td>
                     <td>{maxWeight.squat && reps.squat ? Math.round(((maxWeight.squat / (1.0278 - (0.0278 * reps.squat))) * (1.0278 - (0.0278 * 5)))) : ''}</td>
                     <td>
                        {maxWeight.squat && reps.squat && smallestPlates && prWeek && barbell ? Math.round(
                           ((((maxWeight.squat / (1.0278 - (0.0278 * reps.squat))) * (1.0278 - (0.0278 * 5))) - barbellNum) * Math.pow(1 / 1.025, prWeek - 2)) / (2 * smallestPlates) ) * (2 * smallestPlates) + barbellNum
                           : ''
                        }
                     </td>
                  </tr>
                  <tr>
                     <td>Bench</td>
                     <td>
                        <input
                           type="number"
                           min={0}
                           className="STYT-input"
                           value={maxWeight.bench}
                           onChange={(e) => setMaxWeight({ ...maxWeight, bench: e.target.value })}
                        />
                     </td>
                     <td>
                        <input
                           type="number"
                           min={1}
                           className="STYT-input"
                           value={reps.bench}
                           onChange={(e) => setReps({ ...reps, bench: e.target.value })}
                        />
                     </td>
                     <td>
                        <input
                           type="number"
                           step={0.1}
                           max={50}
                           className="STYT-input"
                           value={firstSetPercent.bench}
                           onChange={(e) => setFirstSetPercent({ ...firstSetPercent, bench: e.target.value })}
                        />
                     </td>
                     <td>{maxWeight.bench && reps.bench ? Math.round((maxWeight.bench / (1.0278 - (0.0278 * reps.bench)))) : ''}</td>
                     <td>{maxWeight.bench && reps.bench ? Math.round(((maxWeight.bench / (1.0278 - (0.0278 * reps.bench))) * (1.0278 - (0.0278 * 5)))) : ''}</td>
                     <td>
                        {maxWeight.bench && reps.bench && smallestPlates && prWeek ? Math.round(
                           ((((maxWeight.bench / (1.0278 - (0.0278 * reps.bench))) * (1.0278 - (0.0278 * 5))) - barbellNum) * Math.pow(1 / 1.025, prWeek - 2)) / (2 * smallestPlates)) * (2 * smallestPlates) + barbellNum
                           : ''
                        }
                     </td>
                  </tr>
                  <tr>
                     <td>Row</td>
                     <td>
                        <input
                           type="number"
                           min={0}
                           className="STYT-input"
                           value={maxWeight.row}
                           onChange={(e) => setMaxWeight({ ...maxWeight, row: e.target.value })}
                        />
                     </td>
                     <td>
                        <input
                           type="number"
                           min={1}
                           className="STYT-input"
                           value={reps.row}
                           onChange={(e) => setReps({ ...reps, row: e.target.value })}
                        />
                     </td>
                     <td>
                        <input
                           type="number"
                           step={0.1}
                           max={50}
                           className="STYT-input"
                           value={firstSetPercent.row}
                           onChange={(e) => setFirstSetPercent({ ...firstSetPercent, row: e.target.value })}
                        />
                     </td>
                     <td>{maxWeight.row && reps.row ? Math.round((maxWeight.row / (1.0278 - (0.0278 * reps.row)))) : ''}</td>
                     <td>{maxWeight.row && reps.row ? Math.round(((maxWeight.row / (1.0278 - (0.0278 * reps.row))) * (1.0278 - (0.0278 * 5)))) : ''}</td>
                     <td>
                        {maxWeight.row && reps.row && smallestPlates && prWeek ? Math.round(
                           ((((maxWeight.row / (1.0278 - (0.0278 * reps.row))) * (1.0278 - (0.0278 * 5))) - barbellNum) * Math.pow(1 / 1.025, prWeek - 2)) / (2 * smallestPlates)) * (2 * smallestPlates) + barbellNum
                           : ''
                        }
                     </td>
                  </tr>
                  <tr>
                     <td>Press</td>
                     <td>
                        <input
                           type="number"
                           min={0}
                           className="STYT-input"
                           value={maxWeight.press}
                           onChange={(e) => setMaxWeight({ ...maxWeight, press: e.target.value })}
                        />
                     </td>
                     <td>
                        <input
                           type="number"
                           min={1}
                           className="STYT-input"
                           value={reps.press}
                           onChange={(e) => setReps({ ...reps, press: e.target.value })}
                        />
                     </td>
                     <td>
                        <input
                           type="number"
                           step={0.1}
                           max={62.5}
                           className="STYT-input"
                           value={firstSetPercent.press}
                           onChange={(e) => setFirstSetPercent({ ...firstSetPercent, press: e.target.value })}
                        />
                     </td>
                     <td>{maxWeight.press && reps.press ? Math.round((maxWeight.press / (1.0278 - (0.0278 * reps.press)))) : ''}</td>
                     <td>{maxWeight.press && reps.press ? Math.round(((maxWeight.press / (1.0278 - (0.0278 * reps.press))) * (1.0278 - (0.0278 * 5)))) : ''}</td>
                     <td>
                        {maxWeight.press && reps.press && smallestPlates && prWeek ? Math.round(
                           ((((maxWeight.press / (1.0278 - (0.0278 * reps.press))) * (1.0278 - (0.0278 * 5))) - barbellNum) * Math.pow(1 / 1.025, prWeek - 2)) / (2 * smallestPlates)) * (2 * smallestPlates) + barbellNum
                           : ''
                        }
                     </td>
                  </tr>
                  <tr>
                     <td>Deadlift</td>
                     <td>
                        <input
                           type="number"
                           min={0}
                           className="STYT-input"
                           value={maxWeight.deadlift}
                           onChange={(e) => setMaxWeight({ ...maxWeight, deadlift: e.target.value })}
                        />
                     </td>
                     <td>
                        <input
                           type="number"
                           min={1}
                           className="STYT-input"
                           value={reps.deadlift}
                           onChange={(e) => setReps({ ...reps, deadlift: e.target.value })}
                        />
                     </td>
                     <td>
                        <input
                           type="number"
                           step={0.1}
                           max={62.5}
                           className="STYT-input"
                           value={firstSetPercent.deadlift}
                           onChange={(e) => setExerciseInterval({ ...firstSetPercent, deadlift: e.target.value })}
                        />
                     </td>
                     <td>{maxWeight.deadlift && reps.deadlift ? Math.round((maxWeight.deadlift / (1.0278 - (0.0278 * reps.deadlift)))) : ''}</td>
                     <td>{maxWeight.deadlift && reps.deadlift ? Math.round(((maxWeight.deadlift / (1.0278 - (0.0278 * reps.deadlift))) * (1.0278 - (0.0278 * 5)))) : ''}</td>
                     <td>
                        {maxWeight.deadlift && reps.deadlift && smallestPlates && prWeek ? Math.round(
                           ((((maxWeight.deadlift / (1.0278 - (0.0278 * reps.deadlift))) * (1.0278 - (0.0278 * 5))) - barbellNum) * Math.pow(1 / 1.025, prWeek - 2)) / (2 * smallestPlates)) * (2 * smallestPlates) + barbellNum
                           : ''
                        }
                     </td>
                  </tr>
               </tbody>
            </table>
            <div className="STYT-options">
               <div>
                  <label htmlFor="barbell">Barbell Weight:</label>
                  <input
                     type="number"
                     min={0}
                     name="barbell"
                     id="barbell"
                     className="STYT-input"
                     value={barbell}
                     onChange={(e) => setBarbell(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="smallestPlates">Smallest Plates Available:</label>
                  <input
                     type="number"
                     step={0.1}
                     min={0.1}
                     name="smallestPlates"
                     id="smallestPlates"
                     className="STYT-input"
                     value={smallestPlates}
                     onChange={(e) => setSmallestPlates(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="matchPRsWeek">PR in Week #:</label>
                  <input
                     type="number"
                     min={5}
                     name="prWeek"
                     id="prWeek"
                     className="STYT-input"
                     value={prWeek}
                     onChange={(e) => setPrWeek(e.target.value)}
                  />
               </div>
            </div>
            <button type="submit" className="STYT-button">{isCreatingProgram ? "Creating Your Program..." : "Create Program"}</button>
         </form>
         <div className='instructions-container'>
            <p className="STYT-instructions">
               <strong>Max Weight:</strong> The maximum weight you've lifted for the given exercise.
               <br />
               <strong>Reps:</strong> The number of reps you've completed with the max weight. Ideally 1-5 reps
               <br />
               <strong>First Set (%):</strong> The weight value compared to your top set. 50% is the maximum for Squat, Bench, and Row.
                  62.5% is the maximum for Press and Deadlift. The weight difference for each set in between will be evenly distributed.
               <br />
               <strong>1RM:</strong> 1 Rep Max
               <br />
               <strong>5RM:</strong> 5 Rep Max
               <br />
               <strong>First Top Set:</strong> The weight value of the top set that the program will start with.
                  <br /> 
                  Example: Week1/Monday/Set5 = First Top Set
               <br />
               <strong>Barbell Weight:</strong> 
                  The weight of the barbell you will be using. All of your work weights will be rounded to account for this value.
                  Standard barbells weigh 45lbs. If you'll be using a different barbell, we've got you covered.
               <br />
               <strong>Smallest Plates Available:</strong> 
                  The weight of the smallest plate you have available. All of your work weights will be rounded to account for this value.
               <br />
               <strong>PR in Week #:</strong> 
                  Every 5-rep Top Set in this week is a PR. Week 5 is the minimum.
                  You can increase the week number to allow more time to recover or to make the program easier.
            </p>
         </div>
      </div>
      </div>
      
   );
};

export default StartYourTraining;
