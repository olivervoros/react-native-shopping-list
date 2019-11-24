import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { API_ENDPOINT, getAuthTokenFromCookie } from './Helper';
import CreateShoppingList from './components/CreateShoppingList';
import LoginForm from './components/LoginForm';
import ViewShoppingList from "./components/ViewShoppingList";
import UpdateShoppingList from "./components/UpdateShoppingList";
import axios from "axios";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn : true, // TODO
            loginErrorMsg : false,
            shoppingLists: [],
            displayCreateForm: false,
            presentShoppingListID: -1
        }
    }

    componentDidMount = async () => {

        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {

                let shoppingLists = await axios.get(
                    API_ENDPOINT+"/shoppinglists", { headers: {"x-access-token" : token}}
                );

                // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
                this.setState({ shoppingLists: shoppingLists.data });
            }

        } catch (error) {
            this.setState({ displayCreateForm: false, presentShoppingListID: -1, loggedIn: false, loginErrorMsg: true });
        }
    }

    loadCreateForm = () => {
        this.setState({ displayCreateForm: true });
    }

    login = async (args = {}) => {
        let email = (args && args.email) ? args.email : "";
        let password = (args && args.password) ? args.password : ""

        let payload = {email: email, password: password};

        try {
            let res = await axios.post(API_ENDPOINT+"/login", payload);
            // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded

            if(res && res.data.auth===true) {

                try {
                    let token = res.data.token;
                    await AsyncStorage.setItem('token', token);
                    this.setState({ displayCreateForm: false, presentShoppingListID: -1, loggedIn: true, loginErrorMsg: false });
                } catch (error) {
                    this.setState({ displayCreateForm: false, presentShoppingListID: -1, loggedIn: false, loginErrorMsg: true });
                }

            } else {

                this.setState({ displayCreateForm: false, presentShoppingListID: -1, loggedIn: false, loginErrorMsg: true });
            };
        } catch (error) {
            //alert(error);
            this.setState({ displayCreateForm: false, presentShoppingListID: -1, loggedIn: false, loginErrorMsg: true });

        }
    }

    logout = () => {
        this.setState({ displayCreateForm: false, presentShoppingListID: -1, loggedIn: false });
    }

    viewShoppingListItem = (_id) => {
        this.setState({ presentShoppingListID: _id });
    }

    loadShoppingListForm = (_id) => {
        this.setState({ displayCreateForm: false, presentShoppingListID: -1, updateShoppingListID: _id });
    }

    backToMain = () => {
        this.setState({ displayCreateForm: false, presentShoppingListID: -1, updateShoppingListID: -1 });
    }

    createShoppingList = async (args = {}) => {

        let title = args.title;
        let author = args.author;
        let userDate = args.date;
        let milk = args.milk;
        let eggs = args.eggs;
        let water = args.water;
        let apples = args.apples;

        let items = {'milk': milk, 'eggs': eggs, 'water': water, 'apples': apples};

        let payload = {title: title, author: author, date: userDate, items: items};

        try {
            let token = await AsyncStorage.getItem('token');

            let newShoppingListItem = await axios.post(
                API_ENDPOINT+"/shoppinglists", payload, { headers: {"x-access-token" : token }}
            );
            // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded

            this.setState({
                shoppingLists: [...this.state.shoppingLists, newShoppingListItem.data],
                displayCreateForm: false,
            });

        } catch (error) {
            alert(error);
        }

    }

    updateShoppingList = async (updateShoppingListID, shoppingListItem, args) => {

        let title = (args && args.title) ? args.title : shoppingListItem.title;
        let author =  (args && args.author) ? args.author : shoppingListItem.author;
        let userDate =  (args && args.date) ? args.date : shoppingListItem.date;
        let milk =  (args && args.milk) ? args.milk : shoppingListItem.items.milk.toString();
        let eggs =  (args && args.eggs) ? args.eggs : shoppingListItem.items.eggs.toString();
        let water =  (args && args.water) ? args.water : shoppingListItem.items.water.toString();
        let apples =  (args && args.apples) ? args.apples : shoppingListItem.items.apples.toString();
        let items = {'milk': milk, 'eggs': eggs, 'water': water, 'apples': apples};

        let payload = {title: title, author: author, date: userDate, items: items};

        const objIndex = this.state.shoppingLists.findIndex((obj => parseInt(obj._id) === updateShoppingListID));

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

            this.setState({ shoppingLists: shoppingLists.data });

            this.setState({
                displayCreateForm: false,
                presentShoppingListID: -1,
                updateShoppingListID: -1
            });

        } catch (error) {
            alert(error);
        }

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

            this.setState({
                shoppingLists: filteredShoppingList,
                displayCreateForm: false,
                presentShoppingListID: -1
            });

        } catch (error) {
            alert(error);
        }
    }

    render() {

        if( ! this.state.loggedIn) {
            return <LoginForm loginErrorMsg={this.state.loginErrorMsg} login={this.login}></LoginForm>
        }


        // TODO: remove parseint, horrible tweak
        if( parseInt(this.state.presentShoppingListID) > 0 ) {
            return <ViewShoppingList backToMain={this.backToMain} loadShoppingListForm={this.loadShoppingListForm} deleteShoppingList={this.deleteShoppingList} shoppingLists={this.state.shoppingLists} presentShoppingListID={this.state.presentShoppingListID}></ViewShoppingList>
        }

        if (parseInt(this.state.updateShoppingListID) > 0) {
            return <UpdateShoppingList backToMain={this.backToMain} updateShoppingList={this.updateShoppingList} shoppingLists={this.state.shoppingLists} updateShoppingListID={this.state.updateShoppingListID}></UpdateShoppingList>
        }

        if(this.state.displayCreateForm) {
            return <CreateShoppingList backToMain={this.backToMain} createShoppingList={this.createShoppingList} ></CreateShoppingList>
        }

        const loginButton = <TouchableOpacity onPress={this.login}><Text style={styles.addShoppingListButtonText}>LOGIN</Text></TouchableOpacity>;

        const logoutButton = <TouchableOpacity onPress={this.logout}><Text style={styles.addShoppingListButtonText}>LOGOUT</Text></TouchableOpacity>;

        return (
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>SancusLabs Shopping List App</Text>
                <TouchableOpacity style={styles.addShoppingListButtonView} onPress={this.loadCreateForm}>
                    <Text style={styles.addShoppingListButtonText}>CREATE NEW SHOPPING LIST</Text>
                </TouchableOpacity>
                <View style={styles.loginButtonView}>
                    {this.state.loggedIn ? logoutButton : loginButton}
                </View>
                <Text style={styles.title}>View Shopping Lists:</Text>
                {this.state.shoppingLists.map((shoppingList, i) =>
                    <TouchableOpacity key={shoppingList._id} onPress={() => this.viewShoppingListItem(shoppingList._id)}>
                        <Text style={styles.shoppingListItem} key={shoppingList._id}>{shoppingList.title}</Text>
                    </TouchableOpacity>
                )}
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 75
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 40
    },
    shoppingListItem : {
        padding: 10,
        backgroundColor: '#ffa500',
        margin: 10,
        width: 300,
        height: 50,
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 16
    },
    addShoppingListButtonView: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#3fa9a1',
        padding: 10,
        color: '#fff',
        textAlign: 'center'
    },
    addShoppingListButtonText: {
        color: '#fff',
        textAlign: 'center',
        paddingTop: 5,
        fontWeight: "bold",
        fontSize: 16,
    },
    loginButtonView: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#312784',
        padding: 10,
        color: '#fff',
        textAlign: 'center'
    }
});