This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<a name="App"></a>

## App
The app class is the top functional component which holds most of the logic / handlers / state handling of all other views.

**Kind**: global class

* [App](#App)
    * _static_
        * [.setRecipes(recipes)](#App.setRecipes)
        * [.setFilteredRecipes(filteredRecipes)](#App.setFilteredRecipes)
        * [.setUser(user)](#App.setUser)
        * [.setModal(modal)](#App.setModal)
        * [.setFilter(filter)](#App.setFilter)
        * [.setChangeRecipe(changeRecipe)](#App.setChangeRecipe)
        * [.setDeleteRecipe(deleteRecipe)](#App.setDeleteRecipe)
        * [.setIngredientIndex(ingredientIndex)](#App.setIngredientIndex)
        * [.setIngredientDelete(ingredientDelete)](#App.setIngredientDelete)
        * [.setPageState(pageState)](#App.setPageState)
        * [.setFirebaseApp(firebaseApp)](#App.setFirebaseApp)
        * [.setFiles(files)](#App.setFiles)
        * [.setPictures(pictures)](#App.setPictures)
        * [.setUploading(uploading)](#App.setUploading)
        * [.setUploadProgress(uploadProgress)](#App.setUploadProgress)
        * [.setSuccessfullUploaded(successfullUploaded)](#App.setSuccessfullUploaded)
        * [.recipes](#App.recipes) : <code>Object</code>
        * [.user](#App.user) : <code>Object</code>
        * [.modal](#App.modal) : <code>Object</code>
        * [.filter](#App.filter) : <code>string</code>
        * [.changeRecipe](#App.changeRecipe) : <code>Object</code>
        * [.deleteRecipe](#App.deleteRecipe) : <code>Object</code>
        * [.ingredientIndex](#App.ingredientIndex) : <code>int</code>
        * [.ingredientDelete](#App.ingredientDelete) : <code>int</code>
        * [.pageState](#App.pageState) : <code>Object</code>
        * [.firebaseApp](#App.firebaseApp) : <code>Object</code>
        * [.files](#App.files) : <code>array</code>
        * [.pictures](#App.pictures) : <code>array</code>
        * [.uploading](#App.uploading) : <code>Boolean</code>
        * [.uploadProgress](#App.uploadProgress) : <code>Object</code>
        * [.successfullUploaded](#App.successfullUploaded) : <code>Boolean</code>
    * _inner_
        * [~callAPI(myUser)](#App..callAPI)
        * [~useEffect()](#App..useEffect)
        * [~getPictureUrl(picture)](#App..getPictureUrl)
        * [~loadPictures(fire, user)](#App..loadPictures)
        * [~addRecipe(newObject)](#App..addRecipe)
        * [~handleBack(event)](#App..handleBack)
        * [~handleAddRecipe(event)](#App..handleAddRecipe)
        * [~handleAddIngredient(event)](#App..handleAddIngredient)
        * [~handleDeleteIngredient(event)](#App..handleDeleteIngredient)
        * [~handleChangeIngredient(event)](#App..handleChangeIngredient)
        * [~handleTableChange(event)](#App..handleTableChange)
        * [~handleInputChange(event)](#App..handleInputChange)
        * [~handleSubmit(event)](#App..handleSubmit)
        * [~raiseModal(event, index)](#App..raiseModal)
        * [~handleDelete(key)](#App..handleDelete)
        * [~handleDelete()](#App..handleDelete)
        * [~handleModalSuccess(state)](#App..handleModalSuccess)
        * [~handleFilterChange(event)](#App..handleFilterChange)
        * [~onFilesAdded(newfile)](#App..onFilesAdded)
        * [~onFilesAdded()](#App..onFilesAdded)
        * [~sendRequest(file)](#App..sendRequest)
        * [~makeCardBig(event, recipe)](#App..makeCardBig)

<a name="App.setRecipes"></a>

### App.setRecipes(recipes)
set the state of the recipes (all recipes of the user) thats the total unfiltered list

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| recipes | <code>Object</code> | State for all the recipes of a user |

<a name="App.setFilteredRecipes"></a>

### App.setFilteredRecipes(filteredRecipes)
set the state of the filtered recipes (all recipes of the user)  this one is passed down to the components

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| filteredRecipes | <code>Object</code> | filtered recipes of the user |

<a name="App.setUser"></a>

### App.setUser(user)
set the state of the user

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| user | <code>Object</code> | filtered recipes of the user |

<a name="App.setModal"></a>

### App.setModal(modal)
set the modal state

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| modal | <code>Object</code> | the modal state |

<a name="App.setFilter"></a>

### App.setFilter(filter)
set the filter state

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>string</code> | the modal state |

<a name="App.setChangeRecipe"></a>

### App.setChangeRecipe(changeRecipe)
set the change recipe

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| changeRecipe | <code>Object</code> | the change recipe |

<a name="App.setDeleteRecipe"></a>

### App.setDeleteRecipe(deleteRecipe)
set the delete recipe

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| deleteRecipe | <code>Object</code> | the delete recipe |

<a name="App.setIngredientIndex"></a>

### App.setIngredientIndex(ingredientIndex)
set the change ingredient index

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| ingredientIndex | <code>int</code> | the change ingredient index |

<a name="App.setIngredientDelete"></a>

### App.setIngredientDelete(ingredientDelete)
set the delete ingredient index

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| ingredientDelete | <code>int</code> | the delete ingredient index |

<a name="App.setPageState"></a>

### App.setPageState(pageState)
set the state of the page

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| pageState | <code>Object</code> | the state of the page |

<a name="App.setFirebaseApp"></a>

### App.setFirebaseApp(firebaseApp)
set the reference to the firebase application

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| firebaseApp | <code>Object</code> | reference to the firebase application |

<a name="App.setFiles"></a>

### App.setFiles(files)
set the files we are uploading

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| files | <code>array</code> | the files we are uploading |

<a name="App.setPictures"></a>

### App.setPictures(pictures)
set  the pictures we received from the storage

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| pictures | <code>array</code> | the pictures we received from the storage |

<a name="App.setUploading"></a>

### App.setUploading(uploading)
set the are we currently uploading

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| uploading | <code>Boolean</code> | are we currently uploading |

<a name="App.setUploadProgress"></a>

### App.setUploadProgress(uploadProgress)
set  progress of the upload

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| uploadProgress | <code>Object</code> | progress of the upload |

<a name="App.setSuccessfullUploaded"></a>

### App.setSuccessfullUploaded(successfullUploaded)
set if we uploaded successfully

**Kind**: static method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| successfullUploaded | <code>Boolean</code> | did we upload successfully |

<a name="App.recipes"></a>

### App.recipes : <code>Object</code>
State for all the recipes of a user

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.user"></a>

### App.user : <code>Object</code>
State for the user object

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.modal"></a>

### App.modal : <code>Object</code>
State for the modal

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.filter"></a>

### App.filter : <code>string</code>
State for the filter string

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.changeRecipe"></a>

### App.changeRecipe : <code>Object</code>
State for the recipe we changing or deleting or the ingredient we are changing or deleting

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.deleteRecipe"></a>

### App.deleteRecipe : <code>Object</code>
the delete recipe

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.ingredientIndex"></a>

### App.ingredientIndex : <code>int</code>
the change ingredient index

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.ingredientDelete"></a>

### App.ingredientDelete : <code>int</code>
the delete ingredient index

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.pageState"></a>

### App.pageState : <code>Object</code>
State the page where are we now to drive some UI changes

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.firebaseApp"></a>

### App.firebaseApp : <code>Object</code>
stuff for the firebase picture upload

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.files"></a>

### App.files : <code>array</code>
the files we are uploading

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.pictures"></a>

### App.pictures : <code>array</code>
the pictures we received from the storage

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.uploading"></a>

### App.uploading : <code>Boolean</code>
are we currently uploading

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.uploadProgress"></a>

### App.uploadProgress : <code>Object</code>
progress of the upload

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App.successfullUploaded"></a>

### App.successfullUploaded : <code>Boolean</code>
did we upload successfully

**Kind**: static typedef of [<code>App</code>](#App)
<a name="App..callAPI"></a>

### App~callAPI(myUser)
calls the API layer for a authenticated user

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| myUser | <code>Object</code> | Somebody's name. |

<a name="App..useEffect"></a>

### App~useEffect()
react hook for useEffect does the stuff we need to execute on the initial load

**Kind**: inner method of [<code>App</code>](#App)
<a name="App..getPictureUrl"></a>

### App~getPictureUrl(picture)
gets the details of a picture from the firebase storage

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| picture | <code>Object</code> | the picture Object |

<a name="App..loadPictures"></a>

### App~loadPictures(fire, user)
loads all the pictures of the user from firebase

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| fire | <code>Object</code> | firebase reference to the firebase |
| user | <code>Object</code> | current firebase user |

<a name="App..addRecipe"></a>

### App~addRecipe(newObject)
commits the new recipe to the API and adds it to the array of all recipes

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| newObject | <code>Object</code> | new recipe |

<a name="App..handleBack"></a>

### App~handleBack(event)
handle going back from the recipe detail to the list

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |

<a name="App..handleAddRecipe"></a>

### App~handleAddRecipe(event)
handle the creation of a empty recipe object and pass it to the API method

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |

<a name="App..handleAddIngredient"></a>

### App~handleAddIngredient(event)
handle the creation of a empty ingredient and raise the modal to enter the details

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |

<a name="App..handleDeleteIngredient"></a>

### App~handleDeleteIngredient(event)
handle the deletion of a ingredient

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |

<a name="App..handleChangeIngredient"></a>

### App~handleChangeIngredient(event)
handle the change of a ingredient

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |

<a name="App..handleTableChange"></a>

### App~handleTableChange(event)
handle change of inputs from the modal about ingredients (used to be for the table inputs)

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |

<a name="App..handleInputChange"></a>

### App~handleInputChange(event)
handle change of inputs from the form

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |

<a name="App..handleSubmit"></a>

### App~handleSubmit(event)
handle submit button action

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |

<a name="App..raiseModal"></a>

### App~raiseModal(event, index)
raise the modal to confirm stuff

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |
| index | <code>int</code> | index of the thing we looking at |

<a name="App..handleDelete"></a>

### App~handleDelete(key)
delete a recipe

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key of what we deleting |

<a name="App..handleDelete"></a>

### App~handleDelete()
close the modal again

**Kind**: inner method of [<code>App</code>](#App)
<a name="App..handleModalSuccess"></a>

### App~handleModalSuccess(state)
handle what happens when we press confirm in the modal

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | the state object of the modal |

<a name="App..handleFilterChange"></a>

### App~handleFilterChange(event)
handles the filter search change and filters the recipe list thats displayed

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |

<a name="App..onFilesAdded"></a>

### App~onFilesAdded(newfile)
add a file to the file array

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| newfile | <code>Object</code> | the new file we are adding |

<a name="App..onFilesAdded"></a>

### App~onFilesAdded()
upload the file to firebase

**Kind**: inner method of [<code>App</code>](#App)
<a name="App..sendRequest"></a>

### App~sendRequest(file)
sends the request to firebase

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| file | <code>Object</code> | the new file we are adding |

<a name="App..makeCardBig"></a>

### App~makeCardBig(event, recipe)
makes the little card bigger

**Kind**: inner method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | Event object |
| recipe | <code>Object</code> | Recipe we want to make bigger |
