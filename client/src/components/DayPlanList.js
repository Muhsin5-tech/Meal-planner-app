import React, { useEffect, useState } from 'react';

const DayPlanList = () => {
  const [dayPlans, setDayPlans] = useState([]);

  useEffect(() => {
    const fetchDayPlans = async () => {
      try {
        const response = await fetch('https://meal-planner-app-backend.onrender.com/dayplans');
        const data = await response.json();
        setDayPlans(data);
      } catch (error) {
        console.error("Error fetching day plans:", error);
      }
    };

    fetchDayPlans();
  }, []);

  return (
    <div>
      <h2>Day Plans</h2>
      <ul>
        {dayPlans.length > 0 ? (
          dayPlans.map(dayPlan => (
            <li key={dayPlan.id}>
              <h3>{dayPlan.day_of_week}</h3>
              <p>User ID: {dayPlan.user_id}</p>
              <ul>
                {dayPlan.meals && dayPlan.meals.length > 0 ? (
                  dayPlan.meals.map((meal, index) => (
                    <li key={index}>{meal.name} - {meal.meal_time}</li>
                  ))
                ) : (
                  <li>No meals assigned</li>
                )}
              </ul>
            </li>
          ))
        ) : (
          <p>No day plans found.</p>
        )}
      </ul>
    </div>
  );
};

export default DayPlanList;