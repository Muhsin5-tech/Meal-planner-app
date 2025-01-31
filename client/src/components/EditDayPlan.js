import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditDayPlan = () => {
  const { dayPlanId } = useParams();
  const history = useHistory();
  const [dayPlan, setDayPlan] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/dayplans/${dayPlanId}`)
      .then((response) => response.json())
      .then((data) => {
        setDayPlan(data);
        setDayOfWeek(data.day_of_week);
        setUserId(data.user_id);
      })
      .catch((error) => console.error('Error fetching day plan:', error));
  }, [dayPlanId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedDayPlan = {
      day_of_week: dayOfWeek,
      user_id: userId,
    };

    fetch(`http://127.0.0.1:5000/dayplans/${dayPlanId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDayPlan),
    })
      .then((response) => response.json())
      .then(() => {
        history.push(`/dayplans/${dayPlanId}`);
      })
      .catch((error) => {
        console.error('Error updating day plan:', error);
      });
  };

  if (!dayPlan) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Day Plan</h2>
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
        <button type="submit">Update Day Plan</button>
      </form>
    </div>
  );
};

export default EditDayPlan;