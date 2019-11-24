import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import { getDummyShoppingList } from './Helper';
import CreateShoppingList from './components/CreateShoppingList';
import LoginForm from './components/LoginForm';
import ViewShoppingList from "./components/ViewShoppingList";
import UpdateShoppingList from "./components/UpdateShoppingList";

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

    loadShoppingListForm = (id) => {
        this.setState({ displayCreateForm: false, presentShoppingListID: -1, updateShoppingListID: id });
    }

    backToMain = () => {
        this.setState({ displayCreateForm: false, presentShoppingListID: -1, updateShoppingListID: -1 });
    }

    createShoppingList = (args = {}) => {
        let id = Math.random() * 10000;
        let title = args.title;
        let author = args.author;
        let userDate = args.date;
        let milk = args.milk;
        let eggs = args.eggs;
        let water = args.water;
        let apples = args.apples;

        let items = {'milk': milk, 'eggs': eggs, 'water': water, 'apples': apples};

        let newShoppingListItem = {id: id, title: title, author: author, date: userDate, items: items};

        this.setState({
            shoppingLists: [...this.state.shoppingLists, newShoppingListItem],
            displayCreateForm: false,
        });

    }

    updateShoppingList = (updateShoppingListID, shoppingListItem, args) => {

        let title = (args && args.title) ? args.title : shoppingListItem.title;
        let author =  (args && args.author) ? args.author : shoppingListItem.author;
        let userDate =  (args && args.date) ? args.date : shoppingListItem.date;
        let milk =  (args && args.milk) ? args.milk : shoppingListItem.items.milk.toString();
        let eggs =  (args && args.eggs) ? args.eggs : shoppingListItem.items.eggs.toString();
        let water =  (args && args.water) ? args.water : shoppingListItem.items.water.toString();
        let apples =  (args && args.apples) ? args.apples : shoppingListItem.items.apples.toString();
        let items = {'milk': milk, 'eggs': eggs, 'water': water, 'apples': apples};

        const objIndex = this.state.shoppingLists.findIndex((obj => parseInt(obj.id) === updateShoppingListID));

        this.setState((state) => {
            state.shoppingLists[objIndex] = {id: updateShoppingListID, title: title, author: author, date: userDate, items: items};
        });

        this.setState({
            displayCreateForm: false,
            presentShoppingListID: -1,
            updateShoppingListID: -1
        });


    }

    deleteShoppingList = (deletedId) => {
        const filteredShoppingList = this.state.shoppingLists.filter((value, index, arr) => {

            return value.id !== deletedId;
        });

        this.setState({
            shoppingLists: filteredShoppingList,
            displayCreateForm: false,
            presentShoppingListID: -1
        });
    }

    render() {

        if( ! this.state.loggedIn) {
            return <LoginForm login={this.login}></LoginForm>
        }

        if( this.state.presentShoppingListID > 0 ) {
            return <ViewShoppingList backToMain={this.backToMain} loadShoppingListForm={this.loadShoppingListForm} deleteShoppingList={this.deleteShoppingList} shoppingLists={this.state.shoppingLists} presentShoppingListID={this.state.presentShoppingListID}></ViewShoppingList>
        }

        if (this.state.updateShoppingListID > 0) {
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
                    <TouchableOpacity key={shoppingList.id} onPress={() => this.viewShoppingListItem(shoppingList.id)}>
                        <Text style={styles.shoppingListItem} key={shoppingList.id}>{shoppingList.title}</Text>
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
        marginTop: 50
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