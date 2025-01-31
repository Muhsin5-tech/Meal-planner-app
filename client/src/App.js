import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Meals from './components/Meals';
import DayPlanList from './components/DayPlanList'; // Use this for listing day plans
import DayPlans from './components/DayPlans'; // Use this for viewing individual day plan details
import DayPlanForm from './components/DayPlanForm'; // Use this for adding a new day plan
import Home from './components/Home';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/dayplans" element={<DayPlanList />} /> {/* List all day plans */}
        <Route path="/dayplans/new" element={<DayPlanForm />} /> {/* Form to add new day plan */}
        <Route path="/dayplans/:dayPlanId" element={<DayPlans />} /> {/* View specific day plan */}
      </Routes>
    </>
  );
};

export default App;
