import React, { Component } from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { backToMain, createShoppingList} = this.props;

        return(
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Create New Shopping List</Text>
                <View style={{ marginBottom:25 }}>
                <TextInput placeholder="Title" style={styles.createShoppingListTextInput} onChangeText={(title) => this.setState({title: title})} name="title" />
                <TextInput placeholder="Author" style={styles.createShoppingListTextInput}  onChangeText={(author) => this.setState({author : author})} name="author" />
                <TextInput placeholder="Date (dd/mm/yyyy)" style={styles.createShoppingListTextInput} onChangeText={(date) => this.setState({date : date})} name="date" />
                <TextInput placeholder="Milk" style={styles.createShoppingListTextInput} onChangeText={(milk) => this.setState({milk : milk})} name="milk" />
                <TextInput placeholder="Eggs" style={styles.createShoppingListTextInput} onChangeText={(eggs) => this.setState({eggs : eggs})} name="eggs" />
                <TextInput placeholder="Water" style={styles.createShoppingListTextInput} onChangeText={(water) => this.setState({water : water})} name="water" />
                <TextInput placeholder="Apples" style={styles.createShoppingListTextInput} onChangeText={(apples) => this.setState({apples : apples})} name="apples" />
                </View>
                <TouchableOpacity onPress={() => createShoppingList(this.state)}><Text style={styles.addShoppingListButton}>Create Shopping List</Text></TouchableOpacity>
                <TouchableOpacity onPress={backToMain}><Text style={styles.backToHomeButton}>Back to Home</Text></TouchableOpacity>
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
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 40
    },
});