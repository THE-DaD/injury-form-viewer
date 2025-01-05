import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from '../Screens/HomeScreen';

function MainRouter(props) {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
        
        </Routes>
      </Router>
    </div>
  );
}
export default MainRouter;

