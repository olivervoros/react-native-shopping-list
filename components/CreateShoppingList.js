import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getShoppingListItemsArray } from "../Helper";
import styles from '../styles/Styles';
import { shoppingListImage } from '../assets/index';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = { missingTitleError: "" }
    }

    validateForm = async (args, createShoppingList) => {

        if(! args.title || args.title==="") {
            this.setState({ missingTitleError: "You need to add a title!" });
        } else {
            await createShoppingList(this.state);
        }


    }

    render() {

        const { backToHome, createShoppingList} = this.props;

        const  missingTitleError = this.state.missingTitleError;
        const errorMessage = <Text style={styles.missingTitleErrorMessage}>You need to add a shopping list title!</Text>;

        const shoppingListItemsArray = getShoppingListItemsArray();
        const  shoppingListItems = Object.keys(shoppingListItemsArray).map(key => {
            let stringKey = key.toString();
            return <View key={key}>
                <Text style={styles.createShoppingListItemText}>{shoppingListItemsArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} />
            </View>
        });

        return(
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
            <View style={styles.container}>
                <Text style={styles.title}>Create New Shopping List</Text>
                <Image
                    style={ styles.image }
                    source={ shoppingListImage }
                />
                <TouchableOpacity onPress={backToHome}><Text style={styles.backToHomeButton}>Back to Home</Text></TouchableOpacity>
                <View style={{ marginBottom:25 }}>
                    <Text style={styles.createShoppingListItemText}>Shopping List Title:</Text>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(title) => this.setState({title: title})} name="title" />
                    <Text style={styles.createShoppingListItemText}>Author:</Text>
                    <TextInput style={styles.createShoppingListTextInput}  onChangeText={(author) => this.setState({author : author})} name="author" />
                    <Text style={styles.subTitle}>Shopping List Items:</Text>
                    { shoppingListItems }
                    { missingTitleError ? errorMessage : <Text></Text>}
                </View>
                <TouchableOpacity onPress={() => this.validateForm(this.state, createShoppingList)}><Text style={styles.addShoppingListButton}>Create Shopping List</Text></TouchableOpacity>
                <TouchableOpacity onPress={backToHome}><Text style={styles.backToHomeButton}>Back to Home</Text></TouchableOpacity>
            </View>
            </KeyboardAwareScrollView>

        )
    }
}