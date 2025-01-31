import React, { useState, useEffect } from 'react';

const MealForm = ({ onAddMeal, mealToEdit, onEditMeal }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mealToEdit) {
      setName(mealToEdit.name);
      setIngredients(mealToEdit.ingredients);
      setImageUrl(mealToEdit.image_url);
      setInstructions(mealToEdit.instructions);
    }
  }, [mealToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Frontend validation before submitting
    if (!name || !ingredients || !instructions || !imageUrl) {
      setError('All fields are required.');
      return;
    }

    const newMeal = { name, ingredients, instructions, image_url: imageUrl };

    if (mealToEdit) {
      // Edit meal
      fetch(`http://127.0.0.1:5000/meals/${mealToEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeal),
      })
        .then((response) => response.json())
        .then((updatedMeal) => {
          onEditMeal(updatedMeal); // Immediately reflect the updated meal
          setName('');
          setIngredients('');
          setImageUrl('');
          setInstructions('');
          setError('');  // Clear error if the form is valid
        })
        .catch((error) => console.error('Error updating meal:', error));
    } else {
      // Add new meal
      fetch('http://127.0.0.1:5000/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeal),
      })
        .then((response) => response.json())
        .then((data) => {
          onAddMeal(data.meal); // Immediately reflect the added meal
          setName('');
          setIngredients('');
          setImageUrl('');
          setInstructions('');
          setError('');  // Clear error if the form is valid
        })
        .catch((error) => console.error('Error adding meal:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="meal-form">
      <h2>{mealToEdit ? 'Edit Meal' : 'Add a New Meal'}</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Ingredients:
        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      </label>
      <label>
        Instructions:
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      </label>
      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <button type="submit">{mealToEdit ? 'Update Meal' : 'Add Meal'}</button>
    </form>
  );
};


export default MealForm;