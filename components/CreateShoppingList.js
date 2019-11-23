import React, { Component } from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {capitaliseString, getShoppingListItemsArray} from "../Helper";

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const shoppingListItems = getShoppingListItemsArray();
        const shoppingItems = Object.keys(shoppingListItems).map(key =>
            <View key={key}><TextInput style={styles.createShoppingListTextInput} placeholder={capitaliseString(shoppingListItems[key])} name={shoppingListItems[key]} /></View>
        )

        const { backToMain, createShoppingList, handleCreateShoppingListChange } = this.props;

        return(
            <View style={styles.container}>
                <Text style={styles.title}>Create New Shopping List</Text>
                <View style={{ marginBottom:25 }}>
                <TextInput placeholder="Title" style={styles.createShoppingListTextInput} onChangeText={(text) => this.title = text} name="title" />
                <TextInput placeholder="Author" style={styles.createShoppingListTextInput} onChangeText={handleCreateShoppingListChange} name="author" />
                <TextInput placeholder="Date (dd/mm/yyyy)" style={styles.createShoppingListTextInput} onChangeText={handleCreateShoppingListChange} name="date" />
                { shoppingItems }
                </View>
                <TouchableOpacity onPress={createShoppingList}><Text style={styles.addShoppingListButtonView2}>Create Shopping List</Text></TouchableOpacity>
                <TouchableOpacity onPress={backToMain}><Text style={styles.addShoppingListButtonView3}>Back to Home</Text></TouchableOpacity>
            </View>



        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addShoppingListButtonView2: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#3fa9a1',
        padding: 10,
        color: '#fff',
    },
    addShoppingListButtonView3: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#312784',
        padding: 10,
        color: '#fff',
    },
    createShoppingListTextInput: {
        paddingLeft: 10,
        width:300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom:15
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 40
    },
});