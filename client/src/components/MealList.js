import React, { useState, useEffect } from 'react';
import MealEditForm from './MealEditForm';
import MealForm from './MealForm';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => {
    fetch('https://meal-planner-app-backend.onrender.com/meals')
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error('Error fetching meals:', error));
  };

  const handleAddMeal = (newMeal) => {
    setMeals((prevMeals) => [...prevMeals, newMeal]);
  };

  const handleDelete = (mealId) => {
    fetch(`https://meal-planner-app-backend.onrender.com/meals/${mealId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMeals(meals.filter((meal) => meal.id !== mealId));
      })
      .catch((error) => console.error('Error deleting meal:', error));
  };

  const handleEdit = (mealId) => {
    const mealToEdit = meals.find((meal) => meal.id === mealId);
    setEditingMeal(mealToEdit);
  };

  const handleUpdate = (updatedMeal) => {
    fetch(`https://meal-planner-app-backend.onrender.com/meals/${updatedMeal.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMeal),
    })
      .then((response) => response.json())
      .then(() => {
        setMeals(
          meals.map((meal) =>
            meal.id === updatedMeal.id ? { ...meal, ...updatedMeal } : meal
          )
        );
        setEditingMeal(null);
      })
      .catch((error) => console.error('Error updating meal:', error));
  };

  const handleCancelEdit = () => {
    setEditingMeal(null);
  };

  return (
    <div className="meal-list-container">
      <h2>Meal List</h2>

      {editingMeal ? (
        <MealEditForm
          meal={editingMeal}
          onUpdate={handleUpdate}
          onCancel={handleCancelEdit}
        />
      ) : (
        <MealForm onAddMeal={handleAddMeal} />
      )}

      <div className="meal-list">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-card">
            <h3>{meal.name}</h3>
            <p><strong>Ingredients:</strong> {meal.ingredients}</p>
            <p><strong>Instructions:</strong> {meal.instructions}</p>
            {meal.image_url && <img src={meal.image_url} alt={meal.name} className="meal-image" />}
            <div className="meal-buttons">
              <button onClick={() => handleDelete(meal.id)} className="delete">Delete</button>
              <button onClick={() => handleEdit(meal.id)} className="edit">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealList;
