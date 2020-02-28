import axios from "axios";
import {API_ENDPOINT, getShoppingListItemsArray} from "../../Helper";
import { AsyncStorage } from "react-native";

export const loadAllShoppingLists = () => async dispatch => {

    try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (token !== null) {

            let shoppingLists = await axios.get(
                API_ENDPOINT+"/shoppinglists/"+userId, { headers: {"x-access-token" : token}}
            );

            dispatch({ type: "GET_ALL_SHOPPING_LISTS", shoppingLists });
        }

    } catch (error) {
        dispatch({ type: "LOGIN_ERROR"});
    }
};

export const login = (args) => async dispatch => {

    let household = (args && args.household) ? args.household : "";
    let password = (args && args.password) ? args.password : "";

    let payload = {household: household, password: password};

    try {
        let res = await axios.post(API_ENDPOINT+"/login", payload);

        if(res && res.data.auth===true) {

            try {
                await AsyncStorage.setItem('token', res.data.token);
                await AsyncStorage.setItem('userId', res.data.userId);

                dispatch({ type: "LOGIN_SUCCESS"});
            } catch (error) {
                dispatch({ type: "LOGIN_ERROR"});
            }

        } else {

            dispatch({ type: "LOGIN_ERROR"});
        }
    } catch (error) {
        dispatch({ type: "LOGIN_ERROR"});

    }
};

export const logout = () => async dispatch => {
    await AsyncStorage.setItem('token', "");
    await AsyncStorage.setItem('userId', "");
    dispatch({ type: "LOGOUT"});
};

export const viewShoppingListItem = (_id) => async dispatch => {
    const data = { viewShoppingListID: _id };
    dispatch({ type: "VIEW_SHOPPING_LIST_ITEM", data });
};

export const createNewShoppingList = (args) => async dispatch => {

    let shoppingListItemsMap = new Map();

    let title = args.title;
    let author = args.author || "OV";

    const shoppingListItemsArray = getShoppingListItemsArray();
    Object.keys(shoppingListItemsArray).map(key => {
        let stringKey = key.toString();

        let itemValue = args[stringKey] || "0";
        shoppingListItemsMap.set(stringKey, itemValue);
    });

    let items = Object.fromEntries(shoppingListItemsMap);

    const userId = await AsyncStorage.getItem('userId');
    let payload = {title: title, author: author, userId: userId, items: items};

    try {
        let token = await AsyncStorage.getItem('token');
        let newShoppingListItem = await axios.post(
            API_ENDPOINT+"/shoppinglists", payload, { headers: {"x-access-token" : token }}
        );

        dispatch({ type: "CREATE_SHOPPING_LIST_ITEM", newShoppingListItem });

    } catch (error) {
        dispatch({ type: "CREATE_SHOPPING_LIST_ERROR", error });
    }
};

export const updateShoppingList = (updateShoppingListID, shoppingListItem, args) => async dispatch => {

    let shoppingListItemsMap = new Map();
    let title = (args && args.title) ? args.title : shoppingListItem.title;
    let author =  (args && args.author) ? args.author : shoppingListItem.author;

   const productsArray = getShoppingListItemsArray();
   Object.keys(productsArray).map(key => {

       let oldValue = shoppingListItem.items[key];
       let newValue = (args[key]==="") ? "0" : args[key];

       if(newValue) {
           shoppingListItemsMap.set(key.toString(), newValue);
       } else if(oldValue) {
           shoppingListItemsMap.set(key.toString(), oldValue);
       } else {
           shoppingListItemsMap.set(key.toString(), "0");
       }

   });

    let items = Object.fromEntries(shoppingListItemsMap);

    let userId = await AsyncStorage.getItem('userId');
    let payload = {title: title, author: author, userId: userId, items: items};

    try {

        let token = await AsyncStorage.getItem('token');

        await axios.put(
            API_ENDPOINT+"/shoppinglists/" + updateShoppingListID, payload, { headers: {"x-access-token" : token}}
        );
    } catch (error) {
        alert(error);
    }

    try {

        let token = await AsyncStorage.getItem('token');

        let shoppingLists = await axios.get(
            API_ENDPOINT+"/shoppinglists/"+userId, { headers: {"x-access-token" : token }}
        );
        dispatch({ type: "UPDATE_SHOPPING_LIST", shoppingLists });

    } catch (error) {
        alert(error);
    }
};

export const deleteShoppingList = (deletedId) => async dispatch => {

    let token = await AsyncStorage.getItem('token');
    try {
        let deletedShoppingList = await axios.delete(
            API_ENDPOINT+"/shoppinglists/"+deletedId, { headers: {"x-access-token" : token}}
        );
        dispatch({ type: "DELETE_SHOPPING_LIST", deletedShoppingList });
    } catch (error) {
        console.log(error);
    }
};

export const loadUpdateForm = (id) => async dispatch => {
    dispatch({ type: "LOAD_UPDATE_FORM", updateShoppingListID: id });
};