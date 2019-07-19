import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.scss";
import { Recipes, Recipe, NavBar, Profile, PrivateRoute, ConfirmationModal, Loading, FloatButtons } from "./views";

//const util = require("util");
var _ = require("underscore");

const App = (...props) => {
	const [recipes, setRecipes] = useState(null);
	const [filteredRecipes, setFilteredRecipes] = useState(null);
	const [user, setUser] = useState(null);
	const [modal, setModal] = useState({ show: false, type: "" });
	const [filter, setFilter] = useState("");
	const [changeRecipe, setChangeRecipe] = useState(null);
	const [ingredientIndex, setIngredientIndex] = useState(null);
	const [ingredientDelete, setIngredientDelete] = useState(false);
	const [pageState, setPageState] = useState(null);

	// set the default axios stuff
	axios.defaults.headers.post["Content-Type"] = "application/json";
	axios.defaults.headers.put["Content-Type"] = "application/json";
	axios.defaults.headers.get["Content-Type"] = "application/json";

	async function callAPI(myUser) {
		// get the initial recipes
		const recipes = (await axios.get("https://notsureyetapp.herokuapp.com/api/recipes?user=" + myUser._id)).data;

		setRecipes(recipes.data);
		setFilteredRecipes(recipes.data);
	}

	useEffect(() => {
		// get the initial recipes
		async function putAuth() {
			await props[0].token.then(function(result) {
				axios.defaults.headers.post["Authorization"] = "Bearer " + result;
				axios.defaults.headers.delete["Authorization"] = "Bearer " + result;
				axios.defaults.headers.get["Authorization"] = "Bearer " + result;
				axios.defaults.headers.put["Authorization"] = "Bearer " + result;
			});
		}

		var auth = putAuth();

		// before we can get the initial list we need the user to be there.
		async function getUser() {
			return (await axios.get("https://notsureyetapp.herokuapp.com/api/users?email=" + props[0].user.email)).data;
		}
		auth.then(function(result) {
			let user = getUser();

			// handle success
			user.then(function(result) {
				async function createUser() {
					let createUser = {
						name: props[0].user.name,
						email: props[0].user.email,
						auth0ID: props[0].user.sub
					};

					return (await axios.post("https://notsureyetapp.herokuapp.com/api/users/", JSON.stringify(createUser))).data;
				}
				// if user is not there yet (web hooks in Auth0 dont work with google) then create it instead
				if (result.data === null || result.data === undefined) {
					// handle error / no data
					// no user is here so lets make a new one
					const newUser = createUser();
					newUser.then(function(result) {
						setUser(result.data);
						callAPI(result.data);
					});
				} else {
					setUser(result.data[0]);
					callAPI(result.data[0]);
				}
			});
		});
	}, []);

	async function updateIngredients(state) {
		// and put it away
		const updateRecipe = (await axios.put("https://notsureyetapp.herokuapp.com/api/recipes/" + state._id, JSON.stringify(state))).data.data;

		// find which one we updating
		let index = recipes.findIndex(x => x._id === updateRecipe._id.toString());
		var stateCopy = recipes.slice();
		stateCopy[index] = updateRecipe;

		// update it
		setChangeRecipe(stateCopy[index]);
		setRecipes(stateCopy);
		setFilteredRecipes(stateCopy);
	}

	async function addRecipe(newObject) {
		// and put it away
		const newRecipe = (await axios.post("https://notsureyetapp.herokuapp.com/api/recipes/", JSON.stringify(newObject))).data.data;

		// add it in
		var stateCopy = recipes.slice();
		stateCopy.push(newRecipe);

		// update it
		setRecipes(stateCopy);
		setFilteredRecipes(stateCopy);
	}

	// handlers

	function handleAddRecipe(event) {
		const newRecipe = {
			name: _.uniqueId("newRecipe"),
			title: "",
			cuisine: "",
			ingredients: [],
			recipe: "",
			user: user._id
		};
		addRecipe(newRecipe);
	}

	function handleAddIngredient(event) {
		// find which one we updating
		let index = recipes.findIndex(x => x._id === changeRecipe._id.toString());
		// take a copy thats mutable and update it
		var stateCopy = recipes.slice();
		stateCopy[index] = Object.assign({}, stateCopy[index]);
		stateCopy[index].ingredients.push({
			ingredient: "",
			quantity: 0,
			unit: ""
		});

		setIngredientIndex(stateCopy[index].ingredients.length - 1);
		setChangeRecipe(stateCopy[index]);
		// raise Modal
		raiseModal("addIngredient");
	}

	function handleDeleteIngredient(event) {
		event.preventDefault();
		setIngredientDelete(true);
	}

	function handleChangeIngredient(event) {
		let index = changeRecipe.ingredients.findIndex(x => x._id === event.currentTarget.id.toString());
		setIngredientIndex(index);
		// raise Modal
		raiseModal("addIngredient");
	}

	function handleTableChange(event, childState) {
		// get the value and move it into the state
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;

		const ingredientsField = target.name;

		// find which one we updating
		let index = recipes.findIndex(x => x._id === changeRecipe._id.toString());

		// change the one we want to fix the state
		var stateCopy = recipes.slice();
		stateCopy[index] = Object.assign({}, stateCopy[index]);

		// update it
		stateCopy[index].ingredients[ingredientIndex][ingredientsField] = value;
		setChangeRecipe(stateCopy[index]);
		setRecipes(stateCopy);
		setFilteredRecipes(stateCopy);
	}

	function handleInputChange(event) {
		// get the value and move it into the state
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;

		const recipeField = target.name;

		// find which one we updating
		let index = recipes.findIndex(x => x._id === changeRecipe._id.toString());

		// change the one we want to fix the state
		var stateCopy = recipes.slice();
		stateCopy[index] = Object.assign({}, stateCopy[index]);
		stateCopy[index][recipeField] = value;

		// one
		setChangeRecipe(stateCopy[index]);
		// ALL
		setRecipes(stateCopy);
		setFilteredRecipes(stateCopy);
	}

	function handleSubmit(event) {
		event.preventDefault();

		/*
		// find which one we updating
		let index = recipes.findIndex(x => x._id === childState._id.toString());

		// take a copy thats mutable
		var stateCopy = recipes.slice();
		var recipe = stateCopy[index];

		setChangeRecipe(recipe);
*/
		// raise decision
		raiseModal("confirm");
	}

	function raiseModal(modalType, index) {
		setModal({
			show: !modal.show,
			type: modalType,
			index: index
		});
	}

	function handleDelete(key, event) {
		// delete stuff
		const recipeTarget = key.split("#");
		// find which one we updating
		let index = recipes.findIndex(x => x._id === recipeTarget[1]);
		// take a copy thats mutable
		var stateCopy = recipes.slice();
		var recipe = stateCopy[index];

		setChangeRecipe(recipe);
		// raise decision
		raiseModal("delete");
	}

	function handleModalClose() {
		setIngredientDelete(false);
		setModal({
			show: false,
			type: ""
		});
	}
	function handleModalSuccess(state, that) {
		setModal({
			show: false,
			type: ""
		});

		if (state.type === "delete") {
			// and put it away
			setIngredientDelete(false);
			axios.delete("https://notsureyetapp.herokuapp.com/api/recipes/" + changeRecipe._id)
				.then(function(response) {
					// handle success
					var recipeCopy = _.without(recipes, changeRecipe);
					setRecipes(recipeCopy);
					setFilteredRecipes(recipeCopy);
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				})
				.finally(function() {
					// always executed
				});
		}

		if (state.type === "confirm" || state.type === "addIngredient") {
			// code block
			var stateCopy = Object.assign({}, changeRecipe);

			if (ingredientDelete) {
				stateCopy.ingredients = _.without(stateCopy.ingredients, stateCopy.ingredients[ingredientIndex]);

				// find which one we updating
				let index = recipes.findIndex(x => x._id === stateCopy._id.toString());
				// change the one we want to fix the state
				var recipesCopy = recipes.slice();
				recipesCopy[index] = stateCopy;
				setRecipes(recipesCopy);
				setFilteredRecipes(recipesCopy);
				setChangeRecipe(stateCopy);
				setIngredientDelete(false);
			}
			axios.put("https://notsureyetapp.herokuapp.com/api/recipes/" + stateCopy._id, JSON.stringify(stateCopy))
				.then(function(response) {
					// handle success
					// find which one we updating
					let index = recipes.findIndex(x => x._id === response.data.data._id.toString());
					// change the one we want to fix the state
					var recipesCopy = recipes.slice();
					recipesCopy[index] = response.data.data;

					setRecipes(recipesCopy);
					setFilteredRecipes(recipesCopy);
					setChangeRecipe(response.data.data);
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				})
				.finally(function() {
					// always executed
				});
		}
	}

	function handleFilterChange(event) {
		// filter all the recipes based on all the text in them and store it in a filter state
		const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
		let filteredRecipes = recipes;
		filteredRecipes = filteredRecipes.filter(recipe => {
			return _.contains(_.values(recipe).map(a => String(a).indexOf(value) !== -1), true);
		});

		setFilteredRecipes(filteredRecipes);
		setFilter(value);
	}
	// handlers end

	function RecipeListApp() {
		const recipesList = filteredRecipes;

		if (recipesList) {
			return (
				<div className='App'>
					<Router>
						<header className='App-header'>
							<NavBar />
						</header>

						<div className='App-content'>
							<PrivateRoute
								exact
								path='/'
								render={props => (
									<Recipes
										recipesList={recipesList}
										filter={filter}
										handleDelete={handleDelete}
										handleFilterChange={handleFilterChange}
										setPageState={setPageState}
										{...props}
									/>
								)}
							/>
							<PrivateRoute
								path='/recipe/:id'
								render={props => (
									<Recipe
										recipesList={recipesList}
										handleInputChange={handleInputChange}
										handleChangeIngredient={handleChangeIngredient}
										handleDeleteIngredient={handleDeleteIngredient}
										setPageState={setPageState}
										setChangeRecipe={setChangeRecipe}
										{...props}
									/>
								)}
							/>
						</div>
						<div className='d-flex footerButtons'>
							<FloatButtons
								handleAddRecipe={handleAddRecipe}
								handleSubmit={handleSubmit}
								handleAddIngredient={handleAddIngredient}
								pageState={pageState}
								{...props}
							/>
						</div>
						<Switch>
							<Route path='/' exact />
							<PrivateRoute path='/profile' render={props => <Profile recipesList={recipesList} />} />
						</Switch>
					</Router>
					<ConfirmationModal
						showModal={modal.show}
						handleModalClose={handleModalClose}
						handleModalSuccess={handleModalSuccess}
						modal={modal}
						changeRecipe={changeRecipe}
						ingredientIndex={ingredientIndex}
						ingredientDelete={ingredientDelete}
						handleInputChange={handleTableChange}
					/>
				</div>
			);
		} else {
			return (
				<div className='App'>
					<Router>
						<header className='App-header'>
							<NavBar />
						</header>
						<div className='App-content'>
							<Loading />
							<div className='d-flex footerButtons'>
								<FloatButtons handleAddRecipe={handleAddRecipe} pageState={pageState} />
							</div>
						</div>
					</Router>
				</div>
			);
		}
	}

	return RecipeListApp();
};

export default App;
