declare module 'react-super-responsive-table';

// Interfaces

// recipes backend
interface Irecipe {
    _id: string;
    name: string;
    title: string;
    cuisine: string;
    ingredients: [{ ingredient: string; quantity: number; unit: string; _id: string }];
    create_date: Date;
    recipe: string;
    user: string;
}

// User backend
interface Iuser {
    _id: string;
    name: string;
    email: string;
    auth0ID: string;
    create_date: Date;
}

// Modal
interface Imodal {
    show: boolean;
    type: EmodalType;
}

// pictures for recipes
interface Ipicture {
    recipe_id: string;
    name: string;
    url: string;
}

// upload of image progress
interface IuploadProgress {
    state: string;
    percentage: number;
}

// event handlers
interface handleEvent { (event: React.SyntheticEvent): void }
// enums

// Modal Types
enum EmodalType {
    init = "",
    delete = "delete",
    confirm = "confirm",
    addIngredient = "addIngredient"
}

// Page states
const enum EpageState {
    init = "",
    list = "list",
    details = "details",
    home = "home"
}

