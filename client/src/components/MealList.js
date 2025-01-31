import React, { useState, useEffect } from 'react';
import MealEditForm from './MealEditForm';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => {
    fetch('http://127.0.0.1:5000/meals')
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error('Error fetching meals:', error));
  };

  const handleDelete = (mealId) => {
    fetch(`http://127.0.0.1:5000/meals/${mealId}`, {
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
    fetch(`http://127.0.0.1:5000/meals/${updatedMeal.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMeal),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the meal list state with the updated meal
        setMeals(
          meals.map((meal) =>
            meal.id === updatedMeal.id ? { ...meal, ...updatedMeal } : meal
          )
        );
        setEditingMeal(null); // Close the edit form after update
      })
      .catch((error) => console.error('Error updating meal:', error));
  };

  const handleCancelEdit = () => {
    setEditingMeal(null); // Close the edit form
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
        <div className="meal-list">
          {meals.map((meal) => (
            <div key={meal.id} className="meal-card">
              <h3>{meal.name}</h3>
              <p>{meal.ingredients}</p>
              <p>{meal.instructions}</p>
              <img src={meal.image_url} alt={meal.name} className="meal-image" />
              <div className="meal-buttons">
                <button
                  onClick={() => handleDelete(meal.id)}
                  className="delete"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(meal.id)}
                  className="edit"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealList;
