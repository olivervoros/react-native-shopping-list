import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { convertJSToUserDate, capitaliseString } from "../Helper";

export default class ViewShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    updateShoppingList = () => {}

    deleteShoppingList = () => {}

    render() {

        const { shoppingLists, presentShoppingListID, backToMain } = this.props;

        const shoppingListItem = shoppingLists.find(item => item.id === presentShoppingListID);

        const shoppingItems = Object.keys(shoppingListItem.items).map(key =>
            <Text key={key}>{capitaliseString(key)} : {shoppingListItem.items[key]}</Text>
        )

        return(
            <View style={styles.container}>
                <Text>Title: { shoppingListItem.title }</Text>
                <Text>Author: { shoppingListItem.author }</Text>
                <Text>Date: (dd/mm/yyyy): { convertJSToUserDate(shoppingListItem.date) }</Text>
                { shoppingItems }
                <TouchableOpacity onPress={backToMain}><Text style={styles.addShoppingListButtonView1}>Back to Home</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.updateShoppingList}><Text style={styles.addShoppingListButtonView2}>Update Shopping List</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.deleteShoppingList}><Text style={styles.addShoppingListButtonView3}>Delete Shopping List</Text></TouchableOpacity>
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
    addShoppingListButtonView1: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#ffa500',
        padding: 10,
        color: '#fff',
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
    }

});