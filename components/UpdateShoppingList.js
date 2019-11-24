import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';

export default class UpdateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { backToMain, updateShoppingList, shoppingLists, updateShoppingListID} = this.props;

        const shoppingListItem = shoppingLists.find(item => item.id === updateShoppingListID);

        return(
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Update Shopping List</Text>
                <View style={{ marginBottom:25 }}>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(title) => this.setState({title: title})} name="title" defaultValue={shoppingListItem.title}/>
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(author) => this.setState({author : author})} name="author" defaultValue={shoppingListItem.author} />
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(date) => this.setState({date : date})} name="date" defaultValue={shoppingListItem.date} />
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(milk) => this.setState({milk : milk})} name="milk" defaultValue={shoppingListItem.items['milk'].toString()} />
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(eggs) => this.setState({eggs : eggs})} name="eggs" defaultValue={shoppingListItem.items['eggs'].toString()} />
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(water) => this.setState({water : water})} name="water" defaultValue={shoppingListItem.items['water'].toString()} />
                    <TextInput style={styles.createShoppingListTextInput} onChangeText={(apples) => this.setState({apples : apples})} name="apples" defaultValue={shoppingListItem.items['apples'].toString()} />
                </View>
                <TouchableOpacity onPress={() => updateShoppingList(updateShoppingListID, shoppingListItem, this.state)}><Text style={styles.addShoppingListButtonView2}>UPDATE Shopping List</Text></TouchableOpacity>
                <TouchableOpacity onPress={backToMain}><Text style={styles.addShoppingListButtonView3}>Back to Home</Text></TouchableOpacity>
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