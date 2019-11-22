import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { convertJSToUserDate, capitaliseString } from "../Helper";

export default class ViewShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    backToMain = () => {
        this.setState({ displayCreateForm: false });
    }

    updateShoppingList = () => {}

    deleteShoppingList = () => {}

    render() {

        const { shoppingLists, presentShoppingListID } = this.props;

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
                <Button onPress={this.backToMain} title="Back to Home"/>
                <Button onPress={this.updateShoppingList} title="Update Shopping List"/>
                <Button onPress={this.deleteShoppingList} title="Delete Shopping List"/>
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
});