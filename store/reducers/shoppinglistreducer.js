
const initialState = {
    loggedIn : false,
    loginErrorMsg : false,
    page : "HOME",
    shoppingLists: [],
    fullShoppingList: []
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type==='GET_ALL_SHOPPING_LISTS') {

        newState.shoppingLists = action.shoppingLists.data;

    }

    if(action.type==='LOGIN_SUCCESS') {

        newState.viewShoppingListID = 0;
        newState.loggedIn = true;
        newState.loginErrorMsg = false;

    }

    if(action.type==='LOGIN_ERROR') {

        newState.viewShoppingListID = 0;
        newState.loggedIn = false;
        newState.loginErrorMsg = true;

    }

    if(action.type==='CREATE_SHOPPING_LIST_ERROR') {

        newState.page = "CREATE";
        newState.viewShoppingListID = 0;
        newState.updateShoppingListID = 0;
        newState.error = action.error;

    }

    if(action.type==='LOGOUT') {

        newState.viewShoppingListID = 0;
        newState.updateShoppingListID = 0;
        newState.loggedIn = false;

    }

    if(action.type==='LOAD_CREATE_FORM') {
        newState.page = "CREATE";
    }

    if(action.type==='VIEW_SHOPPING_LIST_ITEM') {

        newState.page = "VIEW";
        newState.viewShoppingListID = action.data.viewShoppingListID;

    }

    if(action.type==='CREATE_SHOPPING_LIST_ITEM') {

        newState.shoppingLists = [...newState.shoppingLists, action.newShoppingListItem.data];
        newState.page = "HOME";
        newState.viewShoppingListID = 0;
        newState.updateShoppingListID = 0;
    }

    if(action.type==='UPDATE_SHOPPING_LIST') {

        newState.shoppingLists = action.shoppingLists.data;
        newState.viewShoppingListID = 0;
        newState.updateShoppingListID = 0;
        newState.page=  "HOME";
    }

    if(action.type==='DELETE_SHOPPING_LIST') {

        const filteredShoppingList = newState.shoppingLists.filter((value, index, arr) => {

            return value._id !== action.deletedShoppingList.data.deletedId;
        });

        newState.shoppingLists = filteredShoppingList;
        newState.viewShoppingListID = 0;
        newState.updateShoppingListID = 0;
        newState.page=  "HOME";
    }

    if(action.type==='BACK_TO_HOME') {

        newState.page = "HOME";
        newState.viewShoppingListID = 0;
        newState.updateShoppingListID = 0;

    }

    if(action.type==='LOAD_UPDATE_FORM') {
        newState.page = "UPDATE";
        newState.viewShoppingListID = 0;
        newState.updateShoppingListID = action.updateShoppingListID;
    }

    return newState;
};

export default reducer;