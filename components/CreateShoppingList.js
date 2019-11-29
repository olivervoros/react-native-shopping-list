import React, { Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    getVeggiesAndFruitsArray,
    getDrinksArray,
    getDairyProductsArray,
    getMeatArray,
    getBakeryProductsArray,
    getBasicProductsArray, getHomeProductsArray, getExtraProductsArray
} from '../Helper';

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

        const veggiesAndFruitsArray = getVeggiesAndFruitsArray();
        const  veggiesAndFruits = Object.keys(veggiesAndFruitsArray).map(key => {
            let stringKey = key.toString();
            return <View key={key}>
                <Text style={styles.shoppingListItemText}>{veggiesAndFruitsArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} />
            </View>
        });

        const drinksArray = getDrinksArray();
        const  drinks = Object.keys(drinksArray).map(key => {
            let stringKey = key.toString();
            return <View key={key}>
                <Text style={styles.shoppingListItemText}>{drinksArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} />
            </View>
        });

        const dairyProductsArray = getDairyProductsArray();
        const  dairyProducts = Object.keys(dairyProductsArray).map(key => {
            let stringKey = key.toString();
            return <View key={key}>
                <Text style={styles.shoppingListItemText}>{dairyProductsArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} />
            </View>
        });

        const meatArray = getMeatArray();
        const  meatProducts = Object.keys(meatArray).map(key => {
            let stringKey = key.toString();
            return <View key={key}>
                <Text style={styles.shoppingListItemText}>{meatArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} />
            </View>
        });

        const bakeryProductsArray = getBakeryProductsArray();
        const  bakeryProducts = Object.keys(bakeryProductsArray).map(key => {
            let stringKey = key.toString();
            return <View key={key}>
                <Text style={styles.shoppingListItemText}>{bakeryProductsArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} />
            </View>
        });

        const basicProductsArray = getBasicProductsArray();
        const  basicProducts = Object.keys(basicProductsArray).map(key => {
            let stringKey = key.toString();
            return <View key={key}>
                <Text style={styles.shoppingListItemText}>{basicProductsArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} />
            </View>
        });

        const homeProductsArray = getHomeProductsArray();
        const  homeProducts = Object.keys(homeProductsArray).map(key => {
            let stringKey = key.toString();
            return <View key={key}>
                <Text style={styles.shoppingListItemText}>{homeProductsArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} />
            </View>
        });

        const extraProductsArray = getExtraProductsArray();
        const  extraProducts = Object.keys(extraProductsArray).map(key => {
            let stringKey = key.toString();
            return <View key={key}>
                <Text style={styles.shoppingListItemText}>{extraProductsArray[key]}:</Text>
                <TextInput style={styles.createShoppingListTextInput} onChangeText={(key) => this.setState({[stringKey] : key})} name={key} />
            </View>
        });

        return(
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
            <View style={styles.container}>
                <Text style={styles.title}>Create New Shopping List</Text>
                <Image
                    style={{width: 300, height: 200, marginBottom: 20}}
                    source={require('../shoppinglist.jpg')}
                />
                <View style={{ marginBottom:25 }}>
                    <Text style={styles.shoppingListItemText}>Shopping List Title:</Text>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(title) => this.setState({title: title})} name="title" />
                    <Text style={styles.shoppingListItemText}>Author:</Text>
                    <TextInput style={styles.createShoppingListTextInput}  onChangeText={(author) => this.setState({author : author})} name="author" />
                    <Text style={styles.subTitle}>Veggies and Fruits:</Text>
                    { veggiesAndFruits }
                    <Text style={styles.subTitle}>Drinks</Text>
                    { drinks }
                    <Text style={styles.subTitle}>Dairy Products</Text>
                    { dairyProducts }
                    <Text style={styles.subTitle}>Meat</Text>
                    { meatProducts }
                    <Text style={styles.subTitle}>Bakery Products</Text>
                    { bakeryProducts }
                    <Text style={styles.subTitle}>Basic Products</Text>
                    { basicProducts }
                    <Text style={styles.subTitle}>Home/Cleaning Products</Text>
                    { homeProducts }
                    <Text style={styles.subTitle}>Other Products</Text>
                    <Text style={styles.subTitle}>(Missing from the list...)</Text>
                    { extraProducts }

                    { missingTitleError ? errorMessage : <Text></Text>}

                </View>
                <TouchableOpacity onPress={() => this.validateForm(this.state, createShoppingList)}><Text style={styles.addShoppingListButton}>Create Shopping List</Text></TouchableOpacity>
                <TouchableOpacity onPress={backToHome}><Text style={styles.backToHomeButton}>Back to Home</Text></TouchableOpacity>
            </View>
            </KeyboardAwareScrollView>

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
    addShoppingListButton: {
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
    backToHomeButton: {
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
    createShoppingListTextInput: {
        paddingLeft: 10,
        width:300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom:15
    },
    createShoppingListTextArea: {
        paddingLeft: 10,
        width:300,
        height: 120,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom:15,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 40
    },
    shoppingListItemText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 15
    },
    shoppingListItemTextArea: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: 30,
        marginBottom: 15
    },
    missingTitleErrorMessage: {
        width:300,
        height:50,
        backgroundColor: "red",
        color: "white",
        marginBottom: 25,
        fontWeight: "bold",
        fontSize:16,
        textAlign: "center",
        paddingTop: 15,
    },
    subTitle: {
        width:'100%',
        color: "darkgreen",
        marginBottom: 25,
        fontWeight: "bold",
        fontSize:26,
        textAlign: "center",
        paddingTop: 15,
    }
});