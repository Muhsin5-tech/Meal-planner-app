import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DayPlans = () => {
  const { dayPlanId } = useParams();
  const [dayPlan, setDayPlan] = useState(null);

  useEffect(() => {
    fetch(`https://meal-planner-app-backend.onrender.com/dayplans/${dayPlanId}`)
      .then((response) => response.json())
      .then((data) => setDayPlan(data))
      .catch((error) => console.error('Error fetching day plan:', error));
  }, [dayPlanId]);

  if (!dayPlan) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dayplan-container">
      <h1>{dayPlan.day_of_week}</h1>
      <h3>User ID: {dayPlan.user_id}</h3>
      <ul>
        {dayPlan.meals && dayPlan.meals.length > 0 ? (
          dayPlan.meals.map((meal) => (
            <li key={meal.id}>
              <h4>{meal.name}</h4>
              <p>{meal.ingredients}</p>
              <p>{meal.instructions}</p>
              <img
                src={meal.image_url}
                alt={meal.name}
                className="meal-image"
              />
            </li>
          ))
        ) : (
          <p>No meals assigned for this day.</p>
        )}
      </ul>
    </div>
  );
};

export default DayPlans;