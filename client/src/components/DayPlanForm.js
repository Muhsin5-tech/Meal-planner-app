import React, { useState } from 'react';

const DayPlanForm = () => {
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDayPlan = {
      day_of_week: dayOfWeek,
      user_id: userId,
    };

    fetch('https://meal-planner-app-backend.onrender.com/dayplans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDayPlan),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message || 'Day plan added successfully!');
        setDayOfWeek('');
        setUserId('');
      })
      .catch((error) => {
        setMessage('Error adding day plan. Please try again.');
        console.error('Error adding day plan:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Day of the Week"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
        />
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">Add Day Plan</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DayPlanForm;