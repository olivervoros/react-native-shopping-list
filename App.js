import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native';
import { getDummyShoppingList } from './Helper';
import CreateShoppingList from './components/CreateShoppingList';
import LoginForm from './components/LoginForm';
import ViewShoppingList from "./components/ViewShoppingList";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn : false,
            loginErrorMsg : false,
            redirect : false,
            shoppingLists: getDummyShoppingList(),
            fullShoppingList: [],
            displayCreateForm: false,
            presentShoppingListID: -1
        }
    }

    loadCreateForm = () => {
        this.setState({ displayCreateForm: true });
    }

    login = () => {
        this.setState({ displayCreateForm: false, presentShoppingListID: -1, loggedIn: true });
    }

    logout = () => {
        this.setState({ displayCreateForm: false, presentShoppingListID: -1, loggedIn: false });
    }

    viewShoppingListItem = (id) => {
        this.setState({ presentShoppingListID: id });
    }

    backToMain = () => {
        this.setState({ displayCreateForm: false, presentShoppingListID: -1 });
    }

    handleCreateShoppingListChange = (event = {}) => {
        const title = event.target && event.target.title;
        const author = event.target && event.target.author;
        const date = event.target && event.target.date;

    }

    createShoppingList = () => {
        // TODO
    }

    render() {

        if( ! this.state.loggedIn) {
            return <LoginForm login={this.login}></LoginForm>
        }

        if( this.state.presentShoppingListID > 0 ) {
            return <ViewShoppingList backToMain={this.backToMain} shoppingLists={this.state.shoppingLists} presentShoppingListID={this.state.presentShoppingListID}></ViewShoppingList>
        }

        if(this.state.displayCreateForm) {
            return <CreateShoppingList backToMain={this.backToMain} createShoppingList={this.createShoppingList} handleCreateShoppingListChange={this.handleCreateShoppingListChange}></CreateShoppingList>
        }

        const loginButton = <TouchableOpacity onPress={this.login}><Text style={styles.addShoppingListButtonText}>LOGIN</Text></TouchableOpacity>;

        const logoutButton = <TouchableOpacity onPress={this.logout}><Text style={styles.addShoppingListButtonText}>LOGOUT</Text></TouchableOpacity>;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>SancusLabs Shopping List App</Text>
                <TouchableOpacity style={styles.addShoppingListButtonView} onPress={this.loadCreateForm}>
                    <Text style={styles.addShoppingListButtonText}>NEW SHOPPING LIST +</Text>
                </TouchableOpacity>
                <View style={styles.loginButtonView}>
                    {this.state.loggedIn ? logoutButton : loginButton}
                </View>
                <Text style={styles.title}>View Shopping Lists:</Text>
                {this.state.shoppingLists.map((shoppingList, i) =>
                    <TouchableOpacity key={shoppingList.id} onPress={() => this.viewShoppingListItem(shoppingList.id)} value="test">
                        <Text style={styles.shoppingListItem} key={shoppingList.id}>{shoppingList.title}</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        textAlign: 'center'
    },
    addShoppingListButtonView: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#3fa9a1',
        padding: 10,
        color: '#fff',
    },
    addShoppingListButtonText: {
        color: '#fff',
    },
    loginButtonView: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#312784',
        padding: 10,
        color: '#fff',
    }
});