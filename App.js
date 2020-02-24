import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ScrollView,
    AsyncStorage,
    Alert,
    Image
} from 'react-native';
import { API_ENDPOINT, getShoppingListItemsArray } from './Helper';
import CreateShoppingList from './components/CreateShoppingList';
import LoginForm from './components/LoginForm';
import ViewShoppingList from "./components/ViewShoppingList";
import UpdateShoppingList from "./components/UpdateShoppingList";
import axios from "axios";
import styles from './styles/Styles';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn : false,
            loginErrorMsg : false,
            shoppingLists: [],
            viewShoppingListID: 0,
            updateShoppingListID: 0,
            page: "HOME"
        }
    }

    componentDidUpdate = async () => {

      await this.loadShoppingList();

    };

    loadShoppingList = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userId = await AsyncStorage.getItem('userId');
            if (token !== null) {

                let shoppingLists = await axios.get(
                    API_ENDPOINT+"/shoppinglists/"+userId, { headers: {"x-access-token" : token}}
                );

                // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
                this.setState({ shoppingLists: shoppingLists.data });
            }

        } catch (error) {
            this.setState({ viewShoppingListID: 0, loggedIn: false, loginErrorMsg: true });
        }
    };

    loadCreateForm = () => {
        this.setState({ page: "CREATE" });
    };

    login = async (args = {}) => {
        let household = (args && args.household) ? args.household : "";
        let password = (args && args.password) ? args.password : "";

        let payload = {household: household, password: password};

        try {
            let res = await axios.post(API_ENDPOINT+"/login", payload);
            // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded

            if(res && res.data.auth===true) {

                try {
                    await AsyncStorage.setItem('token', res.data.token);
                    await AsyncStorage.setItem('userId', res.data.userId);

                    this.setState({ viewShoppingListID: 0, loggedIn: true, loginErrorMsg: false });
                } catch (error) {
                    this.setState({ viewShoppingListID: 0, loggedIn: false, loginErrorMsg: true });
                }

            } else {

                this.setState({ viewShoppingListID: 0, loggedIn: false, loginErrorMsg: true });
            };
        } catch (error) {
            //alert(error);
            this.setState({ viewShoppingListID: 0, loggedIn: false, loginErrorMsg: true });

        }
    };

    logout = async () => {
        await AsyncStorage.setItem('token', "");
        await AsyncStorage.setItem('userId', "");
        this.setState({ viewShoppingListID: 0, loggedIn: false, updateShoppingListID: 0 });
    };

    viewShoppingListItem = (_id) => {
        this.setState({ page : "VIEW", viewShoppingListID: _id });
    };

    loadUpdateShoppingListForm = (_id) => {
        this.setState({ page: "UPDATE", viewShoppingListID: 0, updateShoppingListID: _id });
    };

    backToHome = () => {
        this.setState({ page: "HOME", viewShoppingListID: 0, updateShoppingListID: 0 });
    };

    createShoppingList = async (args = {}) => {

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

        console.log("CREATE");
        console.log(items);

        const userId = await AsyncStorage.getItem('userId');
        let payload = {title: title, author: author, userId: userId, items: items};

        try {
            let token = await AsyncStorage.getItem('token');
            let newShoppingListItem = await axios.post(
                API_ENDPOINT+"/shoppinglists", payload, { headers: {"x-access-token" : token }}
            );
            // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded

            this.setState({
                shoppingLists: [newShoppingListItem.data, ...this.state.shoppingLists],
                page: "HOME",
                viewShoppingListID: 0,
                updateShoppingListID: 0
            });

        } catch (error) {
            this.setState({ page: "CREATE", viewShoppingListID: 0, updateShoppingListID: 0, error: error });
        }

    }

    updateShoppingList = async (updateShoppingListID, shoppingListItem, args) => {

        let shoppingListItemsMap = new Map();
        let title = (args && args.title) ? args.title : shoppingListItem.title;
        let author =  (args && args.author) ? args.author : shoppingListItem.author;

        const shoppingListItemsArray = getShoppingListItemsArray();
        Object.keys(shoppingListItemsArray).map(key => {
            let stringKey = key.toString();

            let itemValue = args[stringKey] || shoppingListItem.items[stringKey].toString();
            shoppingListItemsMap.set(stringKey, itemValue);
        });

        let items = Object.fromEntries(shoppingListItemsMap);
        console.log("UPDATE");
        console.log(items);

        let userId = await AsyncStorage.getItem('userId');
        let payload = {title: title, author: author, userId: userId, date: shoppingListItem.date, items: items};

        try {

            let token = await AsyncStorage.getItem('token');

            await axios.put(
                API_ENDPOINT+"/shoppinglists/" + updateShoppingListID, payload, { headers: {"x-access-token" : token}}
            );
            // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        } catch (error) {
            alert(error);
        }

        try {

            let token = await AsyncStorage.getItem('token');

            let shoppingLists = await axios.get(
                API_ENDPOINT+"/shoppinglists", { headers: {"x-access-token" : token }}
            );

            // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded

            this.setState({ shoppingLists: shoppingLists.data, viewShoppingListID: 0, updateShoppingListID: 0, page: "HOME" });

        } catch (error) {
            alert(error);
        }

    }

    confirmDeleteAlert = async (deletedId) => {
        Alert.alert(
            'Hello!',
            'You are about to delete a shopping list item! Are you sure?',
            [
                {text: 'Ooops, NO!', onPress: () => {} },
                {text: 'YES, delete it!', onPress: () => this.deleteShoppingList(deletedId)},
            ],
            {cancelable: false},
        );
    }

    deleteShoppingList = async (deletedId) => {

        const filteredShoppingList = this.state.shoppingLists.filter((value, index, arr) => {

            return value._id !== deletedId;
        });

        try {
            let token = await AsyncStorage.getItem('token');

            let deletedShoppingList = await axios.delete(
                API_ENDPOINT+"/shoppinglists/"+deletedId, { headers: {"x-access-token" : token}}
            );
            // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded

            this.setState({ shoppingLists: filteredShoppingList, viewShoppingListID: 0, updateShoppingListID: 0, page: "HOME" });

        } catch (error) {
            alert(error);
        }
    }

    render() {

        if( ! this.state.loggedIn) {
            return <LoginForm loginErrorMsg={this.state.loginErrorMsg} login={this.login}></LoginForm>
        }


        if( this.state.page==="VIEW") {
            return <ViewShoppingList backToHome={this.backToHome} confirmDeleteAlert={this.confirmDeleteAlert} loadUpdateShoppingListForm={this.loadUpdateShoppingListForm} shoppingLists={this.state.shoppingLists} viewShoppingListID={this.state.viewShoppingListID}></ViewShoppingList>
        }

        if (this.state.page==="UPDATE") {
            return <UpdateShoppingList backToHome={this.backToHome} updateShoppingList={this.updateShoppingList} shoppingLists={this.state.shoppingLists} updateShoppingListID={this.state.updateShoppingListID}></UpdateShoppingList>
        }

        if(this.state.page==="CREATE") {
            return <CreateShoppingList backToHome={this.backToHome} createShoppingList={this.createShoppingList} ></CreateShoppingList>
        }

        const loginButton = <TouchableOpacity onPress={this.login}><Text style={styles.addShoppingListButtonText}>LOGIN</Text></TouchableOpacity>;

        const logoutButton = <TouchableOpacity onPress={this.logout}><Text style={styles.addShoppingListButtonText}>LOGOUT</Text></TouchableOpacity>;

        return (
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.appTitle}>Shopping List App</Text>
                <Image
                    style={{width: 300, height: 200, marginBottom: 20}}
                    source={require('./supermarket.jpg')}
                />
                <TouchableOpacity style={styles.addShoppingListButtonView} onPress={this.loadCreateForm}>
                    <Text style={styles.addShoppingListButtonText}>CREATE NEW SHOPPING LIST</Text>
                </TouchableOpacity>
                <Text style={styles.appTitle}>View Shopping Lists:</Text>
                {this.state.shoppingLists.map((shoppingList, i) =>
                    <TouchableOpacity key={shoppingList._id} onPress={() => this.viewShoppingListItem(shoppingList._id)}>
                        <Text style={styles.shoppingListItem} key={shoppingList._id}>{shoppingList.title}</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.appButtonView}>
                    {this.state.loggedIn ? logoutButton : loginButton}
                </View>
            </View>
            </ScrollView>
        );
    }
}