import React, { Component } from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { backToHome, createShoppingList} = this.props;

        return(
            <KeyboardAwareScrollView ontentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
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
                    <Text style={styles.shoppingListItemText}>Milk:</Text>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(milk) => this.setState({milk : milk})} name="milk" />
                    <Text style={styles.shoppingListItemText}>Eggs:</Text>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(eggs) => this.setState({eggs : eggs})} name="eggs" />
                    <Text style={styles.shoppingListItemText}>Water:</Text>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(water) => this.setState({water : water})} name="water" />
                    <Text style={styles.shoppingListItemText}>Apples:</Text>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(apples) => this.setState({apples : apples})} name="apples" />
                    <Text style={styles.shoppingListItemTextArea}>Notes (anything to mention...)</Text>
                    <TextInput
                        style={styles.createShoppingListTextArea}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(note) => this.setState({note : note})}
                        name="note"
                    />
                </View>
                <TouchableOpacity onPress={() => createShoppingList(this.state)}><Text style={styles.addShoppingListButton}>Create Shopping List</Text></TouchableOpacity>
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
    }
});