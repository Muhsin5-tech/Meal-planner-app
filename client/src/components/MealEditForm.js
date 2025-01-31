import React, { useState, useEffect } from 'react';

const MealEditForm = ({ meal, onUpdate, onCancel }) => {
  const [name, setName] = useState(meal.name);
  const [ingredients, setIngredients] = useState(meal.ingredients);
  const [imageUrl, setImageUrl] = useState(meal.image_url);
  const [instructions, setInstructions] = useState(meal.instructions);

  useEffect(() => {
    if (meal) {
      setName(meal.name);
      setIngredients(meal.ingredients);
      setImageUrl(meal.image_url);
      setInstructions(meal.instructions);
    }
  }, [meal]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedMeal = {
      ...meal,
      name,
      ingredients,
      instructions,
      image_url: imageUrl,
    };

    onUpdate(updatedMeal);
  };

  return (
    <div className="meal-edit-form">
      <h3>Edit Meal</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Ingredients:
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </label>
        <label>
          Instructions:
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <button type="submit">Update Meal</button>
        <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default MealEditForm;
