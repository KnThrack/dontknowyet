import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.scss";
import { Recipes, Recipe, NavBar, Profile, StartPage, PrivateRoute, ConfirmationModal, FloatButtons } from "./views";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/storage";

//const util = require("util");
var _ = require("underscore");

/**
 * @class App
 * @classdesc The app class is the top functional component which holds most of the logic / handlers / state handling of all other views.
 * @exports App
 * @constructor
 */

const App = (...props) => {
	// all my state its getting quiet a lot to think about using context
	/**
	 * @memberof App
	 * @typedef {Object} recipes State for all the recipes of a user
	 */
	/**
	 * @memberof App
	 * @function setRecipes set the state of the recipes (all recipes of the user) thats the total unfiltered list
	 */
	/**
	 * State for all the filtered recipes of a user this state is passed down to the other components
	 * @var {Object} filteredRecipes filtered recipes of the user
	 * @function setFilteredRecipes set the state of the filtered recipes (all recipes of the user)  this one is passed down to the components
	 *
	 * State for the user object
	 * @var {Object} user filtered recipes of the user
	 * @function setUser set the state of the user
	 *
	 * State for the modal
	 * @var {Object} modal the modal state
	 * @function setModal set the modal state
	 *
	 * State for the filter string
	 * @var {string} filter the modal state
	 * @function setFilter set the filter state
	 *
	 * State for the recipe we changing or deleting or the ingredient we are changing or deleting
	 * @var {Object} changeRecipe the change recipe
	 * @function setChangeRecipe set the change recipe
	 * @var {Object} deleteRecipe the delete recipe
	 * @function setDeleteRecipe set the delete recipe
	 * @var {int} ingredientIndex the change ingredient index
	 * @function setIngredientIndex set the change ingredient index
	 * @var {int} ingredientDelete the delete ingredient index
	 * @function setIngredientDelete set the delete ingredient index
	 *
	 * State the page where are we now to drive some UI changes
	 * @var {Object} pageState the state of the page
	 * @function setPageState set the state of the page
	 *
	 * stuff for the firebase picture upload
	 * @var {Object} firebaseApp reference to the firebase application
	 * @function setFirebaseApp set the reference to the firebase application
	 * @var {array} files the files we are uploading
	 * @function setFiles set the files we are uploading
	 * @var {array} pictures the pictures we recived from the storage
	 * @function setPictures set  the pictures we recived from the storage
	 * @var {Boolean} uploading are we currently uploading
	 * @function setUploading set the are we currently uploading
	 * @var {Object} uploadProgress progress of the upload
	 * @function setUploadProgress set  progress of the upload
	 * @var {Boolean} successfullUploaded did we upload successfully
	 * @function setSuccessfullUploaded set if we uploaded successfully
	 */
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
	const [files, setFiles] = useState([]);
	const [pictures, setPictures] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState({});
	const [successfullUploaded, setSuccessfullUploaded] = useState(false);

	// set the default axios stuff
	axios.defaults.headers.post["Content-Type"] = "application/json";
	axios.defaults.headers.put["Content-Type"] = "application/json";
	axios.defaults.headers.get["Content-Type"] = "application/json";

	/**
	 * @function callAPI calls the API layer for a authenticated user
	 * @param {Object} myUser - Somebody's name.
	 * @memberof App
	 * @inner
	 */
	async function callAPI(myUser) {
		// get the initial recipes
		const recipes = (await axios.get("https://notsureyetapp.herokuapp.com/api/recipes?user=" + myUser._id)).data;

		setRecipes(recipes.data);
		setFilteredRecipes(recipes.data);
	}

	/**
	 * @function useEffect react hook for useEffect does the stuff we need to execute on the initial load
	 * @memberof App
	 * @inner
	 */
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

	/**
	 * @function getPictureUrl gets the details of a picture from the firebase storage
	 * @param {Object} picture - the picture Object
	 * @memberof App
	 * @inner
	 */
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

	/**
	 * @function loadPictures loads all the pictures of the user from firebase
	 * @param {Object} fire  firebase reference to the firebase
	 * @param {Object} user  current firebase user
	 * @memberof App
	 * @inner
	 */
	async function loadPictures(fire, user) {
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
	/**
	 * @function addRecipe commits the new recipe to the API and adds it to the array of all recipes
	 * @param {Object} newObject - new recipe
	 * @memberof App
	 * @inner
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

	/**
	 * @function handleBack handle going back from the recipe detail to the list
	 * @param {Object} event - Event object
	 * @memberof App
	 * @inner
	 */
	function handleBack(event) {
		// ok here we need to basically raise a modal with the card we just click and overlay or over the list
		setPageState({ page: "list" });
		setChangeRecipe(null);
	}

	/**
	 * @function handleAddRecipe handle the creation of a empty recipe object and pass it to the API method
	 * @param {Object} event - Event object
	 * @memberof App
	 * @inner
	 */
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

	/**
	 * @function handleAddIngredient handle the creation of a empty ingredient and raise the modal to enter the details
	 * @param {Object} event - Event object
	 * @memberof App
	 * @inner
	 */
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

	/**
	 * @function handleDeleteIngredient handle the deletion of a ingredient
	 * @param {Object} event - Event object
	 * @memberof App
	 * @inner
	 */
	function handleDeleteIngredient(event) {
		event.preventDefault();
		setIngredientDelete(true);
	}

	/**
	 * @function handleChangeIngredient handle the change of a ingredient
	 * @param {Object} event - Event object
	 * @memberof App
	 * @inner
	 */
	function handleChangeIngredient(event) {
		let index = changeRecipe.ingredients.findIndex(x => x._id === event.currentTarget.id.toString());
		setIngredientIndex(index);
		// raise Modal
		raiseModal("addIngredient");
	}

	/**
	 * @function handleTableChange handle change of inputs from the modal about ingredients (used to be for the table inputs)
	 * @param {Object} event - Event object
	 * @memberof App
	 * @inner
	 */
	function handleTableChange(event) {
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

	/**
	 * @function handleInputChange handle change of inputs from the form
	 * @param {Object} event - Event object
	 * @memberof App
	 * @inner
	 */
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

	/**
	 * @function handleSubmit handle submit button action
	 * @param {Object} event - Event object
	 * @memberof App
	 * @inner
	 */
	function handleSubmit(event) {
		event.preventDefault();

		// raise decision
		raiseModal("confirm");
	}

	/**
	 * @function raiseModal raise the modal to confirm stuff
	 * @param {Object} event - Event object
	 * @param {int} index - index of the thing we looking at
	 * @memberof App
	 * @inner
	 */
	function raiseModal(modalType, index) {
		setModal({
			show: !modal.show,
			type: modalType,
			index: index
		});
	}

	/**
	 * @function handleDelete delete a recipe
	 * @param {string} key - key of what we deleting
	 * @memberof App
	 * @inner
	 */
	function handleDelete(key) {
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

	/**
	 * @function handleDelete close the modal again
	 * @memberof App
	 * @inner
	 */
	function handleModalClose() {
		setIngredientDelete(false);
		setModal({
			show: false,
			type: ""
		});
	}

	/**
	 * @function handleModalSuccess handle what happens when we press confirm in the modal
	 * @param {Object} state - the state object of the modal
	 * @memberof App
	 * @inner
	 */
	function handleModalSuccess(state) {
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

	/**
	 * @function handleFilterChange handles the filter search change and filters the recipe list thats displayed
	 * @param {Object} event - Event object
	 * @memberof App
	 * @inner
	 */
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
	/**
	 * @function onFilesAdded add a file to the file array
	 * @param {Object} newfile - the new file we are adding
	 * @memberof App
	 * @inner
	 */
	function onFilesAdded(newfile) {
		setFiles(files.concat(newfile));
	}

	/**
	 * @function onFilesAdded upload the file to firebase
	 * @memberof App
	 * @inner
	 */
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

	/**
	 * @function sendRequest sends the request to firebase
	 * @param {Object} file - the new file we are adding
	 * @memberof App
	 * @inner
	 */
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

	/**
	 * @function makeCardBig makes the little card bigger
	 * @param {Object} event - Event object
	 * @param {Object} recipe - Recipe we want to make bigger
	 * @memberof App
	 * @inner
	 */
	function makeCardBig(event, recipe) {
		// we dont do that for that one button
		if (event.target.id !== "cardButton" && event.target.className !== "dropdown-item") {
			// ok here we need to basically raise a modal with the card we just click and overlay or over the list
			setPageState({ page: "details" });
			setChangeRecipe(recipe);
		}
	}

	// handlers end
	/**
	 * Returns the sum of a and b
	 * @returns {Object} returns the jsx string for react
	 * @memberof App
	 * @inner
	 */
	return (
		<div className='App'>
			<Router>
				<header className='App-header'>
					<NavBar showNavs={true} />
				</header>

				<div className='App-content'>
					<Switch>
						<Route exact path='/' render={props => <StartPage setPageState={setPageState} />} />
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
			</Router>
		</div>
	);
};

export default App;
