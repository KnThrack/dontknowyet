// src/views/recipes.js

import React from 'react'

const Recipes = ({ recipes }) => {
    return (
        <div>
            <center><h1>Recipesss List</h1></center>
            {
                recipes.data.map((recipe) => 
                <div key={recipe._id.toString()} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{recipe.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{recipe.cuisine}</h6>
                        <p className="card-text">{recipe.title}</p>
                    </div>
                </div>
            )
            }
        </div>
    )
};

export default Recipes