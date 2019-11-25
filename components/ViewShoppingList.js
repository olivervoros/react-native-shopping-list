import React, { Component } from 'react';
import {Text, ScrollView, StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import { convertJSToUserDate, capitaliseString } from "../Helper";

export default class ViewShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { shoppingLists, viewShoppingListID, backToHome, loadUpdateShoppingListForm, confirmDeleteAlert } = this.props;

        const shoppingListItem = shoppingLists.find(item => item._id === viewShoppingListID);

        const shoppingItems = Object.keys(shoppingListItem.items).map(key =>
            <Text style={styles.viewShoppingListText} key={key}>{capitaliseString(key)} : {shoppingListItem.items[key]}</Text>
        )

        return(
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{ shoppingListItem.title }</Text>
                <Text style={styles.viewShoppingListText}>Author: { shoppingListItem.author }</Text>
                <Text style={styles.viewShoppingListText}>Date: (dd/mm/yyyy): { convertJSToUserDate(shoppingListItem.date) }</Text>
                { shoppingItems }
                <TouchableOpacity onPress={backToHome}><Text style={styles.addShoppingListButtonView1}>Back to Home</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => loadUpdateShoppingListForm(shoppingListItem._id)}><Text style={styles.addShoppingListButtonView2}>Update Shopping List</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDeleteAlert(shoppingListItem._id)}><Text style={styles.deleteButtonView}>Delete Shopping List</Text></TouchableOpacity>
            </View>
            </ScrollView>



        )
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
    addShoppingListButtonView1: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#ffa500',
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: "bold",
    },
    addShoppingListButtonView2: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#3fa9a1',
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: "bold",
    },
    deleteButtonView: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#cd0000',
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: "bold",
    },
    viewShoppingListText: {
        paddingLeft: 10,
        width:300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom:15,
        paddingTop: 10
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 40
    },

});