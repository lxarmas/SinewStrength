import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import About from '../features/about/About'; 
import AdminCreateUser from '../features/auth/AdminCreateUser';
import { me } from './store';

import UsersList from '../features/users/UsersList';
import TrackYourProgress from '../features/tracker/TrackYourProgress';
import DemonstrationVideos from '../assets/SinewStrengthAlbum/DemonstrationVideos/DemonstrationVideos';
import StartYourTraining from '../features/startyourtraining/StartYourTraining';
import TrainingHistory from '../features/history/all/TrainingHistory';
import HistorySingleProgramFullView from '../features/history/single/HistorySingleProgramFullView';

const AppRoutes = () => {
   const isLoggedIn = useSelector((state) => !!state.auth.me.id);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(me());
   }, []);

   return (
      <div>
         <Routes>
            {isLoggedIn ? (
               <>
                  <Route path="/*" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/create-user" element={<AdminCreateUser />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/" element={<About />} />
                  <Route path="/demonstration-videos" element={<DemonstrationVideos />} />

                  <Route path="/start-your-training" element={<StartYourTraining/>} />
                  <Route path="/" element={<StartYourTraining />} />
              
                  <Route path="/track-your-progress" element={<TrackYourProgress />} />
                  <Route path="/training-history" element={<TrainingHistory />} />
                  <Route path="/training-history/:programId" element={<HistorySingleProgramFullView />} />
               </>
            ) : (
               <>
                  <Route
                     path="/*"
                     element={<AuthForm name="login" displayName="Login" />}
                  />
                  <Route
                     path="/login"
                     element={<AuthForm name="login" displayName="Login" />}
                  />
                  <Route
                     path="/signup"
                     element={<AuthForm name="signup" displayName="Sign Up" />}
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/start-your-training" element={<StartYourTraining />} />
                  <Route path="/track-your-progress" element={<TrackYourProgress />} />
                  <Route path="/training-history" element={<TrainingHistory />} />
               </>
            )}
         </Routes>
      </div>
   );
};

export default AppRoutes;