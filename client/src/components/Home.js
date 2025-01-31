import React from "react";
import "../index.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Meal Planner App</h1>
      <p>Plan your meals efficiently and stay on track with your diet.</p>
      <div className="nav-buttons">
        <a href="/meals" className="button">View Meals</a>
        <a href="/dayplans" className="button">Plan Your Week</a>
      </div>
    </div>
  );
};

export default Home;