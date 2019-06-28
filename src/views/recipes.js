// src/views/recipes.js

import React from 'react'

const Recipes = ({ recipes }) => {
    return (
        <div>
            <center><h1>Recipesss List</h1></center>
            {
                recipes.data.map((recipe) => 
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{recipe.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{recipe.cuisine}</h6>
                        <p class="card-text">{recipe.title}</p>
                    </div>
                </div>
            )
            }
        </div>
    )
};

export default Recipes