import React, { Component } from 'react';
import {Text, ScrollView, TouchableOpacity, View, Image} from 'react-native';
import { capitaliseString } from "../Helper";
import styles from '../styles/ViewStyles';

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
                <Text style={styles.shoppingListItemText}>View Shopping List</Text>
                <Image
                    style={{width: 300, height: 200, marginBottom: 20}}
                    source={require('../update.jpg')}
                />
                <Text style={styles.title}>{ shoppingListItem.title }</Text>
                <Text>(Click on the item when it is found...)</Text>
                { shoppingItems }
                <TouchableOpacity onPress={backToHome}><Text style={styles.addShoppingListButtonView1}>Back to Home</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => loadUpdateShoppingListForm(shoppingListItem._id)}><Text style={styles.addShoppingListButtonView2}>Update Shopping List</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDeleteAlert(shoppingListItem._id)}><Text style={styles.deleteButtonView}>Delete Shopping List</Text></TouchableOpacity>
            </View>
            </ScrollView>



        )
    }
}