import React, { Component } from 'react';
import {Text, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import { capitaliseString, convertJSToUserDate} from "../Helper";

export default class ViewShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = { completed: [] }

    }

    completedShoppingListItem = (key) => {

        if(this.state.completed.includes(key)) {
            let index = this.state.completed.indexOf(key);
            if (index !== -1) {
                this.state.completed.splice(index, 1);
                this.setState({completed:  this.state.completed});
            }
        } else {

            this.setState({completed: [...this.state.completed, key]});
        }
    }

    render() {

        const { shoppingLists, viewShoppingListID, backToHome, loadUpdateShoppingListForm, confirmDeleteAlert } = this.props;

        const shoppingListItem = shoppingLists.find(item => item._id === viewShoppingListID);

        const shoppingItems = Object.keys(shoppingListItem.items).map(key => {

            if (shoppingListItem.items[key] !== '0' && shoppingListItem.items[key] !== 0) {

                const completedStyle = (this.state.completed.includes(key)) ? styles.completed : "";

                return <TouchableOpacity key={key} onPress={() => this.completedShoppingListItem(key)}><Text style={[styles.viewShoppingListText, completedStyle]} key={key}>{capitaliseString(key)} : {shoppingListItem.items[key]}</Text></TouchableOpacity>;
            }
        });

        return(
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{ shoppingListItem.title }</Text>
                <Text style={styles.viewShoppingListText}>Author: { shoppingListItem.author }</Text>
                <Text style={styles.viewShoppingListText}>Date: { convertJSToUserDate(shoppingListItem.createdAt) }</Text>
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
        marginTop:75
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
        fontSize: 24,
        fontWeight: "normal",
        paddingTop: 20,
        textAlign: "left",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 40,
        marginBottom: 20
    },
    completed: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }

});