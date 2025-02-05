# Meal Planner App - README
# Overview
This Meal Planner App is a full-stack web application that allows users to plan meals for the week. It provides CRUD (Create, Read, Update, Delete) functionality for meals and day plans. Users can add meals with ingredients, instructions, and an image URL, then assign those meals to specific days of the week. It also supports editing and deleting meals and day plans.

The application is built using React for the frontend, Flask for the backend, and SQLAlchemy for database management.

# Table of Contents
    - Tech Stack
    - Installation
    - API Endpoints
    - Database Models
    - Features
    - Contributing
    - License

# Tech Stack
    Frontend: React
    Backend: Flask
    Database: SQLite (via SQLAlchemy)
    API: RESTful API using Flask
    Cross-Origin Resource Sharing (CORS): Flask-CORS for handling cross-origin requests
# Installation
    Backend Installation
    Clone the repository:
    git clone <git@github.com:Muhsin5-tech/Meal-planner-app.git>
    cd <Meal-planner-app>

# API Endpoints
    Meals
    GET /meals: Fetch all meals.
    GET /meals/{id}: Fetch a single meal by its ID.
    POST /meals: Create a new meal.
    PUT /meals/{id}: Update an existing meal by ID.
    DELETE /meals/{id}: Delete a meal by ID.
    Day Plans
    GET /dayplans: Fetch all day plans.
    GET /dayplans/{id}: Fetch a single day plan by ID.
    POST /dayplans: Create a new day plan.
    PUT /dayplans/{id}: Update an existing day plan by ID.
    DELETE /dayplans/{id}: Delete a day plan by ID.
    Day Plan Meals
    POST /dayplans/{id}/assign_meals: Assign meals to a day plan.
# Database Models
    1.USER MODEL
        id: Integer, primary key
        username: String, unique, not nullable
    2.Meal Model
        id: Integer, primary key
        name: String, not nullable
        ingredients: String, not nullable
        instructions: String, not nullable
        image_url: String, not nullable
    3.DayPlan Model
        id: Integer, primary key
        day_of_week: String, not nullable
        date: Date, not nullable
        user_id: Integer, foreign key to User model, not nullable
    4.DayPlanMeal Model
        id: Integer, primary key
        day_plan_id: Integer, foreign key to DayPlan model, not nullable
        meal_id: Integer, foreign key to Meal model, not nullable
        meal_time: String, not nullable (formatted as HH:MM)
# Features
    Meal Management: Add, edit, delete, and view meals with ingredients, instructions, and image URLs.
    Day Plan Management: Create and manage day plans for each user, with the ability to assign meals to specific days and times.
    User-Friendly Interface: React frontend that interacts with the Flask backend via API calls.
    CORS Enabled: Ensures that the frontend and backend can communicate seamlessly across different origins.
# Contributing
Fork this repository.
Make your changes and commit them (git commit -m 'Add new feature').
Push to your branch (git push origin feature-branch).
Create a pull request for review.
# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements
Flask for the backend framework.
React for the frontend framework.
SQLAlchemy for the ORM.
Flask-Migrate for database migrations.
# Live link
