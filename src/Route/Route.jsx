import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from '../Screens/HomeScreen';
import FormPage from '../Form/Form';

function MainRouter(props) {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/form/:formDate" element={<FormPage/>} />

        </Routes>
      </Router>
    </div>
  );
}
export default MainRouter;

