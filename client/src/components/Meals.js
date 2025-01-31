import React, { useState, useEffect } from 'react';
import MealForm from './MealForm';
import MealList from './MealList';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [mealToEdit, setMealToEdit] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/meals')
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error('Error fetching meals:', error));
  }, []);

  const addMeal = (meal) => {
    setMeals((prevMeals) => [...prevMeals, meal]);
  };

  const onEditMeal = (updatedMeal) => {
    setMeals(meals.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal)));
  };

  const onDeleteMeal = (mealId) => {
    fetch(`http://127.0.0.1:5000/meals/${mealId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMeals(meals.filter((meal) => meal.id !== mealId));
      })
      .catch((error) => console.error('Error deleting meal:', error));
  };

  const editMeal = (mealId) => {
    const meal = meals.find((meal) => meal.id === mealId);
    setMealToEdit(meal);
  };

  return (
    <div>
      <h1>Meals</h1>
      <MealForm onAddMeal={addMeal} mealToEdit={mealToEdit} onEditMeal={onEditMeal} />
      <MealList meals={meals} onDelete={onDeleteMeal} onEdit={editMeal} />
    </div>
  );
};

export default Meals;
