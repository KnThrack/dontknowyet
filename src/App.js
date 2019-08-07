import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import axios from "axios";
import "./App.scss";
import { Recipes, Recipe, NavBar, Profile, StartPage, PrivateRoute, ConfirmationModal, Loading, FloatButtons } from "./views";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/storage";

//const util = require("util");
var _ = require("underscore");

const App = (...props) => {
	// all my state its getting quiet a lot to think about using context
	const [recipes, setRecipes] = useState(null);
	const [filteredRecipes, setFilteredRecipes] = useState(null);
	const [user, setUser] = useState(null);
	const [modal, setModal] = useState({ show: false, type: "" });
	const [filter, setFilter] = useState("");
	const [changeRecipe, setChangeRecipe] = useState(null);
	const [deleteRecipe, setDeleteRecipe] = useState(null);
	const [ingredientIndex, setIngredientIndex] = useState(null);
	const [ingredientDelete, setIngredientDelete] = useState(false);
	const [pageState, setPageState] = useState(null);
	const [firebaseApp, setFirebaseApp] = useState(null);
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const [files, setFiles] = useState([]);
	const [pictures, setPictures] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState({});
	const [successfullUploaded, setSuccessfullUploaded] = useState(false);

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

	function loginout() {
		!isAuthenticated && loginWithRedirect({});
		isAuthenticated && logout({ returnTo: "https://dontknowyet.herokuapp.com/" });

		isAuthenticated &&
			firebase
				.auth()
				.signOut()
				.then(function() {
					// Sign-out successful.
				})
				.catch(function(error) {
					// An error happened.
				});
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

		auth.then(function(result) {
			const firebaseConfig = {
				apiKey: "AIzaSyDqvSOYhQwSshZuNU5HyA2-THt5jmjIq8U",
				authDomain: "dontknowyet.firebaseapp.com",
				databaseURL: "https://dontknowyet.firebaseio.com",
				projectId: "dontknowyet",
				storageBucket: "gs://dontknowyet.appspot.com/",
				messagingSenderId: "1016122621793",
				appId: "1:1016122621793:web:1cdc1e8b3a26988e"
			};

			var fire = firebase.initializeApp(firebaseConfig);
			// auth to firebase with token
			const fireToken = axios({
				method: "get",
				url: "https://notsureyetapp.herokuapp.com/auth/firebase"
			});

			fireToken.then(function(result) {
				fire.auth()
					.signInWithCustomToken(result.data.firebaseToken)
					.then(function(User) {
						loadPictures(fire, User.user);
					})
					.catch(function(error) {
						// Handle Errors here.
						var errorCode = error.code;
						var errorMessage = error.message;
						console.log(errorMessage, errorCode);
						// ...
					});

				setFirebaseApp(fire);
			});
		});
	}, []);

	async function getPictureUrl(picture) {
		const url = await picture.getDownloadURL();
		const metaData = await picture.getMetadata();
		//customMetadata
		var image = {
			recipe_id: metaData.customMetadata.recipe_id,
			name: picture.name,
			url: url
		};

		return image;
	}

	async function loadPictures(fire, user) {
		/**
		 * Returns the sum of all numbers passed to the function.
		 * @param fire firebase reference to the firebase
		 * @param user current firebase user
		 */
		var storageRef = fire
			.storage()
			.ref()
			.child("users/" + user.uid + "/");
		if (storageRef) {
			var pictureList = await storageRef.list();

			const newArray = pictureList.items.map(async picture => await getPictureUrl(picture));

			try {
				var pictures = await Promise.all(newArray);
				setPictures(pictures);
			} catch (e) {}
		}
	}

	/*
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
*/
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

	function handleBack(event) {
		// ok here we need to basically raise a modal with the card we just click and overlay or over the list
		setPageState({ page: "list" });
		setChangeRecipe(null);
	}

	function handleAddRecipe(event) {
		const newRecipe = {
			name: _.uniqueId("newRecipe"),
			title: "",
			cuisine: "",
			ingredients: [],
			recipe: "Your Recipe",
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

		setDeleteRecipe(recipe);
		//setChangeRecipe(recipe);
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
			axios.delete("https://notsureyetapp.herokuapp.com/api/recipes/" + deleteRecipe._id)
				.then(function(response) {
					// handle success
					var recipeCopy = _.without(recipes, deleteRecipe);
					setRecipes(recipeCopy);
					setFilteredRecipes(recipeCopy);
					if (pageState === "details") {
						handleBack();
					}
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

			// upload pictures
			uploadFiles();

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

	// upload handlers
	function onFilesAdded(newfile) {
		setFiles(files.concat(newfile));
	}

	async function uploadFiles() {
		setUploadProgress({});
		setUploading(true);
		const promises = [];
		files.forEach(file => {
			promises.push(sendRequest(file));
		});
		try {
			await Promise.all(promises);
			setSuccessfullUploaded(true);
			setUploading(false);
			setFiles([]);
		} catch (e) {
			// Not Production ready! Do some error handling here instead...
			setSuccessfullUploaded(true);
			setUploading(false);
			setFiles([]);
		}
	}

	function sendRequest(file) {
		return new Promise((resolve, reject) => {
			var storageRef = firebaseApp.storage().ref();

			var metadata = {
				contentType: file.type,
				customMetadata: {
					recipe_id: changeRecipe._id,
					recipe_name: changeRecipe.name
				}
			};

			const copy = { ...uploadProgress };
			copy[file.name] = { state: "done", percentage: 0 };
			setUploadProgress(copy);

			var storageData = storageRef.child("users/" + firebaseApp.auth().currentUser.uid + "/" + file.name).put(file, metadata);

			storageData.on(
				firebase.storage.TaskEvent.STATE_CHANGED,
				function(snapshot) {
					// progress
					var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(percent + "% done");
					// Do whatever you want with the native progress event
					const copy = { uploadProgress };
					copy[file.name] = {
						state: "pending",
						percentage: percent
					};
					setUploadProgress(copy);
				},
				function(error) {
					// [START onfailure]
					console.error("Upload failed:", error);
					//handle error
					const copy = { ...uploadProgress };
					copy[file.name] = { state: "error", percentage: 0 };
					setUploadProgress(copy);
					reject(error);
					// [END onfailure]
				},
				function(snapshot) {
					// success !!

					//handle success
					const copy = { ...uploadProgress };
					copy[file.name] = { state: "done", percentage: 100 };
					setUploadProgress(copy);
					resolve(snapshot);
				}
			);

			storageData.then(function(snapshot) {
				console.log(snapshot);
			});
		});
	}

	function makeCardBig(event, recipe) {
		// we dont do that for that one button
		if (event.target.id !== "cardButton" && event.target.className !== "dropdown-item") {
			// ok here we need to basically raise a modal with the card we just click and overlay or over the list
			setPageState({ page: "details" });
			setChangeRecipe(recipe);
		}
	}

	// handlers end
	return (
		<div className='App'>
			<header className='App-header'>
				<NavBar />
			</header>

			<div className='App-content'>
				<Router>
					<Switch>
						<PrivateRoute
							exact
							path='/recipes'
							render={props => (
								<Recipes
									recipesList={filteredRecipes}
									pictureList={pictures}
									filter={filter}
									handleDelete={handleDelete}
									handleFilterChange={handleFilterChange}
									setPageState={setPageState}
									handleInputChange={handleInputChange}
									handleChangeIngredient={handleChangeIngredient}
									handleDeleteIngredient={handleDeleteIngredient}
									setChangeRecipe={setChangeRecipe}
									changeRecipe={changeRecipe}
									firebaseApp={firebaseApp}
									successfullUploaded={successfullUploaded}
									uploadProgress={uploadProgress}
									uploading={uploading}
									files={files}
									setFiles={setFiles}
									setSuccessfullUploaded={setSuccessfullUploaded}
									onFilesAdded={onFilesAdded}
									uploadFiles={uploadFiles}
									makeCardBig={makeCardBig}
									{...props}
								/>
							)}
						/>
						<PrivateRoute
							path='/recipe/:id'
							render={props => (
								<Recipe
									recipesList={filteredRecipes}
									pictureList={pictures}
									handleInputChange={handleInputChange}
									handleChangeIngredient={handleChangeIngredient}
									handleDeleteIngredient={handleDeleteIngredient}
									setPageState={setPageState}
									setChangeRecipe={setChangeRecipe}
									firebaseApp={firebaseApp}
									successfullUploaded={successfullUploaded}
									uploadProgress={uploadProgress}
									uploading={uploading}
									files={files}
									setFiles={setFiles}
									setSuccessfullUploaded={setSuccessfullUploaded}
									onFilesAdded={onFilesAdded}
									uploadFiles={uploadFiles}
									{...props}
								/>
							)}
						/>

						<PrivateRoute path='/profile' component={Profile} />
					</Switch>
				</Router>
			</div>

			<div className='d-flex footerButtons'>
				<FloatButtons
					handleAddRecipe={handleAddRecipe}
					handleSubmit={handleSubmit}
					handleAddIngredient={handleAddIngredient}
					pageState={pageState}
					handleBack={handleBack}
					{...props}
				/>
			</div>

			<ConfirmationModal
				showModal={modal.show}
				handleModalClose={handleModalClose}
				handleModalSuccess={handleModalSuccess}
				modal={modal}
				deleteRecipe={deleteRecipe}
				changeRecipe={changeRecipe}
				ingredientIndex={ingredientIndex}
				ingredientDelete={ingredientDelete}
				handleInputChange={handleTableChange}
			/>
		</div>
	);
};

export default App;
