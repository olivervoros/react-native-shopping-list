import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getShoppingListItemsArray } from "../Helper";
import styles from '../styles/UpdateStyles';

export default class UpdateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { backToHome, updateShoppingList, shoppingLists, updateShoppingListID} = this.props;

        const shoppingListItem = shoppingLists.find(item => item._id === updateShoppingListID);

        const shoppingListItemsArray = getShoppingListItemsArray();
        const  shoppingListItems = Object.keys(shoppingListItemsArray).map(key => {
            let stringKey = key.toString();
            let defaultValue = shoppingListItem.items[stringKey] ? shoppingListItem.items[stringKey].toString() : "0";
            return <View key={key}>
                <Text style={styles.shoppingListItemText}>{shoppingListItemsArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} defaultValue={defaultValue}/>
            </View>
        });

        return(
            <KeyboardAwareScrollView ontentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
            <View style={styles.container}>
                <Text style={styles.title}>Update Shopping List</Text>
                <Image
                    style={{width: 300, height: 200, marginBottom: 20}}
                    source={require('../view.jpg')}
                />
                <View style={{ marginBottom:25 }}>
                    <Text style={styles.shoppingListItemText}>Shopping List Title:</Text>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(title) => this.setState({title: title})} name="title" defaultValue={shoppingListItem.title}/>
                    <Text style={styles.shoppingListItemText}>Author:</Text>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(author) => this.setState({author : author})} name="author" defaultValue={shoppingListItem.author} />
                    <Text style={styles.subTitle}>Shopping List Items:</Text>
                    { shoppingListItems }
                </View>
                <TouchableOpacity onPress={() => updateShoppingList(updateShoppingListID, shoppingListItem, this.state)}><Text style={styles.updateShoppingListButton}>UPDATE Shopping List</Text></TouchableOpacity>
                <TouchableOpacity onPress={backToHome}><Text style={styles.backToHomeButton}>Back to Home</Text></TouchableOpacity>
            </View>
            </KeyboardAwareScrollView>
        )
    }
}