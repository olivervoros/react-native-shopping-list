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
            loggedIn : true,
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

    loadLoginForm = () => {
        this.setState({ loggedIn: false });
    }

    viewShoppingListItem = (id) => {
        this.setState({ presentShoppingListID: id });
    }

    render() {

        if( ! this.state.loggedIn) {
            return <LoginForm></LoginForm>
        }

        if( this.state.presentShoppingListID > 0 ) {
            return <ViewShoppingList shoppingLists={this.state.shoppingLists} presentShoppingListID={this.state.presentShoppingListID}></ViewShoppingList>
        }

        if(this.state.displayCreateForm) {
            return <CreateShoppingList></CreateShoppingList>
        }

        return (
            <View style={styles.container}>
                <View style={styles.addShoppingListButtonView}>
                    <Button onPress={this.loadCreateForm} title="Create New Shopping List"/>
                </View>
                <View style={styles.addShoppingListButtonView}>
                    <Button onPress={this.loadLoginForm} title="Login"/>
                </View>
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
        backgroundColor: '#312784',
        padding: 10,
        color: '#fff',
    }
});